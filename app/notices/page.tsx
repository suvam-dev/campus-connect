import React from 'react';
import NoticesClient from './NoticesClient';
import { getNotices } from "@/lib/services/noticeService";
import type { SerializedNotice } from "@/lib/types";

export default async function NoticesPage() {
  let initialNotices: SerializedNotice[] = [];
  try {
    initialNotices = await getNotices();
  } catch (error) {
    console.error("Failed to fetch notices:", error);
  }
  return <NoticesClient initialNotices={initialNotices} />;
}
