import { loadEnv, defineConfig } from '@medusajs/framework/utils'

const isProduction = process.env.NODE_ENV === 'production' || process.env.RAILWAY_ENVIRONMENT === 'production'
loadEnv(process.env.NODE_ENV || 'production', process.cwd())

console.log('=== MEDUSA CONFIG STARTING ===')
console.log('NODE_ENV:', process.env.NODE_ENV || 'production')
console.log('DATABASE_URL is set:', !!process.env.DATABASE_URL)
console.log('==============================')

export default defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    databaseDriverOptions: process.env.DATABASE_URL?.includes('sslmode=require') || process.env.DATABASE_URL?.includes('supabase') ? {
      ssl: {
        rejectUnauthorized: false,
      },
    } : {},
    http: {
      storeCors: process.env.STORE_CORS || '*',
      adminCors: process.env.ADMIN_CORS || '*',
      authCors: process.env.AUTH_CORS || '*',
      jwtSecret: process.env.JWT_SECRET || 'supersecretjwtkey123456',
      cookieSecret: process.env.COOKIE_SECRET || 'supersecretcookiekey123456',
    }
  },
  admin: {
    disable: process.env.DISABLE_MEDUSA_ADMIN === 'true' ? true : false,
    backendUrl: process.env.MEDUSA_BACKEND_URL || (process.env.RAILWAY_PUBLIC_DOMAIN ? `https://${process.env.RAILWAY_PUBLIC_DOMAIN}` : undefined),
    path: '/app',
  },
})
