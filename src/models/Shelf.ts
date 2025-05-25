import mongoose, { Schema, models, Document } from 'mongoose';

// Interface for Shelf document
export interface IShelf extends Document {
  name: string;
  description: string;
  tools: mongoose.Types.ObjectId[];
  createdBy: mongoose.Types.ObjectId;
  isPublic: boolean;
  tags: string[];
  followers: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const shelfSchema = new Schema<IShelf>(
  {
    name: {
      type: String,
      required: [true, 'Shelf name is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    tools: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tool',
    }],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    isPublic: {
      type: Boolean,
      default: true,
    },
    tags: [{
      type: String,
      trim: true,
    }],
    followers: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }],
  },
  {
    timestamps: true,
  }
);

// Create indexes for better search performance
shelfSchema.index({ name: 'text', description: 'text', tags: 'text' });
shelfSchema.index({ createdBy: 1 });
shelfSchema.index({ isPublic: 1 });
shelfSchema.index({ followers: 1 });

const Shelf = models.Shelf || mongoose.model<IShelf>('Shelf', shelfSchema);
export default Shelf; 