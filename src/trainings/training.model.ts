import * as mongoose from 'mongoose';

export const TrainingSchema = new mongoose.Schema({
    trainingDate: { type: String, required: true },
    description: String,
    distance: Number,
    calories: Number,
    time: Number,
    userId: String,
    createdDate: Date,
    lastUpdatedDateTime: Date,
    isActive: Boolean,
});

export interface Training extends mongoose.Document {
    id: string;
    trainingDate: string;
    description: string;
    distance: number | null;
    calories: number | null;
    time: number | null;
    userId: string;
    createdDate: Date;
    lastUpdatedDateTime: Date;
    isActive: boolean;
}
