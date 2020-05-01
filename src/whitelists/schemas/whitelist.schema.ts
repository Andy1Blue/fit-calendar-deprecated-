import * as mongoose from 'mongoose';

export const WhitelistSchema = new mongoose.Schema({
  id: String,
  userId: String,
  isActive: Boolean,
});

export interface Whitelist extends mongoose.Document {
  id: string;
  userId: string;
  isActive: boolean;
}
