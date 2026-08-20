import { Text } from "@modules/common/components/ui"
import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"
import AddToCartButton from "../add-to-cart-button"

export default async function ProductPreview({
  product,
  isFeatured,
  region: _region,
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
}) {
  const { cheapestPrice } = getProductPrice({
    product,
  })

  return (
    <LocalizedClientLink
      href={`/products/${product.handle}`}
      className="group block"
    >
      <div
        className="
          rounded-xl
          overflow-hidden
          bg-white
          shadow-sm
          hover:shadow-xl
          transition-all
          duration-300
          hover:-translate-y-1
        "
        data-testid="product-wrapper"
      >
        {/* Image */}
        <div className="overflow-hidden">
          <div className="group-hover:scale-105 transition-transform duration-500">
            <Thumbnail
              thumbnail={product.thumbnail}
              images={product.images}
              size="full"
              isFeatured={isFeatured}
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-2">
          <Text
            className="font-semibold text-base text-gray-900 line-clamp-2"
            data-testid="product-title"
          >
            {product.title}
          </Text>

          <div className="flex justify-between items-center">
            <div className="font-bold text-lg text-black">
              {cheapestPrice && <PreviewPrice price={cheapestPrice} />}
            </div>

            <span className="text-xs bg-black text-white px-2 py-1 rounded-full">
              NEW
            </span>
          </div>

          <AddToCartButton
  variantId={product.variants?.[0]?.id ?? ""}
  countryCode={_region.countries?.[0]?.iso_2 ?? "dk"}
/>
        </div>
      </div>
    </LocalizedClientLink>
  )
}