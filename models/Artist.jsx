import mongoose, { model, Schema, models } from "mongoose";

const ArtistSchema = new Schema(
  {
    name: { type: String, required: true },
    images: { type: [String] },
    description: { type: String },
    stage: { type: mongoose.Types.ObjectId, ref: "Stage", required: true },
    concertDate: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

export const Artist = models?.Artist || model("Artist", ArtistSchema);
