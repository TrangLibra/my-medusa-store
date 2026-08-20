"use client"

import { useTransition } from "react"
import { addToCart } from "@lib/data/cart"

type Props = {
  variantId: string
  countryCode: string
}

export default function AddToCartButton({
  variantId,
  countryCode,
}: Props) {
  const [pending, startTransition] = useTransition()

  return (
    <button
      className="w-full mt-3 rounded-lg bg-black text-white py-2 hover:bg-gray-800 transition"
      disabled={pending}
      onClick={() =>
        startTransition(async () => {
          await addToCart({
            variantId,
            quantity: 1,
            countryCode,
          })
        })
      }
    >
      {pending ? "Adding..." : "Add to Cart"}
    </button>
  )
}