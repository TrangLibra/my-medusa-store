import { Metadata } from "next"

import Hero from "@modules/home/components/hero"
import { listCategories } from "@lib/data/categories"
import { getRegion } from "@lib/data/regions"
import { getAllDirectusProducts } from "@lib/data/directus"
import HomeCategories from "@modules/home/components/home-categories"

export const metadata: Metadata = {
  title: "Medusa Next.js Starter Template",
  description:
    "A performant frontend ecommerce starter template with Next.js 15 and Medusa.",
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params

  const { countryCode } = params

  const region = await getRegion(countryCode)

  const [categories, directusProducts] = await Promise.all([
    listCategories({
      fields: "id,name,handle",
    }),
    getAllDirectusProducts(),
  ])

  const directusTitle = directusProducts[0]?.meta_title

  if (!categories || !region) {
    return null
  }
  return (
    <>
      {directusTitle && (
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white py-3 px-4 text-center shadow-md flex items-center justify-center gap-2 text-sm font-medium">
          <span className="bg-black/20 text-white text-xs px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
            Directus CMS Live
          </span>
          <span>{directusTitle}</span>
        </div>
      )}
      <Hero />
      <div className="py-12">
        <ul className="flex flex-col gap-x-6">
          <HomeCategories categories={categories} region={region} />
        </ul>
      </div>
    </>
  )
}
