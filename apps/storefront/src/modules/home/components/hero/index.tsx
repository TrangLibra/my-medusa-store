import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Button, Heading } from "@modules/common/components/ui"

const Hero = () => {
  return (
    <section className="relative h-[550px] w-full overflow-hidden bg-gradient-to-r from-orange-50 to-orange-100">
      {/* Background */}
      <div className="absolute inset-0">
        <img
           src="/images/hero-fashion.jpg"
          alt="Hero Banner"
          className="h-full w-full object-cover opacity-40"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 content-container flex h-full items-center">
        <div className="max-w-xl space-y-6">
          <p className="text-orange-600 font-semibold uppercase tracking-widest">
            Welcome to
          </p>

          <Heading
            level="h1"
            className="text-5xl font-bold leading-tight text-gray-900"
          >
            Medusa Store
          </Heading>

          <p className="text-lg text-gray-700">
            Discover the newest collections with premium quality and the best
            prices.
          </p>

          <div className="flex gap-4">
            <LocalizedClientLink href="/store">
              <Button>
                Shop Now
              </Button>
            </LocalizedClientLink>

            <LocalizedClientLink href="/categories/shirts">
              <Button variant="secondary">
                Explore
              </Button>
            </LocalizedClientLink>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero