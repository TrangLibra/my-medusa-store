import { listProducts } from "@lib/data/products"
import { HttpTypes } from "@medusajs/types"
import { Text } from "@modules/common/components/ui"

import InteractiveLink from "@modules/common/components/interactive-link"
import ProductPreview from "@modules/products/components/product-preview"

export default async function CategoryRail({
  category,
  region,
}: {
  category: HttpTypes.StoreProductCategory
  region: HttpTypes.StoreRegion
}) {
  const {
    response: { products: pricedProducts },
  } = await listProducts({
    regionId: region.id,
    queryParams: {
      category_id: category.id,
      limit: 6,
      fields: "*variants.calculated_price",
    },
  })

  console.log("Category:", category.name)
  console.log("Products:", pricedProducts)
  if (!pricedProducts?.length) {
    return null
  }

  return (
    <div className="content-container py-12 small:py-24">
      <div className="mb-8 flex justify-between">
        <Text className="txt-xlarge">{category.name}</Text>

        <InteractiveLink href={`/categories/${category.handle}`}>
          View all
        </InteractiveLink>
      </div>

      <ul className="grid grid-cols-2 gap-x-6 gap-y-24 small:grid-cols-3 small:gap-y-36">
        {pricedProducts.map((product) => (
          <li key={product.id}>
            <ProductPreview product={product} region={region} isFeatured />
          </li>
        ))}
      </ul>
    </div>
  )
}
