import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    venue: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    category: { type: String, required: true },
    tags: [{ type: String }],
    image: { type: String },
    description: { type: String },
    status: { type: String, enum: ['draft', 'published', 'cancelled'], default: 'published' },
    capacity: { type: Number, default: 0 }, // 0 means unlimited
    registrationDeadline: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.models.Event || mongoose.model('Event', EventSchema);
