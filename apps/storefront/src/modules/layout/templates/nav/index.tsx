import { Suspense } from "react"

import { listLocales } from "@lib/data/locales"
import { getLocale } from "@lib/data/locale-actions"
import { listRegions } from "@lib/data/regions"
import { listCategories } from "@lib/data/categories"

import { StoreRegion } from "@medusajs/types"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"

export default async function Nav() {
  const [regions, locales, currentLocale, categories] = await Promise.all([
    listRegions().then((regions: StoreRegion[]) => regions),
    listLocales(),
    getLocale(),
    listCategories({
      fields: "id,name,handle",
    }),
  ])

  return (
    <div className="sticky top-0 inset-x-0 z-50 bg-white border-b shadow-sm">
      <header className="content-container h-20 flex items-center justify-between">
        {/* Left */}
        <div className="flex items-center gap-6">
          <SideMenu
            regions={regions}
            locales={locales}
            currentLocale={currentLocale}
          />

          <LocalizedClientLink
            href="/"
            className="text-2xl font-bold uppercase tracking-wide"
            data-testid="nav-store-link"
          >
            Medusa Store
          </LocalizedClientLink>
        </div>

        {/* Center */}
        <div className="hidden md:flex flex-1 justify-center px-10">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full max-w-md rounded-full border border-gray-300 px-5 py-2 text-sm outline-none focus:border-black"
          />
        </div>

        {/* Right */}
        <div className="flex items-center gap-8">
          <LocalizedClientLink
            href="/account"
            className="hover:text-black transition"
            data-testid="nav-account-link"
          >
            Account
          </LocalizedClientLink>

          <Suspense
            fallback={
              <LocalizedClientLink
                href="/cart"
                className="hover:text-black"
                data-testid="nav-cart-link"
              >
                Cart (0)
              </LocalizedClientLink>
            }
          >
            <CartButton />
          </Suspense>
        </div>
      </header>
    </div>
  )
}
