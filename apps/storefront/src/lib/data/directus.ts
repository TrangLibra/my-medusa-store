export interface DirectusProductSEO {
  id?: number
  medusa_id?: string
  meta_title?: string
  meta_description?: string
  og_image?: string
}

const DIRECTUS_URL =
  process.env.NEXT_PUBLIC_DIRECTUS_URL ||
  "https://directus-production-54e2.up.railway.app"

/**
 * Fetch SEO metadata from Directus Headless CMS for a given Medusa Product ID
 */
export async function getDirectusProductSEO(
  medusaId: string
): Promise<DirectusProductSEO | null> {
  if (!medusaId) return null

  try {
    const res = await fetch(
      `${DIRECTUS_URL}/items/products?filter[medusa_id][_eq]=${encodeURIComponent(
        medusaId
      )}`,
      {
        next: { revalidate: 60 },
      }
    )

    if (!res.ok) {
      return null
    }

    const json = await res.json()
    if (json && Array.isArray(json.data) && json.data.length > 0) {
      return json.data[0] as DirectusProductSEO
    }

    return null
  } catch (error) {
    console.warn(
      `[Directus] Unable to fetch SEO metadata for product ${medusaId}:`,
      error
    )
    return null
  }
}

/**
 * Fetch all products/content from Directus CMS
 */
export async function getAllDirectusProducts(): Promise<DirectusProductSEO[]> {
  try {
    const res = await fetch(`${DIRECTUS_URL}/items/products`, {
      cache: "no-store", // Always fetch fresh data for demo
    })

    if (!res.ok) {
      return []
    }

    const json = await res.json()
    return (json?.data as DirectusProductSEO[]) || []
  } catch (error) {
    console.warn(`[Directus] Unable to fetch products:`, error)
    return []
  }
}
