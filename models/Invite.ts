import mongoose from 'mongoose';

const InviteSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, index: true },
    society: { type: mongoose.Schema.Types.ObjectId, ref: 'Society', required: true },
    role: { type: String, enum: ['society_admin', 'student'], default: 'society_admin' },
    token: { type: String, required: true },
    expiresAt: { type: Date, required: true },
    status: { type: String, enum: ['pending', 'accepted', 'expired'], default: 'pending' },
    invitedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

InviteSchema.index({ email: 1, society: 1, status: 1 });

export default mongoose.models.Invite || mongoose.model('Invite', InviteSchema);
