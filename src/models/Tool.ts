import mongoose, { Schema, models, Document } from 'mongoose';

// Interface for Tool document
export interface ITool extends Document {
  name: string;
  link: string;
  logo?: string;
  description: string;
  limitations: string;
  advantages: string;
  disadvantages: string;
  toolRating: number;
  usageInTeaching: string;
  relatedTutorials: string[];
  examplesAndPrompts: string[];
  difficultyLevel: 'קל' | 'בינוני' | 'מתקדם';
  hebrewSupport: boolean;
  isFree: boolean;
  outputType: string;
  pedagogicalContext: ('הקניה' | 'תרגול' | 'הערכה')[];
  communicationFormat: string;
  tags: string[];
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const toolSchema = new Schema<ITool>(
  {
    name: {
      type: String,
      required: [true, 'Tool name is required'],
      trim: true,
    },
    link: {
      type: String,
      required: [true, 'Tool link is required'],
      trim: true,
    },
    logo: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    limitations: {
      type: String,
      default: '',
    },
    advantages: {
      type: String,
      default: '',
    },
    disadvantages: {
      type: String,
      default: '',
    },
    toolRating: {
      type: Number,
      min: 1,
      max: 5,
      default: 0,
    },
    usageInTeaching: {
      type: String,
      default: '',
    },
    relatedTutorials: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tutorial',
    }],
    examplesAndPrompts: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Example',
    }],
    difficultyLevel: {
      type: String,
      enum: ['קל', 'בינוני', 'מתקדם'],
      default: 'בינוני',
    },
    hebrewSupport: {
      type: Boolean,
      default: false,
    },
    isFree: {
      type: Boolean,
      default: true,
    },
    outputType: {
      type: String,
      default: '',
    },
    pedagogicalContext: [{
      type: String,
      enum: ['הקניה', 'תרגול', 'הערכה'],
    }],
    communicationFormat: {
      type: String,
      default: '',
    },
    tags: [{
      type: String,
      trim: true,
    }],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create indexes for better search performance
toolSchema.index({ name: 'text', description: 'text', tags: 'text' });
toolSchema.index({ difficultyLevel: 1 });
toolSchema.index({ hebrewSupport: 1 });
toolSchema.index({ isFree: 1 });
toolSchema.index({ toolRating: -1 });

const Tool = models.Tool || mongoose.model<ITool>('Tool', toolSchema);
export default Tool; 