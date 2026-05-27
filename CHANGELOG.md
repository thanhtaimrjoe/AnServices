# Changelog

Tất cả các thay đổi quan trọng đối với dự án này sẽ được ghi lại trong file này.

## [Phase 1] - 2026-05-27

### Added
- **Cấu trúc dự án**: Khởi tạo dự án Next.js 15 với TypeScript, Tailwind CSS, và App Router.
- **Dọn dẹp**: Xóa toàn bộ mã nguồn cũ để bắt đầu quá trình remake, giữ lại thư mục `specs`.
- **Tài liệu**: Thêm file `CHANGELOG.md` để theo dõi các thay đổi được thực hiện bởi AI.
- **Dependencies**: Cài đặt các thư viện cần thiết cho hệ thống: `lucide-react`, `antd`, `@supabase/supabase-js`, `@supabase/ssr`.

### Changed
- Cấu trúc thư mục chuyển sang dạng `src/` layout chuẩn của Next.js hiện đại.
- Hướng tiếp cận tích hợp tập trung: Admin, Worker, và Customer trên cùng một domain.

## [Phase 2] - 2026-05-27

### Added
- **Database Schema**: Phân tích file SQL cũ và tạo file migration PostgreSQL ([20260527000000_init_schema.sql](file:///Users/taiht/Documents/AnServices/supabase/migrations/20260527000000_init_schema.sql)) cho Supabase.
- **TypeScript Types**: Định nghĩa bộ interface đầy đủ ([index.ts](file:///Users/taiht/Documents/AnServices/src/types/index.ts)) dựa trên Schema mới để đảm bảo Type-safety.
- **RLS & Triggers**: Thiết lập Row Level Security cơ bản và Trigger tự động tạo Profile khi người dùng đăng ký qua Supabase Auth.
- **Supabase Integration**: Chuẩn bị hạ tầng để sẵn sàng kết nối với Supabase local.

## [Phase 3] - 2026-05-27

### Added
- **Server Actions**: Triển khai `createServiceRequest`, `getServiceRequests`, và `updateRequestStatus` để xử lý logic nghiệp vụ phía server.
- **Customer Dashboard**: Tích hợp Form đặt dịch vụ mới với Modal và danh sách yêu cầu thời gian thực.
- **Admin Dashboard**: Xây dựng bảng quản lý yêu cầu tập trung, cho phép Admin phê duyệt yêu cầu và theo dõi thống kê.
- **UI/UX**: Sử dụng Ant Design Components (Table, Modal, Form, Card) để tạo giao diện chuyên nghiệp và nhất quán.

## [Phase 4] - 2026-05-27

### Added
- **Worker Workflow**: Triển khai giao diện cho Thợ sửa chữa, bao gồm xem danh sách công việc được gán và gửi báo cáo tiến độ.
- **Admin Assignment**: Thêm tính năng gán thợ sửa chữa vào các yêu cầu mới cho Admin.
- **Worker Server Actions**: Thêm `assignWorkerToRequest`, `submitWorkerReport`, và `getAllWorkers` để quản lý sự tương tác giữa Admin và Worker.
- **Responsive Mobile-view**: Tối ưu hóa giao diện Worker cho trải nghiệm trên thiết bị di động.

## [Phase 5] - 2026-05-27

### Added
- **Authentication Middleware**: Triển khai Middleware bảo vệ các route Dashboard (`/admin`, `/worker`, `/customer`) dựa trên vai trò người dùng thực tế từ Supabase Auth.
- **Material Management**: Thêm bộ Server Actions xử lý yêu cầu vật tư (`requestMaterials`, `approveMaterial`) để thợ và admin tương tác.
- **Invoice System**: Triển khai logic tạo hóa đơn tự động và cập nhật trạng thái hoàn thành yêu cầu.
- **Session Security**: Cấu hình `updateSession` để đồng bộ hóa cookies và session giữa Server và Client an toàn.

## [Phase 6] - 2026-05-27

### Added
- **Admin - Accounts Management**: Triển khai trang quản lý tài khoản người dùng, cho phép Admin xem danh sách, vai trò và khóa/mở khóa tài khoản.
- **Admin - Catalog Management**: Xây dựng giao diện quản lý danh mục Dịch vụ và Vật tư, tách biệt qua hệ thống Tabs.
- **Customer - Request History**: Thêm trang lịch sử yêu cầu chi tiết cho Khách hàng để theo dõi tiến độ các dịch vụ đã đặt.
- **Server Actions Nâng cao**: Bổ sung `profiles.ts` và `catalog.ts` để xử lý các nghiệp vụ quản trị dữ liệu hệ thống.

## [Phase 7] - 2026-05-27

### Added
- **Hệ thống Auth thực tế**: Thay thế Mock login bằng Supabase Auth API trong `auth.ts`.
- **Seed Data**: Thêm Server Action `createTestAccounts` để tự động khởi tạo 3 loại tài khoản mẫu.
- **UI Refinement**: Cập nhật trang Login, rút gọn text nút Đăng nhập và thêm nút hỗ trợ khởi tạo dữ liệu mẫu.
- **Middleware Update**: Tối ưu luồng kiểm tra session thực tế để ngăn chặn lỗi vòng lặp điều hướng.

## [Phase 8] - 2026-05-27

### Changed
- **Simplified Auth System**: Loại bỏ hoàn toàn sự phụ thuộc vào Supabase Auth service để đơn giản hóa hệ thống.
- **Manual Session Management**: Sử dụng Cookie-based session (`as-session`) được quản lý thủ công qua Server Actions.
- **Database Schema**: Cập nhật bảng `profiles` để lưu trữ trực tiếp `username` và `password`, gỡ bỏ liên kết với `auth.users`.
- **Middleware**: Đơn giản hóa logic kiểm tra quyền truy cập dựa trên cookie session thủ công.
- **Test Accounts**: Cập nhật thông tin đăng nhập test sử dụng username (`customer01`, `worker01`, `staff01`) thay vì email.

## [Phase 9] - 2026-05-27

### Changed
- **Header UI**: Cập nhật màu nền Header sang trắng (`bg-white`), thêm đường kẻ phân cách (`border-b`) và tối ưu hóa hiệu ứng hover cho menu người dùng để đồng nhất với các component khác.
- **Dashboard Layout**: Tăng cường bo góc (`rounded-xl`) và đổ bóng nhẹ cho các khu vực nội dung chính, tạo cảm giác hiện đại và nhất quán.

### Added
- **Admin Catalog Nâng cao**: Hoàn thiện tính năng thêm/sửa trực tiếp Dịch vụ và Vật tư thông qua Modal, tích hợp với Database thực tế.
- **Worker Workflow Hoàn thiện**: 
    - Triển khai giao diện quản lý vật tư chi tiết (Thêm mới yêu cầu vật tư theo danh sách, xem lịch sử vật tư đã yêu cầu).
    - Tích hợp tính năng "Hoàn thành công việc" và tự động kích hoạt Server Action tạo Hóa đơn.
- **Sign Out**: Triển khai logic đăng xuất thực tế, xóa session cookie và điều hướng về trang Login.
- **Responsive Optimization**: Cải thiện hiển thị Dashboard trên thiết bị di động, đặc biệt là giao diện Thợ và Khách hàng.
