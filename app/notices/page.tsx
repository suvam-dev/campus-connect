import React from 'react';
import NoticesClient from './NoticesClient';

// DB calls refactored to REST API

import { getNotices } from "@/lib/services/noticeService";

export default async function NoticesPage() {
  let initialNotices: any[] = [];
  try {
    initialNotices = await getNotices();
  } catch (error) {
    console.error("Failed to fetch notices:", error);
  }
  return <NoticesClient initialNotices={initialNotices} />;
}
