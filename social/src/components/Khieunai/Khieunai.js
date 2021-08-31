
import { Container } from "../footer/FooterStyles"
import "./Khieunai.css"
import React, {useState}from 'react'; 


export default function Khieunai(){
    return(
        <div>
        <div className="Header">
           <div className="trai">
               <h1>LANA.VN</h1>
           </div>
           <div className="phai">
                <button>Đăng Kí</button>
               <button>Đăng Nhập</button>
               
           </div>
       </div>
       <div className="thongtin"> 
       <Container>
           <h4>
            <h1 style={{ color: "#006699", 
                   textAlign: "left", 
                  }}>Giải quyết khiếu nại tranh chấp</h1><br/>
            <h2>1. Đối với Khách hàng.</h2><br/>
            <ul><li> <h3>Trường hợp tranh chấp tài khoản:</h3></li></ul>

Bước 1: Khóa tài khoản học tập tạm thời trong vòng 30 ngày.<br/>

Bước 2: Trong vòng 30 ngày, xác minh chủ tài khoản dựa vào chứng cứ sau: Thông tin cá nhân, số điện thoại đã xác thực khi đăng ký tài khoản, giấy tờ chứng minh việc nạp tiền.<br/> 

Bước 3:  Sau 30 ngày, nếu không xác minh được ai là chủ tài khoản trong trường hợp tranh chấp tài khoản LANA.VN sẽ tiến hành khóa vĩnh viễn.<br/>
<br/>
<ul><li><h3>Trường hợp vi phạm quy định bảo mật tài khoản:</h3> </li></ul>

Bước 1: Khóa tài khoản học tập tạm thời trong vòng 10 ngày.<br/>

Bước 2: Trong vòng 10 ngày, LANA.VN sẽ tiến hành thu thập các bằng chứng về việc vi phạm quy định bảo mật tài khoản và thông tin đến chủ tài khoản.<br/>
<br/>
<h2>2. Đối với Khiếu nại của học viên đối với dịch vụ giảng dạy</h2><br/>

Bước 1: Tiếp nhận thông tin khiếu nại từ phía khách hàng.<br/>

Bước 2: Ngay khi tiếp nhận sẽ tiến hành kiểm tra và phân tích thông tin khiếu nại<br/>

Bước 3: Trong vòng 10 ngày Nhân viên CSKH tiến hành gọi điện trao đổi với khách hàng để làm rõ vấn đề khiếu nại.<br/>
Bước 4: Nhân viên CSKH xác nhận thông tin xử lý khiếu nại ngay khi trao đổi xong với khách hàng qua email.<br/>
<br/>
<h2>3. Đối với Khiếu nại của người hỗ trợ đối với dịch vụ của LANA.VN </h2><br/>
Bước 1: Tiếp nhận thông tin khiếu nại từ phía người hỗ trợ<br/>
Bước 2: Ngay khi tiếp nhận sẽ tiến hành kiểm tra và phân tích thông tin khiếu nại<br/>
Bước 3: Trong vòng 10 ngày Bộ phận hợp tác với người hỗ trợ tiến hành gọi điện trao đổi với người hỗ trợ để làm rõ vấn đề khiếu nại.<br/>
Bước 4: Bộ phận hợp tác với người hỗ trợ ngay sau khi trao đổi xong sẽ xác nhận thông tin xử lý khiếu nại với người hỗ trợ qua email.<br/>
<br/>
<h2>4.Thông tin liên hệ</h2><br/>
Cơ quan chủ quản: Công ty Cổ phần Đầu tư và Dịch vụ Giáo dục<br/>
        Đại chỉ:<br/> 
        - Văn phòng Hà Nội: Tầng 9, Tòa nhà 52A2, Đường Nguyễn Huệ, Phường Trung Hòa, Quận Cầu Giấy, Hà Nội.<br/>
        - Văn phòng TP.HCM: 26A đường số 5, Phường 9, Quận Bình Thạnh, TP.Hồ Chí Minh.<br/>
        Hotline: 19002605<br/>
        Email: hotro@lana.vn<br/>  

       


           </h4>
           <br/>
       </Container>
       </div>
     </div>

    );
}