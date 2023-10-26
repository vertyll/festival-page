import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { Order } from "@/models/Order";
import { authOptions } from "./auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { Setting } from "@/models/Setting";
const stripe = require("stripe")(process.env.STRIPE_SK);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method Not Allowed" });
    return;
  }

  const {
    name,
    email,
    city,
    postalCode,
    streetAddress,
    country,
    cartProducts, // Może zawierać produkty z lub bez właściwości.
  } = req.body;

  await mongooseConnect();

  // Wyciągamy tylko identyfikatory produktów z przekazanych danych.
  const uniqueIds = cartProducts.map((item) => item.productId);

  // Wyszukaj produkty w bazie danych na podstawie przekazanych identyfikatorów.
  const productsInfos = await Product.find({ _id: { $in: uniqueIds } });

  let line_items = [];
  for (const productDetail of cartProducts) {
    const productInfo = productsInfos.find(
      (p) => p._id.toString() === productDetail.productId
    );

    if (productInfo) {
      let description = "Brak właściwości";
      if (productDetail.selectedProperties) {
        description = Object.entries(productDetail.selectedProperties)
          .map(([key, value]) => `${key}: ${value}`)
          .join(", ");
      }

      // Tutaj używamy 'quantity' z przekazanego obiektu 'productDetail'.
      line_items.push({
        quantity: productDetail.quantity || 1, // jeśli 'quantity' nie jest zdefiniowane, zakładamy, że wynosi 1
        price_data: {
          currency: "PLN",
          product_data: {
            name: productInfo.name,
            ...(description && { description }),
          },
          unit_amount: productInfo.price * 100, // Cena w groszach, ponieważ Stripe oczekuje wartości w najmniejszej jednostce waluty.
        },
      });
    }
  }

  const session = await getServerSession(req, res, authOptions);

  // Tworzenie dokumentu zamówienia.
  const orderDoc = await Order.create({
    line_items,
    name,
    email,
    city,
    postalCode,
    streetAddress,
    country,
    paid: false,
    userEmail: session?.user?.email,
  });

  const shippingPriceSetting = await Setting.findOne({ name: "shippingPrice" });

  // Tworzenie sesji Stripe Checkout.
  const stripeSession = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items,
    mode: "payment",
    customer_email: email,
    success_url: `${process.env.PUBLIC_URL}/cart?success=1`,
    cancel_url: `${process.env.PUBLIC_URL}/cart?canceled=1`,
    metadata: { orderId: orderDoc._id.toString() },
    allow_promotion_codes: true,
    shipping_options: [
      {
        shipping_rate_data: {
          display_name: 'Cena dostawy',
          type: "fixed_amount",
          fixed_amount: { amount: Number(shippingPriceSetting.value) * 100, currency: "PLN" },
        },
      },
    ],
  });

  // Odpowiedź serwera z adresem URL do przejścia na stronę płatności Stripe.
  res.json({
    url: stripeSession.url,
  });
}
