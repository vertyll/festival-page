import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default async function handle(req, res) {
  try {
    await mongooseConnect();

    // Przetwarzanie danych wejściowych, aby uzyskać tablicę identyfikatorów produktów
    const inputProducts = req.body.ids;
    const productIds = inputProducts.map((item) => item.productId);

    // Jeśli potrzebujesz dostępu do właściwości 'selectedProperty', możesz je także wyodrębnić tutaj.
    // Na przykład możesz zbudować obiekt mapujący identyfikatory produktów na wybrane właściwości.
    const selectedProperties = {};
    inputProducts.forEach((item) => {
      selectedProperties[item.productId] = item.selectedProperty;
    });

    // Wyszukiwanie produktów w bazie danych
    const products = await Product.find({ _id: { $in: productIds } });

    // Jeśli chcesz zmodyfikować produkty, aby uwzględnić 'selectedProperty', możesz to zrobić tutaj.
    // Upewnij się, że logika pasuje do struktury Twojego modelu 'Product'.
    const modifiedProducts = products.map((product) => {
      // Konwersja dokumentu na zwykły obiekt JavaScript, jeśli jest to dokument Mongoose.
      const productObject = product.toObject ? product.toObject() : product;

      return {
        ...productObject,
        selectedProperty: selectedProperties[productObject._id.toString()], // Dodaj 'selectedProperty' do produktu.
      };
    });

    // Odpowiedź z zmodyfikowanymi produktami
    res.json(modifiedProducts);
  } catch (error) {
    // Dobrą praktyką jest obsługa możliwych błędów podczas operacji z bazą danych lub innych nieoczekiwanych błędów.
    console.error("An error occurred:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
