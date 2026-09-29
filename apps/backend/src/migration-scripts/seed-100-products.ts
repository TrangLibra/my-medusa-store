import { MedusaContainer } from "@medusajs/framework";
import { ContainerRegistrationKeys, ProductStatus } from "@medusajs/framework/utils";
import { createProductsWorkflow } from "@medusajs/medusa/core-flows";

export default async function seed_100_products({
  container,
}: {
  container: MedusaContainer;
}) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
  const query = container.resolve(ContainerRegistrationKeys.QUERY);

  logger.info("Fetching default sales channel and shipping profile...");
  
  const { data: salesChannelResult } = await query.graph({
    entity: "sales_channel",
    fields: ["id"],
    filters: { name: "Default Sales Channel" },
  });
  const salesChannel = salesChannelResult[0];

  const { data: shippingProfileResult } = await query.graph({
    entity: "shipping_profile",
    fields: ["id"],
  });
  const shippingProfile = shippingProfileResult[0];

  if (!salesChannel || !shippingProfile) {
    logger.error("Could not find default sales channel or shipping profile.");
    return;
  }

  logger.info("Generating 100 products with variants...");
  
  const timestamp = Date.now().toString().slice(-4);
  const productsToCreate = [];

  for (let i = 1; i <= 100; i++) {
    productsToCreate.push({
      title: `Thức Ăn Hạt Cho Mèo Cưng ${i} (${timestamp})`,
      description: `Mô tả chi tiết cho sản phẩm thức ăn hạt cao cấp thứ ${i}.`,
      handle: `thuc-an-meo-cung-${i}-${timestamp}`,
      status: ProductStatus.PUBLISHED,
      shipping_profile_id: shippingProfile.id,
      options: [
        {
          title: "Khối lượng",
          values: ["1kg", "2kg", "5kg"]
        }
      ],
      variants: [
        {
          title: "1kg",
          sku: `SP${i}-1KG-${timestamp}`,
          options: {
            "Khối lượng": "1kg"
          },
          prices: [
            { amount: 100000, currency_code: "vnd" }
          ],
        },
        {
          title: "2kg",
          sku: `SP${i}-2KG-${timestamp}`,
          options: {
            "Khối lượng": "2kg"
          },
          prices: [
            { amount: 190000, currency_code: "vnd" }
          ],
        },
        {
          title: "5kg",
          sku: `SP${i}-5KG-${timestamp}`,
          options: {
            "Khối lượng": "5kg"
          },
          prices: [
            { amount: 450000, currency_code: "vnd" }
          ],
        }
      ],
      sales_channels: [
        { id: salesChannel.id }
      ],
    });
  }

  logger.info(`Creating ${productsToCreate.length} products (this might take a minute)...`);
  
  // Create products in batches of 20 to avoid payload size issues or timeouts
  const batchSize = 20;
  for (let i = 0; i < productsToCreate.length; i += batchSize) {
    const batch = productsToCreate.slice(i, i + batchSize);
    logger.info(`Processing batch ${i / batchSize + 1} of ${Math.ceil(productsToCreate.length / batchSize)}`);
    
    await createProductsWorkflow(container).run({
      input: {
        products: batch,
      },
    });
  }

  logger.info("Finished successfully creating 100 products with 3 variants each!");
}
