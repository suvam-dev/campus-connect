import React from 'react';
import { notFound } from 'next/navigation';
import NoticeDetailClient from './NoticeDetailClient';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function NoticeDetailPage(props: PageProps) {
  const params = await props.params;
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  
  let notice = null;
  
  try {
    const res = await fetch(`${baseUrl}/api/notices/${params.id}`, { next: { revalidate: 900 } });
    if (!res.ok) {
      if (res.status === 404) return notFound();
      throw new Error("Failed to fetch notice");
    }
    notice = await res.json();
  } catch (error) {
    console.error("Failed to fetch notice detail:", error);
    return notFound();
  }

  return <NoticeDetailClient notice={notice} />;
}
