ĐỀ TÀI: HỆ THỐNG LÀM BÀI TRẮC NGHIỆM

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
