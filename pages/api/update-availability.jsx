import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default async function handle(req, res) {
  await mongooseConnect();

  if (req.method !== "POST") {
    console.log("Request method is not POST");
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    console.log("Processing POST request");
    const { cartProducts } = req.body;

    if (!cartProducts || cartProducts.length === 0) {
      console.log("No cart products received", cartProducts);
      throw new Error("No cart products provided");
    }

    console.log(
      `Updating availability for ${cartProducts.length} cart products`
    );
    for (const item of cartProducts) {
      console.log("Processing product:", item.productId);
      const product = await Product.findById(item.productId);

      if (!product) {
        console.log(`Product not found: ${item.productId}`);
        throw new Error(`Product with ID ${item.productId} not found`);
      }

      if (product.properties && product.properties.length > 0) {
        console.log(`Product has ${product.properties.length} properties`);
        product.properties.forEach((prop) => {
          if (item.selectedProperties && item.selectedProperties[prop.name]) {
            const value = item.selectedProperties[prop.name];
            console.log(
              `Updating availability for property: ${prop.name}, value: ${value}`
            );
            if (prop.availability && prop.availability[value] !== undefined) {
              const oldAvailability = prop.availability[value];
              prop.availability[value] = Math.max(
                0,
                oldAvailability - item.quantity
              );
              console.log(
                `New availability for ${prop.name} (${value}):`,
                prop.availability[value]
              );
            }
          }
        });
      } else {
        console.log(
          "Product does not have properties, updating overall availability"
        );
        const oldAvailability = product.availability;
        product.availability = Math.max(0, oldAvailability - item.quantity);
        console.log(`New overall availability:`, product.availability);
      }
      
      product.markModified("properties");
      await product.save();
      console.log(`Product ${item.productId} availability updated`);
    }

    console.log("All products updated successfully");
    res
      .status(200)
      .json({ message: "Product availability updated successfully." });
  } catch (error) {
    console.error("Error updating availability:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
}
