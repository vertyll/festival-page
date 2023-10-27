import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default async function handle(req, res) {
  await mongooseConnect();

  const { categories, sort, phrase, ...filters } = req.query;
  let [sortField, sortOrder] = (sort || "_id-desc").split("-");

  const productQuery = {};
  if (categories) {
    productQuery.categories = categories.split(",");
  }

  if (phrase) {
    productQuery["$or"] = [
      {
        name: { $regex: phrase, $options: "i" },
      },
      {
        description: { $regex: phrase, $options: "i" },
      },
    ];
  }

  if (Object.keys(filters).length > 0) {
    Object.keys(filters).forEach((filterName) => {
      productQuery["properties" + filterName] = filters[filterName];
    });
  }

  console.log(productQuery);
  res.json(
    await Product.find(productQuery, null, {
      sort: { [sortField]: sortOrder === "asc" ? 1 : -1 },
    })
  );
}
