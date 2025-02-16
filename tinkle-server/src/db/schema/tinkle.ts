import { Document, Model, model, Schema } from "mongoose";

export interface TinkleInterface extends Document {
  hash: string;
  text: string;
}

const TinkleSchema = new Schema<TinkleInterface>(
  {
    hash: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: false,
    },
  }
);

const Tinkle: Model<TinkleInterface> = model<TinkleInterface>(
  "Message",
  TinkleSchema
);
export default Tinkle;
