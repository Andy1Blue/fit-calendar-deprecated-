import * as mongoose from 'mongoose';

export const LogSchema = new mongoose.Schema({
  userId: String,
  date: Date,
  createdDate: String,
  log: String,
  category: String,
});

export interface Log extends mongoose.Document {
  id: string;
  userId: string;
  date: Date;
  createdDate: string;
  log: string;
  category: string;
}
