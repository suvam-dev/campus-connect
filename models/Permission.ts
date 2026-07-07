import mongoose from 'mongoose';

const PermissionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    society: { type: mongoose.Schema.Types.ObjectId, ref: 'Society', required: true },
    permissions: [{ type: String }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

PermissionSchema.index({ user: 1, society: 1 }, { unique: true });

export default mongoose.models.Permission || mongoose.model('Permission', PermissionSchema);
