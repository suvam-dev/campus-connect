"use client";

import React, { useState, useRef } from "react";
import { ImagePlus, X, Loader2 } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
  name?: string;
  defaultValue?: string;
  onChange?: (url: string) => void;
}

const checkMagicNumber = async (file: File): Promise<boolean> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = function(e) {
      if (!e.target?.result) return resolve(false);
      const arr = new Uint8Array(e.target.result as ArrayBuffer);
      let header = "";
      for (let i = 0; i < arr.length; i++) {
         header += arr[i].toString(16).padStart(2, '0').toUpperCase();
      }
      
      // Magic Numbers
      // JPEG: FFD8FF
      // PNG: 89504E47
      // GIF: 47494638
      // WEBP: starts with 52494646 (RIFF)
      
      if (header.startsWith("FFD8FF")) return resolve(true); // JPEG
      if (header === "89504E47") return resolve(true); // PNG
      if (header === "47494638") return resolve(true); // GIF
      if (header === "52494646") return resolve(true); // WEBP
      
      resolve(false);
    };
    // Only read the first 4 bytes (partial file check)
    reader.readAsArrayBuffer(file.slice(0, 4));
  });
};

export default function ImageUpload({ name, defaultValue, onChange }: ImageUploadProps) {
  const [imageUrl, setImageUrl] = useState<string>(defaultValue || "");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 10MB limit
    if (file.size > 10485760) {
      alert("File is too large. Max size is 10MB.");
      return;
    }

    // Partial file reading to check for real image signatures (prevents disguised .exe files)
    const isRealImage = await checkMagicNumber(file);
    if (!isRealImage) {
      alert("Invalid file signature detected. The file may be corrupted or disguised.");
      return;
    }

    // Perform the upload
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "campus-connect"); // Must be configured as unsigned preset in Cloudinary

      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
      if (!cloudName) throw new Error("Cloudinary cloud name is not set");

      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: formData
      });
      
      const data = await response.json();
      
      if (data.secure_url) {
        setImageUrl(data.secure_url);
        if (onChange) onChange(data.secure_url);
      } else {
        if (data.error?.message?.includes("Upload preset not found")) {
          alert("Upload failed: Please go to your Cloudinary Settings -> Upload, and create an UNSIGNED upload preset named 'campus_connect'.");
        } else {
          alert("Upload failed: " + (data.error?.message || "Unknown error"));
        }
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("An error occurred during upload.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setImageUrl("");
    if (onChange) onChange("");
  };

  return (
    <div className="space-y-4 w-full">
      {name && <input type="hidden" name={name} value={imageUrl} />}
      <input 
        type="file" 
        accept="image/png, image/jpeg, image/jpg, image/webp, image/gif" 
        className="hidden" 
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      
      {imageUrl ? (
        <div className="relative w-full h-[200px] rounded-md overflow-hidden border border-slate-200">
          <Image 
            src={imageUrl}
            alt="Upload Preview"
            fill
            className="object-cover"
          />
          <button
            onClick={handleRemove}
            className="absolute top-2 right-2 bg-rose-500 text-white p-1.5 rounded-full hover:bg-rose-600 transition shadow-sm z-10"
            title="Remove Image"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <div 
          onClick={() => !isUploading && fileInputRef.current?.click()}
          className={`w-full h-[200px] border-2 border-dashed rounded-md flex flex-col items-center justify-center gap-2 transition ${isUploading ? 'border-slate-300 bg-slate-100 cursor-not-allowed' : 'border-slate-300 cursor-pointer hover:border-indigo-500 hover:bg-indigo-50/50 bg-slate-50'} text-slate-500`}
        >
          {isUploading ? (
            <>
              <Loader2 size={32} className="text-indigo-500 animate-spin" />
              <span className="text-sm font-medium text-slate-600">Uploading securely...</span>
            </>
          ) : (
            <>
              <ImagePlus size={32} className="text-slate-400" />
              <span className="text-sm font-medium">Click to upload an image</span>
              <span className="text-xs text-slate-400">Secure signature check enabled (Max 10MB)</span>
            </>
          )}
        </div>
      )}
    </div>
  );
}
