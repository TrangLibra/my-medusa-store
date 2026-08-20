import { Metadata } from "next"

import Hero from "@modules/home/components/hero"
import { listCategories } from "@lib/data/categories"
import { getRegion } from "@lib/data/regions"
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

  const categories = await listCategories({
    fields: "id,name,handle",
  })
  console.log("Categories:", categories)
  if (!categories || !region) {
    return null
  }
  return (
    <>
      <Hero />
      <div className="py-12">
        <ul className="flex flex-col gap-x-6">
          <HomeCategories categories={categories} region={region} />
        </ul>
      </div>
    </>
  )
}
