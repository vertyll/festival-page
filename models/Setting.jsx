import { model, models, Schema } from "mongoose";

const SettingSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    value: { type: Object },
  },
  { timestamps: true }
);

export const Setting = models?.Setting || model("Setting", SettingSchema);
