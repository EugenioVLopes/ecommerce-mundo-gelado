import { model, models, Schema } from "mongoose";

const OrderSchema = new Schema(
  {
    user: { type: Object, ref: "User", required: true },
    items: [
      {
        id: { type: Schema.Types.ObjectId, ref: "Product", required: true },
        product: { type: Object, required: true },
        quantity: { type: Number, required: true },
        // selectedSize: { type: String },
        // selectedCreams: { type: [String] },
        // selectedFruits: { type: [String] },
        // selectedToppings: { type: [String] },
      },
    ],
    total: { type: Number, required: true },
    address: { type: Object, required: true },
    paymentMethod: { type: String, required: true },
    change: { type: Number },
    status: {
      type: String,
      enum: ["pending", "prepared", "paid", "shipped", "delivered", "canceled"],
      default: "pending",
      required: true,
    },
  },
  { timestamps: true }
);

export const Order = (models.Order as any) || model("Order", OrderSchema);

export default Order;
