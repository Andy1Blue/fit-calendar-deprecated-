import * as mongoose from 'mongoose';

export const WhitelistSchema = new mongoose.Schema({
  id: String,
  userId: String,
  createdDate: Date,
  isActive: Boolean,
});

export interface Whitelist extends mongoose.Document {
  id: string;
  userId: string;
  createdDate: Date;
  isActive: boolean;
}
