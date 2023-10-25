import { model, models, Schema } from "mongoose";

const OrderSchema = new Schema(
  {
    userEmail: { type: String },
    line_items: { type: Object },
    name: { type: String },
    email: { type: String },
    city: { type: String },
    postalCode: { type: String },
    streetAddress: { type: String },
    country: { type: String },
    paid: { type: Boolean },
  },
  {
    timestamps: true,
  }
);

export const Order = models?.Order || model("Order", OrderSchema);
