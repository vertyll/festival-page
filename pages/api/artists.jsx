import { mongooseConnect } from "@/lib/mongoose";
import { Artist } from "@/models/Artist";

export default async function handle(req, res) {
  await mongooseConnect();

  const { sort, term } = req.query;
  let [sortField, sortOrder] = (sort || "_id-desc").split("-");

  let artistsQuery = {};
  if (term) {
    artistsQuery["$or"] = [{ name: { $regex: term, $options: "i" } }, { description: { $regex: term, $options: "i" } }];
  }

  console.log(artistsQuery);
  res.json(
    await Artist.find(artistsQuery, null, {
      sort: { [sortField]: sortOrder === "asc" ? 1 : -1 },
    })
  );
}
