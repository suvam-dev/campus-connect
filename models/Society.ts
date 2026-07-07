import mongoose from 'mongoose';

const SocietySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, index: true },
    description: { type: String },
    logo: { type: String },
    slug: { type: String, required: true, unique: true },
    admins: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

export default mongoose.models.Society || mongoose.model('Society', SocietySchema);
