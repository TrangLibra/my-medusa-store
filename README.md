# Pet Store - Medusa V2 E-commerce

Chào mừng bạn đến với Source Code của cửa hàng thú cưng (Pet Store). Dự án này là một **Monorepo** bao gồm cả Backend (Medusa V2) và Frontend (Next.js Storefront), được kết nối với CMS Directus để quản lý nội dung SEO.

Dưới đây là hướng dẫn siêu tốc (One-Click Setup) để bạn có thể chạy dự án ngay trên máy tính của mình mà không cần phải cài đặt phức tạp.

## 🛠 Yêu Cầu Cài Đặt Ban Đầu (Prerequisites)
Để hệ thống tự động khởi tạo môi trường, bạn cần đảm bảo máy tính đã cài đặt:
1. **Node.js** (v20 trở lên).
2. **Docker Desktop** (Để hệ thống tự động chạy Database PostgreSQL). Mở sẵn Docker Desktop trước khi chạy lệnh.
3. **pnpm** (Trình quản lý package của Node.js, cài đặt bằng lệnh: `npm install -g pnpm`).

---

## 🚀 Hướng Dẫn Chạy Dự Án (One-Click Setup)

### Bước 1: Khởi tạo toàn bộ hệ thống
Mở Terminal tại thư mục gốc của dự án (`my-medusa-store`) và chạy lệnh sau:
```bash
npm run setup
```
*(Lệnh này sẽ tự động: Khởi động Docker để tạo Database PostgreSQL -> Cài đặt các thư viện Node.js -> Chạy Migrate dữ liệu của Medusa -> Nạp sẵn 15 sản phẩm Thú cưng chuẩn xác vào Database cho bạn).*

### Bước 2: Bật Server Giao diện và Backend
Sau khi lệnh setup hoàn thành, bạn chỉ cần gõ:
```bash
npm run dev
```
Hệ thống sẽ chạy song song cả 2 thứ:
- **Trang Giao diện Storefront (Dành cho khách hàng):** `http://localhost:8000`
- **Trang Quản trị Backend (Dành cho Admin):** `http://localhost:9000/app` (Tài khoản mặc định thường là `admin@test.com` - Mật khẩu: `supersecret`).

---

## 🎨 Hướng Dẫn Cho Frontend Developer

Nhiệm vụ của bạn là tập trung vào thư mục `apps/storefront` (sử dụng Next.js 15 và TailwindCSS) để "trang trí" lại toàn bộ giao diện thành một **Pet Store** thân thiện và đẹp mắt.

### File Môi Trường (Environment Variables)
Bạn cần tạo một file tên là `.env.local` bên trong thư mục `apps/storefront` và dán đoạn code sau vào:
```env
NEXT_PUBLIC_MEDUSA_BACKEND_URL=http://localhost:9000
MEDUSA_BACKEND_URL=http://localhost:9000
NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=pk_59bc719e58c264b16ab4c7e83e0d3b5182b976bf9d7fac8a195ee33c63a5ccc0
NEXT_PUBLIC_DIRECTUS_URL=https://directus-cms-dvjk.onrender.com
```

### Các công việc bạn cần làm:
1. **Chỉnh Theme Color:** Đổi tone màu trắng/đen mặc định của Medusa sang tone màu ấm cúng (Cam/Vàng/Nâu/Xanh lá) phù hợp với cửa hàng Thú cưng.
2. **Cập nhật Trang Chủ (Homepage):** Thay Banner ảnh mặc định bằng ảnh chó/mèo. Thêm Icon minh hoạ cho 3 danh mục (Thức ăn hạt, Pate, Cát vệ sinh).
3. **Việt Hoá:** Dịch tất cả các nút bấm, luồng thanh toán từ Tiếng Anh sang Tiếng Việt (Add to cart -> Thêm vào giỏ hàng...).
4. **Tích hợp Blog (Tùy chọn):** API của Directus CMS đã được khai báo ở `src/lib/data/directus.ts`. Bạn có thể thiết kế thêm mục Blog để gọi bài viết chăm sóc chó mèo từ Directus lên trang web.

Chúc bạn code thật mượt! Mọi Data sản phẩm từ hình ảnh đến phân loại trọng lượng đều đã được setup cực kì chuẩn chỉ. 🚀
