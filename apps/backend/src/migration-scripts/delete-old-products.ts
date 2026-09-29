import { MedusaContainer } from "@medusajs/framework";
import { ContainerRegistrationKeys } from "@medusajs/framework/utils";
import { deleteProductsWorkflow, deleteProductCategoriesWorkflow } from "@medusajs/core-flows";

export default async function wipeAll({
  container,
}: {
  container: MedusaContainer;
}) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
  const query = container.resolve(ContainerRegistrationKeys.QUERY);
  
  const { data: allProducts } = await query.graph({ entity: "product", fields: ["id"] });
  if (allProducts.length > 0) {
    logger.info(`Deleting ${allProducts.length} products...`);
    await deleteProductsWorkflow(container).run({ input: { ids: allProducts.map(p => p.id) } });
  }

  const { data: allCategories } = await query.graph({ entity: "product_category", fields: ["id"] });
  if (allCategories.length > 0) {
    logger.info(`Deleting ${allCategories.length} categories...`);
    await deleteProductCategoriesWorkflow(container).run({ input: allCategories.map(c => c.id) });
  }

  logger.info("Wiped all products and categories!");
}
