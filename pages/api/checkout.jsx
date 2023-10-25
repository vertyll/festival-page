import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { Order } from "@/models/Order";
import { authOptions } from "./auth/[...nextauth]";
import { getServerSession } from "next-auth";
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
      // Tworzenie opisu z wybranych właściwości, jeśli istnieją.
      let description = "Brak właściwości";
      if (productDetail.selectedProperty) {
        description = Object.entries(productDetail.selectedProperty)
          .map(([key, value]) => `${key}: ${value}`)
          .join(", ");
      }

      // Dodaj produkt do listy elementów zamówienia.
      line_items.push({
        quantity: 1, // zakładając, że każdy wpis w cartProducts to jeden produkt.
        price_data: {
          currency: "PLN",
          product_data: {
            name: productInfo.name,
            // Dodajemy opis tylko jeśli istnieje (czyli produkt ma dodatkowe właściwości).
            ...(description && { description }),
          },
          unit_amount: productInfo.price * 100, // Cena za jednostkę.
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

  // Tworzenie sesji Stripe Checkout.
  const stripeSession = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items,
    mode: "payment",
    customer_email: email,
    success_url: `${process.env.PUBLIC_URL}/cart?success=1`,
    cancel_url: `${process.env.PUBLIC_URL}/cart?canceled=1`,
    metadata: { orderId: orderDoc._id.toString() },
  });

  // Odpowiedź serwera z adresem URL do przejścia na stronę płatności Stripe.
  res.json({
    url: stripeSession.url,
  });
}
