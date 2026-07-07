import React from 'react';
import NoticesClient from './NoticesClient';
// DB calls refactored to REST API

export default async function NoticesPage() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  
  let initialNotices = [];
  try {
    const res = await fetch(`${baseUrl}/api/notices`, { next: { revalidate: 900 } });
    if (res.ok) {
      initialNotices = await res.json();
    }
  } catch (error) {
    console.error("Failed to fetch notices:", error);
  }

  return <NoticesClient initialNotices={initialNotices} />;
}
