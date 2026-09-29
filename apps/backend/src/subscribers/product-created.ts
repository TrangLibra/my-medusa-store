import type { SubscriberArgs, SubscriberConfig } from "@medusajs/framework"

export default async function productCreateHandler({
  event: { data },
  container,
}: SubscriberArgs<{ id: string }>) {
  const productId = data.id
  const directusUrl =
    process.env.DIRECTUS_URL ||
    "https://directus-production-54e2.up.railway.app"

  try {
    const productModuleService = container.resolve("product")
    const product = await productModuleService.retrieveProduct(productId)

    if (!product) {
      console.log(`[Directus Sync] Product ${productId} not found in Medusa`)
      return
    }

    console.log(
      `[Directus Sync] Syncing new product to Directus: "${product.title}" (${productId})`
    )

    // Call Directus REST API to create a matching SEO metadata item
    const res = await fetch(`${directusUrl}/items/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        medusa_id: product.id,
        meta_title: `${product.title} | Chính Hãng Giá Tốt`,
      }),
    })

    if (!res.ok) {
      const errorText = await res.text()
      console.warn(
        `[Directus Sync] Failed to sync product ${productId} to Directus:`,
        errorText
      )
    } else {
      console.log(
        `[Directus Sync] Successfully created Directus entry for product ${productId}!`
      )
    }
  } catch (error) {
    console.error(`[Directus Sync] Error during synchronization:`, error)
  }
}

export const config: SubscriberConfig = {
  event: "product.created",
}
