"use client";

import React, { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { ImagePlus, X } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
  name?: string;
  defaultValue?: string;
  onChange?: (url: string) => void;
}

export default function ImageUpload({ name, defaultValue, onChange }: ImageUploadProps) {
  const [imageUrl, setImageUrl] = useState<string>(defaultValue || "");

  const onUpload = (result: any) => {
    const secureUrl = result?.info?.secure_url;
    if (secureUrl) {
      setImageUrl(secureUrl);
      if (onChange) {
        onChange(secureUrl);
      }
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setImageUrl("");
    if (onChange) {
      onChange("");
    }
  };

  return (
    <div className="space-y-4 w-full">
      {name && <input type="hidden" name={name} value={imageUrl} />}
      
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
        <CldUploadWidget uploadPreset="campus_connect" onSuccess={onUpload}>
          {({ open }) => {
            return (
              <div 
                onClick={() => open?.()}
                className="w-full h-[200px] border-2 border-dashed border-slate-300 rounded-md flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-indigo-500 hover:bg-indigo-50/50 transition bg-slate-50 text-slate-500"
              >
                <ImagePlus size={32} className="text-slate-400" />
                <span className="text-sm font-medium">Click to upload an image</span>
              </div>
            );
          }}
        </CldUploadWidget>
      )}
    </div>
  );
}
