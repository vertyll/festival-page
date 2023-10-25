import mongoose, { model, models, Schema } from "mongoose";

const AddressSchema = new Schema({
  userEmail: { type: String, unique: true, required: true },
  name: { type: String },
  email: { type: String },
  city: { type: String },
  postalCode: { type: String },
  streetAddress: { type: String },
  country: { type: String },
});

export const Address = models?.Address || model("Address", AddressSchema);
