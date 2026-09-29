import { MedusaContainer } from "@medusajs/framework";
import { ContainerRegistrationKeys } from "@medusajs/framework/utils";
import { updateProductsWorkflow } from "@medusajs/core-flows";

export default async function addImagesToProducts({
  container,
}: {
  container: MedusaContainer;
}) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
  const query = container.resolve(ContainerRegistrationKeys.QUERY);
  
  logger.info("Fetching products to update images...");
  
  const { data: products } = await query.graph({
    entity: "product",
    fields: ["id", "title"],
    filters: {
      title: { $ilike: "%Thức Ăn Hạt Cho Mèo Cưng%" }
    }
  });

  logger.info(`Found ${products.length} products to update. Updating in batches...`);

  const catFoodImages = [
    "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1623366302587-b054238e2170?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1652156821361-9c602058b8d4?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=800&q=80"
  ];

  const batchSize = 10;
  for (let i = 0; i < products.length; i += batchSize) {
    const batch = products.slice(i, i + batchSize);
    
    const updates = batch.map((product) => {
      // Pick random images for this product
      const shuffled = [...catFoodImages].sort(() => 0.5 - Math.random());
      const selectedImages = shuffled.slice(0, 3); // 3 random images

      return {
        id: product.id,
        thumbnail: selectedImages[0],
        images: selectedImages.map(url => ({ url }))
      };
    });

    await updateProductsWorkflow(container).run({
      input: { products: updates }
    });
    
    logger.info(`Updated batch ${i / batchSize + 1} of ${Math.ceil(products.length / batchSize)}`);
  }

  logger.info("Successfully added images to all products!");
}
