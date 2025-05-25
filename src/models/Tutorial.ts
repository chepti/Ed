import mongoose, { Schema, models, Document } from 'mongoose';

// Interface for Tutorial document
export interface ITutorial extends Document {
  toolId: mongoose.Types.ObjectId;
  title: string;
  format: 'וידאו' | 'טקסט' | 'PDF' | 'אחר';
  link: string;
  additionalInfo?: string;
  credit: string;
  contributedBy: mongoose.Types.ObjectId;
  rating: number;
  ratingCount: number;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const tutorialSchema = new Schema<ITutorial>(
  {
    toolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tool',
      required: [true, 'Tool ID is required'],
    },
    title: {
      type: String,
      required: [true, 'Tutorial title is required'],
      trim: true,
    },
    format: {
      type: String,
      enum: ['וידאו', 'טקסט', 'PDF', 'אחר'],
      required: [true, 'Format is required'],
    },
    link: {
      type: String,
      required: [true, 'Tutorial link is required'],
      trim: true,
    },
    additionalInfo: {
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
tutorialSchema.index({ toolId: 1 });
tutorialSchema.index({ title: 'text', additionalInfo: 'text' });
tutorialSchema.index({ format: 1 });
tutorialSchema.index({ rating: -1 });

const Tutorial = models.Tutorial || mongoose.model<ITutorial>('Tutorial', tutorialSchema);
export default Tutorial; 