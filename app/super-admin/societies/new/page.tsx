"use client";

import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Building2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createSociety } from "@/app/actions/societyActions";
import ImageUpload from "@/components/shared/ImageUpload";

function toSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function NewSocietyPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [slugEdited, setSlugEdited] = useState(false);
  const [slug, setSlug] = useState("");

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    setName(val);
    if (!slugEdited) {
      setSlug(toSlug(val));
    }
  }

  function handleSlugChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSlugEdited(true);
    setSlug(toSlug(e.target.value));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);
    // Inject the live slug preview value
    formData.set("slug", slug);

    startTransition(async () => {
      try {
        await createSociety(formData);
      } catch (err: unknown) {
        // redirect() throws internally — ignore NEXT_REDIRECT, surface real errors
        const message = err instanceof Error ? err.message : String(err);
        if (!message.includes("NEXT_REDIRECT")) {
          setError(message);
        }
      }
    });
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/super-admin/societies">
          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg text-slate-500 hover:text-slate-900">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">New Society</h1>
          <p className="text-sm text-slate-500 mt-0.5">Create a new society on the platform.</p>
        </div>
      </div>

      {/* Form card */}
      <form
        onSubmit={handleSubmit}
        className="bg-white border border-slate-200 rounded-2xl shadow-sm divide-y divide-slate-100"
      >

        {/* Error banner */}
        {error && (
          <div className="px-6 py-4 bg-red-50 border-b border-red-100 rounded-t-2xl">
            <p className="text-sm font-medium text-red-700">{error}</p>
          </div>
        )}

        {/* Basic info */}
        <div className="px-6 py-6 space-y-5">
          <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">
            Basic Information
          </h2>

          {/* Name */}
          <div className="space-y-1.5">
            <label htmlFor="name" className="block text-sm font-medium text-slate-700">
              Society Name <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={name}
              onChange={handleNameChange}
              placeholder="e.g. Technology Robotics Society"
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow"
            />
          </div>

          {/* Slug */}
          <div className="space-y-1.5">
            <label htmlFor="slug" className="block text-sm font-medium text-slate-700">
              URL Slug <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center rounded-lg border border-slate-300 bg-slate-50 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500 overflow-hidden transition-shadow">
              <span className="px-3 py-2.5 text-sm text-slate-400 border-r border-slate-200 shrink-0 select-none">
                /societies/
              </span>
              <input
                id="slug"
                name="slug"
                type="text"
                required
                value={slug}
                onChange={handleSlugChange}
                placeholder="technology-robotics-society"
                className="flex-1 bg-transparent px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
              />
            </div>
            <p className="text-xs text-slate-400">
              Auto-generated from name. Only lowercase letters, numbers, and hyphens.
            </p>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label htmlFor="description" className="block text-sm font-medium text-slate-700">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              placeholder="What does this society do?"
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow resize-none"
            />
          </div>
        </div>

        {/* Logo */}
        <div className="px-6 py-6 space-y-4">
          <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">
            Logo
          </h2>
          <div className="flex items-start gap-5">
            <div className="h-16 w-16 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0">
              <Building2 className="h-7 w-7 text-indigo-400" />
            </div>
            <div className="flex-1">
              <ImageUpload name="logo" />
              <p className="mt-2 text-xs text-slate-400">
                Recommended: 256×256px PNG or SVG. Displayed on society cards and the admin panel.
              </p>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="px-6 py-4 flex items-center justify-end gap-3 bg-slate-50 rounded-b-2xl">
          <Link href="/super-admin/societies">
            <Button type="button" variant="outline" className="rounded-lg">
              Cancel
            </Button>
          </Link>
          <Button
            type="submit"
            disabled={isPending || !name.trim() || !slug.trim()}
            className="rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white min-w-[120px]"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating…
              </>
            ) : (
              "Create Society"
            )}
          </Button>
        </div>

      </form>
    </div>
  );
}
