ĐỀ TÀI: HỆ THỐNG TẠO VÀ GIAO VIỆC

I. Giới thiệu thành viên:

• Dương Anh Đức - B21DCCN239

• Trần Trọng Việt - B21DCCN791

• Trần Trung Kiên - B21DCCN467

II. Giới thiệu đề tài:

Hệ thống tạo và giao việc cho phép quản trị viên trong một nhóm (team) tạo công việc, gán người thực hiện và lưu trữ thông tin công việc vào cơ sở dữ liệu. Người dùng phải có quyền quản trị viên trong team để thực hiện thao tác này. Sau khi công việc được tạo thành công, hệ thống sẽ gửi thông báo đến những người được giao việc.

• Usecase: Tạo và giao công việc mới khi nhận được yêu cầu từ quản trị viên.

III. Công nghệ sử dụng:

• Back-end: NestJS

• Front-end: React(TypeScript), Ant Design, Redux Toolkit

• Database: MongoDB, Mysql (riêng cho từng dịch vụ)

• Message Queue : RabbitMQ (cho quản lý sự kiện và thông điệp)

• Caching : Redis (cho bản sao phía thực hiện lệnh)

• Deployment : Docker, Kubernetes, AWS Lambda (cho Notification Service)

• API Gateway : NestJS Gateway

• Authentication : JWT (JSON Web Token)

IV. Phân tích

1. Quy trình tạo và giao công việc
   
   Quy trình tạo và giao công việc bao gồm các bước chi tiết sau:
   
     Bước 1: Người dùng truy cập vào team mà họ muốn tạo và giao công việc.

     Bước 2: Hệ thống kiểm tra quyền của người dùng trong team.
   
     Bước 3:
     
       + Nếu người dùng có quyền quản trị viên, chuyển sang bước 4.
       
       + Nếu không có quyền quản trị viên, kết thúc quy trình và thông báo lỗi.
   
     Bước 4: Người dùng chọn tùy chọn để bắt đầu tạo công việc mới.
   
     Bước 5: Hệ thống hiển thị giao diện nhập thông tin công việc.
   
     Bước 6: Người dùng nhập thông tin công việc gồm: tiêu đề, mô tả, thời hạn hoàn thành.
   
     Bước 7: Người dùng bắt đầu tạo danh sách người thực hiện công việc.
   
     Bước 8:
     
       + Hệ thống truy xuất và hiển thị danh sách thành viên trong team.
       
       + Người dùng chọn các thành viên từ danh sách để giao việc.
   
     Bước 9: Người dùng nhấn xác nhận để tạo công việc mới.
   
     Bước 10:
   
       + Hệ thống lưu thông tin công việc và danh sách người thực hiện vào cơ sở dữ liệu.
       
       + Nếu lưu thành công, chuyển sang bước 11.
       
       + Nếu lưu thất bại, quay lại bước 4.
   
     Bước 11: Hệ thống gửi thông báo đến từng người được giao công việc (qua email hoặc thông báo trong ứng dụng).
