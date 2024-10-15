import { Document, Schema, model, models } from "mongoose";

export interface CategoryDocument extends Document {
  name: string;
  description?: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema = new Schema<CategoryDocument>(
  {
    name: { type: String, required: true },
    description: { type: String, required: false },
    image: { type: String },
  },
  { timestamps: true }
);

export const Category =
  (models.Category as any) ||
  model<CategoryDocument>("Category", CategorySchema);
