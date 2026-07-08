import React from 'react';
import { notFound } from 'next/navigation';
import NoticeDetailClient from './NoticeDetailClient';


interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function NoticeDetailPage(props: PageProps) {
  const params = await props.params;
  let notice = null;
  try {
    const { getNoticeById } = await import("@/lib/services/noticeService");
    notice = await getNoticeById(params.id);
    if (!notice) return notFound();
  } catch (error) {
    console.error("Failed to fetch notice detail:", error);
    return notFound();
  }

  return <NoticeDetailClient notice={notice} />;
}
