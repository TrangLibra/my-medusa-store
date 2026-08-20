import { HttpTypes } from "@medusajs/types"
import CategoryRail from "./category-rail"

export default async function HomeCategories({
  categories,
  region,
}: {
  categories: HttpTypes.StoreProductCategory[]
  region: HttpTypes.StoreRegion
}) {
  return categories.map((category) => (
    <li key={category.id}>
      <CategoryRail category={category} region={region} />
    </li>
  ))
}