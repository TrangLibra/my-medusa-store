import { MedusaContainer } from "@medusajs/framework";
import { ContainerRegistrationKeys } from "@medusajs/framework/utils";
import dotenv from "dotenv";

dotenv.config();

export default async function sync_all_to_directus({
  container,
}: {
  container: MedusaContainer;
}) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
  const query = container.resolve(ContainerRegistrationKeys.QUERY);
  
  const directusUrl = process.env.DIRECTUS_URL;
  if (!directusUrl) {
    logger.error("DIRECTUS_URL is not set in .env!");
    return;
  }

  logger.info("Fetching all products from Medusa...");
  const { data: products } = await query.graph({
    entity: "product",
    fields: ["id", "title"],
  });

  logger.info(`Found ${products.length} products. Syncing to Directus...`);

  let successCount = 0;
  let failCount = 0;

  for (const product of products) {
    try {
      const res = await fetch(`${directusUrl}/items/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          medusa_id: product.id,
          meta_title: `${product.title} | Chính Hãng Giá Tốt`,
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        logger.error(`Failed to sync product ${product.id}: ${errorText}`);
        failCount++;
      } else {
        successCount++;
      }
    } catch (error) {
      logger.error(`Network error for product ${product.id}: ${error.message}`);
      failCount++;
    }
  }

  logger.info(`Sync finished! Success: ${successCount}, Failed: ${failCount}`);
}
