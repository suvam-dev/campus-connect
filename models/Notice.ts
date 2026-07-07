import mongoose from 'mongoose';

const NoticeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    date: { type: String, required: true },
    description: { type: String, required: true },
    source: { type: String, required: true },
    isUnread: { type: Boolean, default: false },
    tags: [{ type: String }],
    iconType: { type: String, default: 'FileText' } // Store string name of icon to resolve on frontend
  },
  { timestamps: true }
);

export default mongoose.models.Notice || mongoose.model('Notice', NoticeSchema);
