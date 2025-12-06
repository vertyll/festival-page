import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default async function handle(req, res) {
  await mongooseConnect();

  if (req.method !== "POST") {
    console.log("Metoda żądania nie jest metodą POST");
    return res.status(405).json({ message: "Metoda jest niedozwolona" });
  }

  try {
    console.log("Przetwarzanie żądania POST");
    const { cartProducts } = req.body;

    if (!cartProducts || cartProducts.length === 0) {
      console.log("Nie otrzymano żadnych produktów z koszyka", cartProducts);
      throw new Error("Brak produktów w koszyku");
    }

    console.log(`Aktualizacja dostępności dla ${cartProducts.length} produktów`);
    for (const item of cartProducts) {
      console.log("Przetwarzam produkt:", item.productId);
      const product = await Product.findById(item.productId);

      if (!product) {
        console.log(`Nie znaleziono produktu: ${item.productId}`);
        throw new Error(`Produkt o ID ${item.productId} nie został znaleziony`);
      }

      if (product.combinations && product.combinations.length > 0) {
        console.log("Aktualizacja dostępności kombinacji");
        for (const comb of product.combinations) {
          let isMatchingCombination = true;
          for (const propName in item.selectedProperties) {
            if (!comb.combination.includes(item.selectedProperties[propName])) {
              isMatchingCombination = false;
              break;
            }
          }

          if (isMatchingCombination) {
            const oldAvailability = comb.availability;
            comb.availability = Math.max(0, oldAvailability - item.quantity);
            console.log(`Zaktualizowano dostępność dla kombinacji: ${comb.combination.join(", ")}`);
            break;
          }
        }
      } else {
        console.log("Aktualizacja ogólnej dostępności");
        const oldAvailability = product.availability;
        product.availability = Math.max(0, oldAvailability - item.quantity);
        console.log(`Zaktualizowano ogólną dostępność: ${product.availability}`);
      }

      product.markModified("combinations");
      await product.save();
      console.log(`Zaktualizowano stan magazynowy dla produktu ${item.productId}`);
    }

    console.log("Wszystkie stany magazynowe zostały zaktualizowane");
    res.status(200).json({ message: "Dostępność produktu została zaktualizowana." });
  } catch (error) {
    console.error("Błąd przy aktualizacji stanu magazynowego:", error);
    res.status(500).json({ message: "Wewnętrzny błąd serwera", error: error.message });
  }
}
