import mongoose, { Schema, models, Document } from 'mongoose';

// Interface for Example document
export interface IExample extends Document {
  toolId: mongoose.Types.ObjectId;
  productLink?: string;
  title: string;
  description: string;
  prompt?: string;
  credit: string;
  contributedBy: mongoose.Types.ObjectId;
  rating: number;
  ratingCount: number;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const exampleSchema = new Schema<IExample>(
  {
    toolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tool',
      required: [true, 'Tool ID is required'],
    },
    productLink: {
      type: String,
      trim: true,
    },
    title: {
      type: String,
      required: [true, 'Example title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    prompt: {
      type: String,
      default: '',
    },
    credit: {
      type: String,
      required: [true, 'Credit is required'],
      trim: true,
    },
    contributedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 0,
    },
    ratingCount: {
      type: Number,
      default: 0,
    },
    tags: [{
      type: String,
      trim: true,
    }],
  },
  {
    timestamps: true,
  }
);

// Create indexes for better search performance
exampleSchema.index({ toolId: 1 });
exampleSchema.index({ title: 'text', description: 'text', prompt: 'text' });
exampleSchema.index({ rating: -1 });

const Example = models.Example || mongoose.model<IExample>('Example', exampleSchema);
export default Example; 