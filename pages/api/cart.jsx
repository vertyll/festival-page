import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default async function handle(req, res) {
  try {
    await mongooseConnect();

    // Przetwarzanie danych wejściowych, aby uzyskać tablicę identyfikatorów produktów
    const inputProducts = req.body.ids;
    const productIds = inputProducts.map((item) => item.productId);

    const selectedProperties = {};
    inputProducts.forEach((item) => {
      selectedProperties[item.productId] = item.selectedProperties;
    });

    // Wyszukiwanie produktów w bazie danych
    const products = await Product.find({ _id: { $in: productIds } });

    const modifiedProducts = products.map((product) => {
      // Konwersja dokumentu na zwykły obiekt JavaScript, jeśli jest to dokument Mongoose.
      const productObject = product.toObject ? product.toObject() : product;

      return {
        ...productObject,
        selectedProperties: selectedProperties[productObject._id.toString()], // Dodaj 'selectedProperty' do produktu.
      };
    });

    // Odpowiedź z zmodyfikowanymi produktami
    res.json(modifiedProducts);
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
