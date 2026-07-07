import mongoose from 'mongoose';

const RegistrationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
    registeredAt: { type: Date, default: () => new Date() },
    status: { type: String, enum: ['registered', 'cancelled', 'waitlisted'], default: 'registered' },
    checkedIn: { type: Boolean, default: false },
    qrCode: { type: String },
    attendance: { type: Object },
    assignedTeam: { type: String },
    notes: { type: String },
  },
  { timestamps: true }
);

// Prevent duplicate registrations
RegistrationSchema.index({ user: 1, event: 1 }, { unique: true });

export default mongoose.models.Registration || mongoose.model('Registration', RegistrationSchema);
