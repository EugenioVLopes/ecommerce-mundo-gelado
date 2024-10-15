import { model, models, Schema } from "mongoose";

export interface MenuItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  category: string;
  sizes: SizeOption[];
}

export interface SizeOption {
  name: string;
  price: number;
  maxFruits?: number;
  maxCreams?: number;
  maxToppings?: number;
}

// Subdocumento para Tamanho
const SizeOptionSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  maxFruits: {
    type: Number,
  },
  maxCreams: {
    type: Number,
  },
  maxToppings: {
    type: Number,
  },
});

// Definição do schema para MenuItem
const MenuItemSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
    },
    category: {
      type: String,
      required: true,
    },
    // Só será requerido se a categoria for "Açaí"
    sizes: {
      type: [SizeOptionSchema],
      validate: {
        validator: function (this: any) {
          return (
            this.category !== "Açaí" || (this.sizes && this.sizes.length > 0)
          );
        },
        message: "Tamanhos são obrigatórios para Açaí",
      },
    },
  },
  { timestamps: true }
);

export const MenuItem = models?.MenuItem || model("MenuItem", MenuItemSchema);
