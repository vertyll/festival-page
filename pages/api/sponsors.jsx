import { mongooseConnect } from "@/lib/mongoose";
import { Sponsor } from "@/models/Sponsor";

export default async function handle(req, res) {
  await mongooseConnect();

  const { sort, term } = req.query;
  let [sortField, sortOrder] = (sort || "_id-desc").split("-");

  let sponsorsQuery = {};
  if (term) {
    sponsorsQuery["$or"] = [
      { name: { $regex: term, $options: "i" } },
      { description: { $regex: term, $options: "i" } },
    ];
  }

  console.log(sponsorsQuery);
  res.json(
    await Sponsor.find(sponsorsQuery, null, {
      sort: { [sortField]: sortOrder === "asc" ? 1 : -1 },
    })
  );
}
