import * as moongose from "mongoose";

export interface Category extends moongose.Document {
  id: string;
  name: string;
  slug: string;
  description: string;
  parentId: string;
  imageUrl: string;
  order: number;
}

export const CategorySchema = new moongose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 25
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true,
    maxlength: 300
  },
  parentId: { type: moongose.SchemaTypes.ObjectId, default: null },

  imageUrl: { type: String, required: true },

  order: {
    type: Number,
    default: 1000
  }
});
