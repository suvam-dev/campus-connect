import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    clerkId: { type: String, unique: true, sparse: true }, // created on first sign-in via Clerk
    name: { type: String },
    email: { type: String, required: true, unique: true, index: true },
    phone: { type: String },
    rollNumber: { type: String },
    hall: { type: String, default: null },
    department: { type: String },
    year: { type: String },
    profileImage: { type: String },
    gender: { 
      type: String, 
      enum: ['Male', 'Female', 'Other', 'Prefer not to say'],
      default: null 
    },
    collegeEmail: { type: String, default: null },
    profileCompleted: { type: Boolean, default: false },
    role: {
      type: String,
      enum: ['student', 'society_admin', 'super_admin'],
      default: 'student',
    },
    societies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Society' }],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model('User', UserSchema);
