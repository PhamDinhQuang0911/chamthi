# QMATH OMR 2025 - Chấm Thi Trắc Nghiệm Trực Tuyến Chuẩn Bộ GD&ĐT

Hệ thống chấm thi trắc nghiệm quang học (OMR) thế hệ mới chuẩn Bộ Giáo dục & Đào tạo 2025, hoạt động 100% trên nền tảng Web bằng Camera điện thoại hoặc ảnh tải lên.

- **Tên miền hoạt động**: [chamthi.qmath.io.vn](https://chamthi.qmath.io.vn)
- **Tác giả / Bản quyền**: QMATH

---

## 🌟 Tính Năng Nổi Bật

1. **Chuẩn hóa Bộ Giáo dục & Đào tạo 2025**:
   - **Phần I**: Trắc nghiệm 4 lựa chọn (A, B, C, D) - 12 câu (0.25đ/câu).
   - **Phần II**: Trắc nghiệm Đúng / Sai (a, b, c, d) - 4 câu. Biểu điểm theo số ý đúng: 1 ý = 0.1đ, 2 ý = 0.25đ, 3 ý = 0.5đ, 4 ý = 1.0đ.
   - **Phần III**: Câu hỏi trả lời ngắn - 6 câu (0.5đ/câu). Hỗ trợ số nguyên, số thập phân và số âm.
   - **Tổng điểm**: 10.0 điểm.

2. **Chấm bài trực tiếp bằng Camera điện thoại**:
   - Nhận diện trực tiếp qua Camera sau (`facingMode: environment`) với khung ngắm A4 (Reticle).
   - Nắn thẳng phối cảnh thông minh (Perspective Deskewing Homography) về chuẩn 1200x1700 px trong <25ms.
   - Chế độ "Tự động quét liên tục" (Auto-Scan) kèm âm thanh "Beep" thông báo khi chấm xong.

3. **100% Client-Side - Tốc độ tức thì & Bảo mật tuyệt đối**:
   - Toàn bộ thuật toán OMR chạy trực tiếp trên trình duyệt bằng HTML5 Canvas 2D và TypedArray.
   - Không tải ảnh lên máy chủ trung gian, hoạt động offline trong phòng thi, không lo lộ đề hoặc nghẽn mạng.

4. **Quản lý & Xuất Báo Cáo Excel**:
   - Quản lý danh sách lớp học, học sinh, số báo danh (SBD).
   - Nạp đáp án cho nhiều mã đề (101, 102, 103, 104...).
   - Xuất file Excel (.xlsx) chuẩn gồm 2 sheet: Bảng điểm tổng hợp và Chi tiết từng câu hỏi.

---

## 🚀 Hướng Dẫn Cài Đặt DNS Tên Miền Tùy Biến (Cloudflare)

Để kết nối với tên miền `chamthi.qmath.io.vn`, thêm bản ghi CNAME trên Cloudflare Dashboard:

| Loại (Type) | Tên (Name) | Đích đến (Target) | Trạng thái Proxy |
| :--- | :--- | :--- | :--- |
| **CNAME** | `chamthi` | `PhamDinhQuang0911.github.io` | **DNS Only** (Đám mây xám) khi tạo SSL |

Sau khi GitHub cấp chứng chỉ SSL thành công (15 - 30 phút), có thể bật lại Proxy (Đám mây cam) để kích hoạt Cloudflare CDN.
