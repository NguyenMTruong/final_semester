# Mô tả sơ lược về dự án:
 Dự án mô phỏng trang web threads với các tính năng cơ bản của một mạng xã hội.
 
# Cấu hình dự án:
## Frontend:
  **NodeJS:**
    + version: v23.5.0
    
  **React:** 
    + Sử dụng công cụ Vite
    + Các dependecy: react-redux, @reduxjs/toolkit, react-router-dom, axios, redux, sass

  **Cấu trúc folder:**
  
    ```
    /frontend
     |
     /-public : chứa các file public
     |
     /-src : Chứa các file chính của frontend
     | |
     | /-components : Chứa các component được xài nhiều lần trong dự á
     | |
     | /-helpers: Chứa các hàm tiện ích giúp xử lý nhanh gọn (ví dụ: gọi api, các hàm reload lại trang, tương tác với localStorage, session, cookie,...)
     | |
     | /-icon : Chứa các icon được sử dụng trong dự án
     | |
     | /-layouts : Chứa các layouts của ứng dụng
     | |
     | /-pages : Chứa các trang của dự án
     | |
     | /-reducer : tập trung các bộ xử lý của redux
     | |
     | /-slide : khởi tạo các biến, các bộ xử lý của redux
     | |
     | /-store : nơi lưu trữ của redux
     | |
     | /-App.jsx : file chính xử lý trang
     | |
     | /-App.scss : file chứa các cấu hình css toàn cục
     | |
     | /-global.js : chứa các biến không thay đôi
     | |
     | /-main.jsx : file liên kết react với file html
     |
     /-.gitignore : file tùy biến git
     |
     /-REAME.md : file mô tả dự án (chính là thứ các bạn đang đọc)
     |
     /-eslint.config.js : file tùy biến eslint của react
     |
     / index.html : file html hiển thị UI của dự án
     |
     /-jsconfig.json : file cung cấp thông tỉn về cách hiểu và xử lý mã javascript trong dự án
     |
     /-pakage.json : file cấu hình chứa các thông tin dự án và các phụ thuộc (dependency)
     |
     /-vite.config.js : file cấu hình dự án từ thư viện vite
    ```
    
## Backend:
  **jdk:**
    version: 17
  **Spring Boot:**
    + version: 3.4.1
    + Các dependency: lombok, spring-security, starter-data-mongo, jwt,...
  **Cấu trúc folder:**
  
    ```
    /add
    |
    /-.mvn : Các tệp giúp cấu hình và quản lý Maven cụ thể cho dự án
    |
    /-src : chứa các file gốc dự án
    | |
    | /-main : folder gốc
    | | |
    | | /-java/com/nmtruong/add : folder chứa các file
    | | | |
    | | | /-config : Thư mục này chứa các cấu hình của ứng dụng, ví dụ như các cấu hình liên quan đến Spring Boot, cấu hình bảo mật, cấu hình CORS, cấu hình cơ sở dữ liệu, và các bean tùy chỉnh
    | | | |
    | | | /-controller : Thư mục này chứa các lớp điều khiển (Controller) trong ứng dụng. Các lớp này chịu trách nhiệm xử lý các yêu cầu HTTP từ client và trả về phản hồi. Controller sử dụng các service để thực hiện logic nghiệp vụ.
    | | | |
    | | | /-dto : Thư mục này chứa các lớp DTO, dùng để chuyển dữ liệu giữa các lớp hoặc giữa client và server
    | | | |
    | | | /-entity : Thư mục này chứa các lớp Entity, tương ứng với các bảng trong cơ sở dữ liệu
    | | | |
    | | | /-filter : Thư mục này chứa các lớp Filter trong Spring Boot.
    | | | |
    | | | /-mapper : Thư mục này chứa các lớp hoặc interface dùng để map (chuyển đổi) giữa các đối tượng, đặc biệt là từ Entity sang DTO và ngược lại
    | | | |
    | | | /-repository : Thư mục này chứa các lớp Repository, là các interface được sử dụng để tương tác với cơ sở dữ liệu
    | | | |
    | | | /-service : Thư mục này chứa các lớp Service, chịu trách nhiệm thực hiện các logic nghiệp vụ của ứng dụng
    | | | |
    | | | /-AddApplication.java : file khởi tạo và chạy ứng dụng
    | | |
    | | /-resoures : chứa file html hoặc các cài đặt khác
    | | | |
    | | | /-META_INF : cấu hình các định nghĩa chưa có sẵn của spring boot
    | | | |
    | | | /-application.yml :  file cấu hình được sử dụng để định nghĩa các thông số và thiết lập cho ứng dụng
    | |
    | /test : chứa các testcase dự á
    |
    /-upload : chứa các hình ảnh được upload lên server
    |
    /-.gitattribute(.gitignore) : cấu hình git cho dự án
    |
    /-mvnw và mvnw.cmd: các Maven Wrapper scripts (kịch bản bọc của Maven) để thay thế cho lệnh mvn thông thường.
    ```

# Cài đặt dự án:
**Bước 1:** Tải dự án về máy

```git clone https://github.com/NguyenMTruong/final_semester.git```

Sau đó mở dự án

**Bước 2:** Chạy server backend
  + Vào IDE mở terminal(hoặc PowerShell, CommandPromt,...)
  + Di chuyển vào thư mục ``add``
  + Kiểm tra lỗi và tải phụ thuộc
  
    ```mvn clean install```
  + Chạy dự án

    ```mvn spring-boot:run```

**Bước 3:** Chạy UI fronend
  + Mở terminal(hoặc PowerShell, CommandPromt,...)
  + Di chuyển vào thư mục `frontend`
  + Tải các thư viện ``npm install``
  + Khởi chạy dự án ``npm run dev``

**Bước 4:** Vào ``localhost:5173`` để xem dự án

# Hướng phát triển tiếp theo
+ Thêm chuyển đổi giao diện sáng và tối
+ Cải thiện thêm phần loading của các trang khi đang chờ lấy data khi gửi yêu cầu lên backend
+ Cải thiện các hiệu ứng sau khi thực hiện các hành động (ví dụ: render lại các component cha khi component con thay đổi)
+ Thêm các tính năng như chỉnh sửa bài viết, bình luận
+ Tinh gọn các component(ví dụ: Chuyển PortCard và CommentCard vào thành một component, Chuyển trang Profile và User thành một trang duy nhất,...)
+ Thêm tính năng chat realtime cho dự án
+ Chỉnh sửa tính năng thêm bình luận
    
