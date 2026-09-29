import { MedusaContainer } from "@medusajs/framework";
import { ContainerRegistrationKeys } from "@medusajs/framework/utils";
import { createProductsWorkflow, createProductCategoriesWorkflow } from "@medusajs/core-flows";

export default async function seedRealisticProducts({
  container,
}: {
  container: MedusaContainer;
}) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
  const query = container.resolve(ContainerRegistrationKeys.QUERY);
  
  logger.info("Fetching default Sales Channel...");
  const { data: channels } = await query.graph({
    entity: "sales_channel",
    fields: ["id"],
    filters: { name: "Default Sales Channel" }
  });
  const channelId = channels[0]?.id;

  logger.info("Creating Product Categories...");
  const { result: categories } = await createProductCategoriesWorkflow(container).run({
    input: {
      product_categories: [
        { name: "Thức Ăn Hạt", handle: "thuc-an-hat", is_active: true },
        { name: "Pate & Thức Ăn Ướt", handle: "pate", is_active: true },
        { name: "Cát Vệ Sinh", handle: "cat-ve-sinh", is_active: true }
      ]
    }
  });

  const catFoodId = categories.find(c => c.handle === "thuc-an-hat")?.id;
  const pateId = categories.find(c => c.handle === "pate")?.id;
  const litterId = categories.find(c => c.handle === "cat-ve-sinh")?.id;

  logger.info("Creating 15 Realistic Products...");

  const baseProducts = [
    // --- Thức ăn hạt ---
    {
      title: "Royal Canin Kitten (Hạt cho mèo con)",
      handle: "royal-canin-kitten",
      description: "Hạt Royal Canin cao cấp dành cho mèo con dưới 12 tháng tuổi, hỗ trợ tiêu hóa và miễn dịch.",
      category_ids: [catFoodId],
      thumbnail: "http://localhost:8000/images/food.jpg",
      price: 150000,
    },
    {
      title: "Royal Canin Hairball Care",
      handle: "royal-canin-hairball",
      description: "Thức ăn hạt giúp tiêu búi lông hiệu quả cho mèo trưởng thành.",
      category_ids: [catFoodId],
      thumbnail: "http://localhost:8000/images/food.jpg",
      price: 180000,
    },
    {
      title: "Whiskas Vị Cá Biển",
      handle: "whiskas-ocean-fish",
      description: "Thức ăn hạt Whiskas hương vị cá biển tươi ngon, giàu dinh dưỡng.",
      category_ids: [catFoodId],
      thumbnail: "http://localhost:8000/images/food.jpg",
      price: 90000,
    },
    {
      title: "Me-O Seafood (Hải sản)",
      handle: "me-o-seafood",
      description: "Hạt Me-O vị hải sản đặc trưng, cung cấp đầy đủ taurine cho mắt mèo sáng khỏe.",
      category_ids: [catFoodId],
      thumbnail: "http://localhost:8000/images/food.jpg",
      price: 85000,
    },
    {
      title: "Nutrience Original Healthy Adult",
      handle: "nutrience-original",
      description: "Thức ăn hạt Nutrience thịt gà tươi nguyên chất từ Canada.",
      category_ids: [catFoodId],
      thumbnail: "http://localhost:8000/images/food.jpg",
      price: 250000,
    },

    // --- Pate ---
    {
      title: "Pate Ciao Churu Gà & Tuộc",
      handle: "pate-ciao-chicken-octopus",
      description: "Pate thưởng dạng súp Ciao Churu cực kỳ hấp dẫn mèo cưng.",
      category_ids: [pateId],
      thumbnail: "http://localhost:8000/images/pate.jpg",
      price: 15000,
    },
    {
      title: "Pate Whiskas Cá Ngừ",
      handle: "pate-whiskas-tuna",
      description: "Pate Whiskas đóng lon vị cá ngừ thơm ngon, bù nước cho mèo.",
      category_ids: [pateId],
      thumbnail: "http://localhost:8000/images/pate.jpg",
      price: 22000,
    },
    {
      title: "Pate Nekko Jelly Cá Ngừ Trẻ Em",
      handle: "pate-nekko-kitten",
      description: "Pate Nekko dạng thạch dành riêng cho mèo con, dễ tiêu hóa.",
      category_ids: [pateId],
      thumbnail: "http://localhost:8000/images/pate.jpg",
      price: 18000,
    },
    {
      title: "Pate Snappy Tom Gà & Cá Hồi",
      handle: "pate-snappy-tom",
      description: "Thức ăn ướt Snappy Tom cao cấp, không độn ngũ cốc.",
      category_ids: [pateId],
      thumbnail: "http://localhost:8000/images/pate.jpg",
      price: 25000,
    },
    {
      title: "Pate Royal Canin Recovery",
      handle: "pate-royal-canin-recovery",
      description: "Pate phục hồi sức khỏe cho mèo ốm, hàm lượng calo cao.",
      category_ids: [pateId],
      thumbnail: "http://localhost:8000/images/pate.jpg",
      price: 55000,
    },

    // --- Cát vệ sinh ---
    {
      title: "Cát Đất Sét Moon Cat (Hương Chanh)",
      handle: "moon-cat-lemon",
      description: "Cát đất sét vón cục tốt, khử mùi hương chanh dễ chịu, ít bụi.",
      category_ids: [litterId],
      thumbnail: "http://localhost:8000/images/litter.jpg",
      price: 65000,
    },
    {
      title: "Cát Đậu Nành Cature (Tofu)",
      handle: "cature-tofu",
      description: "Cát đậu nành Cature thân thiện môi trường, có thể xả trực tiếp vào bồn cầu.",
      category_ids: [litterId],
      thumbnail: "http://localhost:8000/images/litter.jpg",
      price: 140000,
    },
    {
      title: "Cát Thủy Tinh KitCat",
      handle: "kitcat-crystal",
      description: "Cát thủy tinh khử mùi siêu mạnh, không bết đáy, hạt đẹp.",
      category_ids: [litterId],
      thumbnail: "http://localhost:8000/images/litter.jpg",
      price: 120000,
    },
    {
      title: "Cát Gỗ Hữu Cơ Cat's Best",
      handle: "cats-best-wood",
      description: "Cát gỗ hữu cơ nhập khẩu Đức, thấm hút cực kỳ nhanh.",
      category_ids: [litterId],
      thumbnail: "http://localhost:8000/images/litter.jpg",
      price: 210000,
    },
    {
      title: "Cát Đất Sét bentonite sét sét",
      handle: "bentonite-cat-litter",
      description: "Cát bentonite siêu tiết kiệm, vón cục chắc.",
      category_ids: [litterId],
      thumbnail: "http://localhost:8000/images/litter.jpg",
      price: 50000,
    }
  ];

  const payload = baseProducts.map((p) => {
    const productCategory = p.category_ids[0];
    const isFood = productCategory === catFoodId;
    const isPate = productCategory === pateId;
    
    // Define options and variants dynamically based on category
    let optionTitle = "Trọng lượng";
    let variantsData = [];

    if (isFood) {
      variantsData = [
        { title: "Túi 1kg", priceMultiplier: 1 },
        { title: "Túi 5kg", priceMultiplier: 4.5 },
        { title: "Bao 10kg", priceMultiplier: 8 },
      ];
    } else if (isPate) {
      optionTitle = "Quy cách";
      variantsData = [
        { title: "Lon 85g", priceMultiplier: 1 },
        { title: "Lốc 6 lon", priceMultiplier: 5.5 },
        { title: "Thùng 24 lon", priceMultiplier: 20 },
      ];
    } else {
      optionTitle = "Thể tích";
      variantsData = [
        { title: "Túi 5L", priceMultiplier: 1 },
        { title: "Túi 10L", priceMultiplier: 1.8 },
      ];
    }

    return {
      title: p.title,
      handle: p.handle,
      description: p.description,
      status: "published" as const,
      thumbnail: p.thumbnail,
      images: [{ url: p.thumbnail }],
      category_ids: p.category_ids.filter(Boolean) as string[],
      sales_channels: [{ id: channelId }],
      options: [{ title: optionTitle, values: variantsData.map(v => v.title) }],
      variants: variantsData.map((v, index) => ({
        title: v.title,
        sku: `${p.handle}-var-${index}`,
        manage_inventory: false,
        inventory_quantity: 100,
        prices: [
          {
            currency_code: "vnd",
            amount: p.price * v.priceMultiplier,
          },
          {
            currency_code: "eur",
            amount: Math.round((p.price * v.priceMultiplier) / 27000),
          }
        ],
        options: { [optionTitle]: v.title },
      })),
    };
  });

  await createProductsWorkflow(container).run({
    input: { products: payload },
  });

  logger.info("Successfully seeded 15 realistic products!");
}
