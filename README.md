# Bài Tập Thực Hành 2 - Quản Lý Thư Viện Sách

## So sánh cách làm giao diện giữa Phần A (DOM thuần) và Phần B (React)

1. **Cách tạo và cập nhật giao diện (UI):**
   - **Phần A (DOM thuần - Imperative):** Phải tự viết từng bước tạo thẻ bằng `document.createElement()`, gán nội dung bằng `textContent` và nối vào cây DOM bằng `appendChild()`. Khi dữ liệu thay đổi, phải xóa thủ công toàn bộ thẻ cũ và vẽ lại.
   - **Phần B (React - Declarative):** Sử dụng cú pháp JSX trực quan giống HTML. Chỉ cần khai báo giao diện phụ thuộc vào `state` (`useState`), khi `state` thay đổi thì React tự động tính toán và cập nhật lại đúng phần giao diện cần thiết.

2. **Quản lý sự kiện (Event Handling):**
   - **Phần A:** Phải dùng `addEventListener` và kỹ thuật Event Delegation (`e.target.closest`) trên thẻ cha để bắt sự kiện cho các nút được sinh ra động.
   - **Phần B:** Gắn trực tiếp sự kiện `onClick` vào từng component thông qua `props`, ngắn gọn và không cần truy vấn lại DOM.

3. **Tổ chức mã nguồn (Tái sử dụng):**
   - **Phần A:** Chia theo file chức năng (`api.js`, `storage.js`, `main.js`), nhưng cấu trúc HTML và logic hiển thị vẫn tách rời.
   - **Phần B:** Chia giao diện thành các Component độc lập (`Header`, `Section`, `BookCard`...) kết hợp `props` và `children`, giúp tái sử dụng giao diện cực kỳ dễ dàng.