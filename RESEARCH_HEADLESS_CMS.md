# BÁO CÁO NGHIÊN CỨU: TỔNG QUAN HEADLESS CMS & GIẢI PHÁP TÍCH HỢP DIRECTUS CHO MEDUSA E-COMMERCE

**Người thực hiện:** Thực tập sinh  
**Dự án:** My Medusa Store  
**Bối cảnh & Mục tiêu nghiên cứu (Context & Objectives):**
- **Trọng tâm kiến trúc:** Phát triển hệ sinh thái eCommerce hiện đại dựa trên nền tảng Headless Commerce của MedusaJS.
- **Khảo sát Headless CMS:** Phân tích, so sánh các giải pháp Headless CMS phổ biến trên thị trường (Directus, Strapi, Sanity, Contentful) nhằm đánh giá giải pháp tích hợp tối ưu thay thế Strapi.
- **Định hướng giải pháp Directus:** Đánh giá năng lực của Directus trong vai trò Content Management & Data Platform, phục vụ lưu trữ nội dung động, blog và cấu hình dữ liệu chuẩn hóa SEO (Search Engine Optimization Best Practices) cho hệ thống Storefront.

---

## 1. Bản chất cốt lõi: Tại sao eCommerce cần Directus làm CMS?

### 1.1. Phân chia vai trò rõ ràng giữa Medusa và Directus
* **MedusaJS (Headless Commerce Engine):**
  - Đảm nhận toàn bộ nghiệp vụ giao dịch: Giỏ hàng (Cart), Đặt hàng (Checkout), Quản lý SKU & Biến thể, Tồn kho (Inventory), Giá theo khu vực/tiền tệ (Price Lists), Khách hàng (Customers).
  - *Điểm hạn chế của Medusa:* Không có hệ thống quản lý nội dung đa tầng, không hỗ trợ custom fields linh hoạt qua giao diện, không tối ưu cho biên tập nội dung tiếp thị hay cấu hình SEO chuyên sâu.
* **Directus (Headless CMS & Data Platform):**
  - Đảm nhận lưu trữ nội dung động & metadata mở rộng cho eCommerce:
    - **Nội dung bài viết:** Blog, Tin tức, Hướng dẫn chọn size, Câu chuyện thương hiệu.
    - **Dữ liệu trang & Marketing:** Banners trang chủ, Khối khuyến mãi, FAQs, Đánh giá nổi bật.
    - **SEO Data chuyên sâu cho Sản phẩm & Danh mục:** (Theo hướng dẫn *Search Engine Optimization Best Practices* của Directus).

---

## 2. Kiến trúc giải pháp SEO cho eCommerce kết hợp Medusa + Directus

Theo tài liệu của Directus (*Search Engine Optimization Best Practices*), khi làm website bán hàng hiện đại, Directus được sử dụng để quản lý **SEO Metadata** vì Medusa mặc định không hỗ trợ các trường này.

### 2.1. Cấu trúc bảng SEO được thiết kế trên Directus
Directus tạo ra một collection dùng chung (hoặc gắn trực tiếp vào sản phẩm):
* `meta_title` (String, giới hạn ~60 ký tự): Tiêu đề tối ưu hóa cho công cụ tìm kiếm.
* `meta_description` (Text, giới hạn ~160 ký tự): Mô tả tóm tắt thu hút người dùng nhấp chuột.
* `canonical_url` (String): URL chuẩn nhằm tránh trùng lặp nội dung giữa các biến thể sản phẩm.
* `og_image` (File / Image): Ảnh hiển thị khi chia sẻ link lên Facebook, Zalo, Twitter.
* `no_index` / `no_follow` (Boolean): Cho phép bật/tắt index trang theo chiến dịch.
* `structured_data` (JSON): Dữ liệu có cấu trúc Schema.org (Product schema, Breadcrumbs, Reviews) giúp Google hiển thị Rich Snippets (giá, số sao, còn hàng).

### 2.2. Luồng hoạt động trên Storefront (Next.js App Router)

```
[Khách hàng / Bot Google]
          |
          v
[Next.js Storefront (SSR)]
    |
    +---> 1. Gọi Medusa API: Lấy ID sản phẩm, giá bán, biến thể, tình trạng tồn kho
    |
    +---> 2. Gọi Directus API: Lấy `meta_title`, `meta_description`, `og_image`, `faqs`
    |
    v
[Next.js generateMetadata()] 
    - Ghép thành thẻ HTML <head> hoàn chỉnh chuẩn SEO
    - Render thẻ meta OpenGraph + Schema.org JSON-LD
```

---

## 3. So sánh các loại Headless CMS phổ biến

| Tiêu chí | **Directus** *(Được chọn)* | **Strapi** | **Sanity** | **Contentful** |
| :--- | :--- | :--- | :--- | :--- |
| **Mô hình** | Open-source (Self-hosted) | Open-source (Self-hosted) | SaaS Đám mây | SaaS Đám mây |
| **Kiến trúc dữ liệu** | **Database-First** (soi trực tiếp vào SQL DB) | **Code-First** (sinh code schema trong repo) | Proprietary Datastore | Proprietary Datastore |
| **Khả năng kiểm soát** | Nắm giữ 100% database SQL, không lo vendor lock-in | Cần deploy code & migration | Dữ liệu phụ thuộc bên thứ 3 | Dữ liệu phụ thuộc bên thứ 3 |
| **API tự động** | RESTful & GraphQL sinh tự động ngay lập tức | REST có sẵn, GraphQL cần plugin | GROQ & GraphQL | REST & GraphQL |
| **Tối ưu SEO** | Hỗ trợ SEO Extension & Custom Collections cực nhanh | Hỗ trợ qua custom field | Hỗ trợ tốt qua schema code | Hỗ trợ tốt qua UI |
| **Chi phí** | **0 VNĐ** (chạy Docker tự host) | Miễn phí bản Community | Tính phí theo usage khi lớn | Đắt đỏ cho doanh nghiệp |

**Ưu thế vượt trội của Directus trong dự án:**
1. Rất nhẹ, chạy độc lập qua Docker chỉ với 1 lệnh, không làm bẩn codebase của Medusa.
2. Quản trị viên chỉ cần vài click trên web là tạo xong bảng quản lý SEO cho toàn bộ sản phẩm.
3. Cực kỳ an toàn: Nếu cần chuyển đổi hoặc backup, chỉ cần xuất file database SQL thông thường.

---

## 4. Checklist chuẩn bị trước buổi gặp qua lễ với Mentor

- [x] **1. Lý thuyết & Kiến trúc:**
  - Hiểu rõ ranh giới trách nhiệm: Medusa làm Commerce, Directus làm Data Content & SEO.
  - Hiểu cách Directus tổ chức bảng metadata SEO theo link hướng dẫn của Directus.
- [x] **2. Môi trường Directus:**
  - **Directus Online (Railway Free):** https://directus-production-54e2.up.railway.app
  - **API Endpoint Public Test:** https://directus-production-54e2.up.railway.app/items/products
  - **Tài khoản quản trị:** `admin@example.com` / `admin123456`
  - *(Dự phòng Local)* Đã dựng Docker Compose (`medusa-directus-cms`) chạy tại port `8055`.
- [x] **3. Trình bày Demo (PoC):**
  - Directus: Đã tạo collection `products` gồm các trường `medusa_id`, `meta_title` và phân quyền Public Read API thành công.
  - Sẵn sàng tích hợp sang Medusa Subscriber hoặc Storefront Next.js.
