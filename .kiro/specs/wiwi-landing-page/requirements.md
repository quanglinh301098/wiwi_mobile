# Tài liệu Yêu cầu - WiWi Landing Page

## Giới thiệu

WiWi là một công ty công nghệ trẻ trung, năng động, chuyên phát triển các giải pháp phần mềm tiên tiến. Tài liệu này mô tả các yêu cầu cho website landing page chuyên nghiệp, hiện đại, phong cách futuristic/high-tech với dark theme, animation cao cấp, hỗ trợ đa ngôn ngữ (Tiếng Việt / Tiếng Anh), và responsive trên mọi thiết bị.

## Thuật ngữ (Glossary)

- **Landing_Page**: Trang web đơn trang (single-page) giới thiệu công ty WiWi, bao gồm nhiều section cuộn dọc
- **Dark_Theme**: Giao diện nền tối sử dụng màu đen hoặc xanh navy đậm làm nền chính
- **Neon_Gradient**: Hiệu ứng chuyển màu sử dụng các tông màu tím, xanh dương, cyan tạo cảm giác phát sáng
- **Glassmorphism**: Phong cách thiết kế sử dụng hiệu ứng kính mờ (frosted glass) với backdrop-blur và viền bán trong suốt
- **Scroll_Animation**: Hiệu ứng chuyển động được kích hoạt khi người dùng cuộn trang (fade, slide, parallax)
- **Micro_Interaction**: Hiệu ứng tương tác nhỏ phản hồi hành động của người dùng (hover, click, focus)
- **i18n_System**: Hệ thống quốc tế hóa cho phép chuyển đổi ngôn ngữ giữa Tiếng Việt và Tiếng Anh
- **Hero_Section**: Section đầu tiên của trang, chứa tiêu đề lớn, mô tả ngắn và nút CTA
- **CTA_Button**: Nút kêu gọi hành động (Call-to-Action) hướng người dùng thực hiện hành động mong muốn
- **Service_Card**: Thẻ hiển thị thông tin một dịch vụ với icon, tiêu đề, mô tả và hiệu ứng hover
- **Project_Card**: Thẻ hiển thị thông tin một dự án với hình ảnh, tiêu đề và mô tả
- **Testimonial_Carousel**: Thành phần trình chiếu đánh giá khách hàng dạng slider tự động hoặc thủ công
- **Contact_Form**: Biểu mẫu liên hệ cho phép người dùng gửi thông tin (tên, email, tin nhắn)
- **Animated_Counter**: Thành phần hiển thị số liệu với hiệu ứng đếm tăng dần khi xuất hiện trong viewport
- **Interactive_Cursor**: Hiệu ứng con trỏ chuột tùy chỉnh phản hồi theo vị trí và tương tác của người dùng
- **Particle_Background**: Hiệu ứng nền động với các hạt (particles) chuyển động tạo cảm giác công nghệ cao
- **Navigation_Header**: Thanh điều hướng cố định ở đầu trang chứa logo, menu và nút chuyển ngôn ngữ
- **Viewport**: Vùng hiển thị của trình duyệt mà người dùng đang nhìn thấy

## Yêu cầu

### Yêu cầu 1: Cấu trúc tổng thể và Dark Theme

**User Story:** Là một khách truy cập, tôi muốn thấy một trang landing page với giao diện tối, hiện đại, để cảm nhận được sự chuyên nghiệp và công nghệ cao của WiWi.

#### Tiêu chí chấp nhận

1. THE Landing_Page SHALL sử dụng Dark_Theme với nền chính là màu đen (#0a0a0f) hoặc xanh navy đậm (#0d1117)
2. THE Landing_Page SHALL áp dụng Neon_Gradient với các tông màu tím (#8b5cf6), xanh dương (#3b82f6), và cyan (#06b6d4) cho các thành phần nhấn mạnh
3. THE Landing_Page SHALL sử dụng hiệu ứng Glassmorphism cho các thành phần card và container với backdrop-blur tối thiểu 10px và viền bán trong suốt
4. THE Landing_Page SHALL sử dụng font chữ sans-serif hiện đại (Inter hoặc tương đương) với trọng số rõ ràng cho tiêu đề và nội dung
5. THE Landing_Page SHALL hiển thị hiệu ứng glow (ánh sáng phát ra) trên các thành phần tương tác và tiêu đề quan trọng

### Yêu cầu 2: Navigation Header

**User Story:** Là một khách truy cập, tôi muốn có thanh điều hướng cố định để dễ dàng di chuyển giữa các section trên trang.

#### Tiêu chí chấp nhận

1. THE Navigation_Header SHALL hiển thị cố định ở đầu trang khi người dùng cuộn
2. THE Navigation_Header SHALL chứa logo WiWi, các liên kết điều hướng đến từng section, và nút chuyển ngôn ngữ EN/VI
3. WHEN người dùng nhấn vào một liên kết điều hướng, THE Landing_Page SHALL cuộn mượt (smooth scroll) đến section tương ứng
4. THE Navigation_Header SHALL áp dụng hiệu ứng Glassmorphism với nền bán trong suốt khi trang được cuộn xuống
5. WHEN trang hiển thị trên thiết bị mobile (chiều rộng viewport dưới 768px), THE Navigation_Header SHALL chuyển sang dạng hamburger menu

### Yêu cầu 3: Hệ thống đa ngôn ngữ (i18n)

**User Story:** Là một khách truy cập quốc tế, tôi muốn chuyển đổi ngôn ngữ giữa Tiếng Việt và Tiếng Anh để đọc nội dung bằng ngôn ngữ tôi hiểu.

#### Tiêu chí chấp nhận

1. THE i18n_System SHALL hỗ trợ hai ngôn ngữ: Tiếng Việt (vi) và Tiếng Anh (en)
2. THE i18n_System SHALL lưu trữ tất cả nội dung văn bản trong các file ngôn ngữ riêng biệt (vi.json và en.json)
3. WHEN người dùng nhấn nút chuyển ngôn ngữ trên Navigation_Header, THE i18n_System SHALL thay đổi toàn bộ nội dung văn bản trên trang sang ngôn ngữ được chọn mà không tải lại trang
4. THE i18n_System SHALL ghi nhớ lựa chọn ngôn ngữ của người dùng trong localStorage để giữ nguyên khi truy cập lại
5. THE i18n_System SHALL mặc định hiển thị Tiếng Việt khi người dùng truy cập lần đầu

### Yêu cầu 4: Hero Section

**User Story:** Là một khách truy cập, tôi muốn thấy một Hero Section ấn tượng ngay khi vào trang để hiểu ngay WiWi là ai và làm gì.

#### Tiêu chí chấp nhận

1. THE Hero_Section SHALL hiển thị tiêu đề lớn giới thiệu WiWi với hiệu ứng Neon_Gradient trên chữ
2. THE Hero_Section SHALL hiển thị một dòng mô tả ngắn (subheadline) bên dưới tiêu đề
3. THE Hero_Section SHALL chứa tối thiểu hai CTA_Button với hiệu ứng glow và gradient khi hover
4. THE Hero_Section SHALL hiển thị Particle_Background hoặc animated gradient làm nền động
5. WHEN Hero_Section xuất hiện trong Viewport, THE Hero_Section SHALL kích hoạt animation xuất hiện (fade-in và slide-up) cho tiêu đề, mô tả và các nút CTA theo thứ tự tuần tự

### Yêu cầu 5: Section Giới thiệu (About)

**User Story:** Là một khách truy cập, tôi muốn đọc phần giới thiệu ngắn gọn về WiWi để hiểu tầm nhìn và sứ mệnh của công ty.

#### Tiêu chí chấp nhận

1. THE Landing_Page SHALL hiển thị section Giới thiệu với tiêu đề, đoạn mô tả về WiWi, và hình ảnh hoặc đồ họa minh họa
2. WHEN section Giới thiệu xuất hiện trong Viewport, THE Landing_Page SHALL kích hoạt Scroll_Animation (fade-in từ trái hoặc phải) cho nội dung
3. THE Landing_Page SHALL áp dụng hiệu ứng Glassmorphism cho container của section Giới thiệu

### Yêu cầu 6: Section Dịch vụ (Services)

**User Story:** Là một khách hàng tiềm năng, tôi muốn xem danh sách dịch vụ của WiWi để biết công ty có thể giúp tôi giải quyết vấn đề gì.

#### Tiêu chí chấp nhận

1. THE Landing_Page SHALL hiển thị bốn Service_Card cho các dịch vụ: Custom Software, Web & Mobile App, AI Solutions, và Cloud & DevOps
2. THE Service_Card SHALL hiển thị icon, tiêu đề dịch vụ, và mô tả ngắn cho mỗi dịch vụ
3. WHEN người dùng di chuột qua một Service_Card, THE Service_Card SHALL hiển thị hiệu ứng glow viền với Neon_Gradient, scale nhẹ (1.02-1.05), và gradient shift trên nền
4. WHEN section Dịch vụ xuất hiện trong Viewport, THE Landing_Page SHALL kích hoạt Scroll_Animation cho các Service_Card xuất hiện tuần tự (stagger animation)
5. THE Service_Card SHALL áp dụng hiệu ứng Glassmorphism cho nền card

### Yêu cầu 7: Section Dự án (Projects / Showcase)

**User Story:** Là một khách hàng tiềm năng, tôi muốn xem các dự án WiWi đã thực hiện để đánh giá năng lực của công ty.

#### Tiêu chí chấp nhận

1. THE Landing_Page SHALL hiển thị tối thiểu bốn Project_Card dạng lưới (grid layout)
2. THE Project_Card SHALL hiển thị hình ảnh đại diện, tên dự án, mô tả ngắn, và danh sách công nghệ sử dụng
3. WHEN người dùng di chuột qua một Project_Card, THE Project_Card SHALL hiển thị hiệu ứng overlay với thông tin chi tiết và hiệu ứng scale nhẹ
4. WHEN section Dự án xuất hiện trong Viewport, THE Landing_Page SHALL kích hoạt Scroll_Animation cho các Project_Card

### Yêu cầu 8: Section Lý do chọn WiWi (Why Choose Us)

**User Story:** Là một khách hàng tiềm năng, tôi muốn biết lý do nên chọn WiWi để đưa ra quyết định hợp tác.

#### Tiêu chí chấp nhận

1. THE Landing_Page SHALL hiển thị tối thiểu bốn điểm mạnh của WiWi với icon và mô tả
2. THE Landing_Page SHALL hiển thị Animated_Counter cho các số liệu thống kê (số dự án, số khách hàng, năm kinh nghiệm, tỷ lệ hài lòng)
3. WHEN section Lý do chọn WiWi xuất hiện trong Viewport, THE Animated_Counter SHALL bắt đầu đếm từ 0 đến giá trị đích với thời gian animation từ 1.5 đến 2.5 giây
4. WHEN section Lý do chọn WiWi xuất hiện trong Viewport, THE Landing_Page SHALL kích hoạt Scroll_Animation cho các thành phần

### Yêu cầu 9: Section Đánh giá khách hàng (Testimonials)

**User Story:** Là một khách hàng tiềm năng, tôi muốn đọc đánh giá từ khách hàng trước để tin tưởng hơn vào chất lượng dịch vụ của WiWi.

#### Tiêu chí chấp nhận

1. THE Testimonial_Carousel SHALL hiển thị tối thiểu ba đánh giá khách hàng với tên, chức vụ, công ty, avatar, và nội dung đánh giá
2. THE Testimonial_Carousel SHALL hỗ trợ chuyển đổi giữa các đánh giá bằng cách vuốt (swipe) trên mobile hoặc nhấn nút điều hướng trên desktop
3. THE Testimonial_Carousel SHALL tự động chuyển đánh giá sau mỗi 5 giây
4. WHEN người dùng tương tác với Testimonial_Carousel (hover hoặc chạm), THE Testimonial_Carousel SHALL tạm dừng tự động chuyển đánh giá
5. THE Testimonial_Carousel SHALL áp dụng hiệu ứng Glassmorphism cho card đánh giá

### Yêu cầu 10: Section Liên hệ (Contact)

**User Story:** Là một khách hàng tiềm năng, tôi muốn gửi thông tin liên hệ để WiWi có thể liên lạc lại với tôi.

#### Tiêu chí chấp nhận

1. THE Contact_Form SHALL chứa các trường: Họ tên, Email, Số điện thoại (tùy chọn), và Tin nhắn
2. WHEN người dùng focus vào một trường input, THE Contact_Form SHALL hiển thị hiệu ứng glow viền với Neon_Gradient trên trường đó
3. IF người dùng gửi Contact_Form với trường Họ tên hoặc Email để trống, THEN THE Contact_Form SHALL hiển thị thông báo lỗi cụ thể cho từng trường bị thiếu
4. IF người dùng nhập email không đúng định dạng (thiếu @ hoặc domain), THEN THE Contact_Form SHALL hiển thị thông báo lỗi định dạng email
5. WHEN người dùng gửi Contact_Form hợp lệ, THE Contact_Form SHALL hiển thị thông báo gửi thành công với hiệu ứng animation

### Yêu cầu 11: Footer

**User Story:** Là một khách truy cập, tôi muốn thấy footer với thông tin cơ bản của WiWi để tìm thêm cách liên lạc hoặc theo dõi mạng xã hội.

#### Tiêu chí chấp nhận

1. THE Landing_Page SHALL hiển thị Footer với logo WiWi, thông tin liên hệ (email, địa chỉ), liên kết mạng xã hội, và bản quyền
2. THE Landing_Page SHALL hiển thị Footer với thiết kế tối giản phù hợp Dark_Theme
3. WHEN người dùng di chuột qua liên kết mạng xã hội trong Footer, THE Landing_Page SHALL hiển thị hiệu ứng glow và scale nhẹ trên icon

### Yêu cầu 12: Animation và Hiệu ứng nâng cao

**User Story:** Là một khách truy cập, tôi muốn trải nghiệm các hiệu ứng animation mượt mà và ấn tượng để cảm nhận sự chuyên nghiệp và đẳng cấp của WiWi.

#### Tiêu chí chấp nhận

1. THE Landing_Page SHALL hiển thị Interactive_Cursor tùy chỉnh phản hồi theo vị trí chuột với hiệu ứng glow trên thiết bị desktop
2. THE Landing_Page SHALL hiển thị animated gradient background cho các section chính
3. THE Landing_Page SHALL áp dụng smooth scrolling cho toàn bộ trang
4. THE Landing_Page SHALL sử dụng Framer Motion hoặc GSAP cho tất cả animation
5. WHILE trang đang tải, THE Landing_Page SHALL hiển thị hiệu ứng loading với logo WiWi và animation phù hợp Dark_Theme

### Yêu cầu 13: Responsive Design

**User Story:** Là một khách truy cập sử dụng thiết bị di động, tôi muốn trang web hiển thị đẹp và đầy đủ chức năng trên mọi kích thước màn hình.

#### Tiêu chí chấp nhận

1. THE Landing_Page SHALL hiển thị đúng layout trên ba breakpoint: mobile (dưới 768px), tablet (768px-1024px), và desktop (trên 1024px)
2. WHILE viewport có chiều rộng dưới 768px, THE Landing_Page SHALL chuyển layout grid của Service_Card và Project_Card sang dạng một cột
3. WHILE viewport có chiều rộng từ 768px đến 1024px, THE Landing_Page SHALL chuyển layout grid sang dạng hai cột
4. THE Landing_Page SHALL đảm bảo tất cả văn bản có kích thước tối thiểu 16px trên thiết bị mobile để dễ đọc
5. THE Landing_Page SHALL đảm bảo tất cả CTA_Button và thành phần tương tác có vùng chạm tối thiểu 44x44px trên thiết bị mobile

### Yêu cầu 14: Hiệu năng và Kỹ thuật

**User Story:** Là một nhà phát triển, tôi muốn codebase sạch, dễ mở rộng, và tối ưu hiệu năng để duy trì và phát triển dự án lâu dài.

#### Tiêu chí chấp nhận

1. THE Landing_Page SHALL được xây dựng bằng Next.js với React và TailwindCSS
2. THE Landing_Page SHALL tải trang lần đầu (First Contentful Paint) trong vòng 2 giây trên kết nối 4G
3. THE Landing_Page SHALL sử dụng lazy loading cho hình ảnh và các thành phần nặng nằm ngoài Viewport ban đầu
4. THE Landing_Page SHALL tổ chức code theo cấu trúc component rõ ràng, mỗi section là một component riêng biệt
5. THE Landing_Page SHALL sử dụng Next.js Image component để tối ưu hình ảnh tự động
