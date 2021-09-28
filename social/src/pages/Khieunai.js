
import { Container } from "../components/css/cssform";
import "../components/css/Khieunai.css"
import React, {useState}from 'react'; 
import s from '../components/css/header.module.css'
import { GlobalStyle } from "../components/css/cssform";

export default function Khieunai(){
    return(
        <div>
              <GlobalStyle />
        {/* <div className={s.Header}>
           <div className={`${s.left} ${s.box}`}>
               <h1>LANA.VN</h1>
           </div>
           <div className={`${s.right} ${s.box}`}>
                <button className={s.button} >Đăng Kí</button>
                &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
               <button className={s.button} >Đăng Nhập</button>
               &nbsp;&nbsp;&nbsp;
           </div>
       </div> */}
       <div className="thongtin"> 
       <Container>
           <h6 style={{ color: "white ", 
                   textAlign: "left", 
                  }}>
            <h2 style={{ color:"#EE0000", 
                   textAlign: "left", 
                  }}>Giải quyết khiếu nại tranh chấp</h2><br/>
            <h4 style={{ color: "#FFCC33", 
                   textAlign: "left", 
                  }}>1. Đối với Khách hàng.</h4>
            <ul><li> <h5>Trường hợp tranh chấp tài khoản:</h5></li></ul>

Bước 1: Khóa tài khoản học tập tạm thời trong vòng 30 ngày.<br/>

Bước 2: Trong vòng 30 ngày, xác minh chủ tài khoản dựa vào chứng cứ sau: Thông tin cá nhân, số điện thoại đã xác thực khi đăng ký tài khoản, giấy tờ chứng minh việc nạp tiền.<br/> 

Bước 3:  Sau 30 ngày, nếu không xác minh được ai là chủ tài khoản trong trường hợp tranh chấp tài khoản LANA.VN sẽ tiến hành khóa vĩnh viễn.<br/>

<ul><li><h5>Trường hợp vi phạm quy định bảo mật tài khoản:</h5> </li></ul>

Bước 1: Khóa tài khoản học tập tạm thời trong vòng 10 ngày.<br/>

Bước 2: Trong vòng 10 ngày, LANA.VN sẽ tiến hành thu thập các bằng chứng về việc vi phạm quy định bảo mật tài khoản và thông tin đến chủ tài khoản.<br/>
<br/>
<h4 style={{ color: "#FFCC33", 
                   textAlign: "left", 
                  }}>2. Đối với Khiếu nại của học viên đối với dịch vụ giảng dạy</h4>

Bước 1: Tiếp nhận thông tin khiếu nại từ phía khách hàng.<br/>

Bước 2: Ngay khi tiếp nhận sẽ tiến hành kiểm tra và phân tích thông tin khiếu nại<br/>

Bước 3: Trong vòng 10 ngày Nhân viên CSKH tiến hành gọi điện trao đổi với khách hàng để làm rõ vấn đề khiếu nại.<br/>
Bước 4: Nhân viên CSKH xác nhận thông tin xử lý khiếu nại ngay khi trao đổi xong với khách hàng qua email.<br/>
<br/>
<h4 style={{ color: "#FFCC33", 
                   textAlign: "left", 
                  }}>3. Đối với Khiếu nại của người hỗ trợ đối với dịch vụ của LANA.VN </h4>
Bước 1: Tiếp nhận thông tin khiếu nại từ phía người hỗ trợ<br/>
Bước 2: Ngay khi tiếp nhận sẽ tiến hành kiểm tra và phân tích thông tin khiếu nại<br/>
Bước 3: Trong vòng 10 ngày Bộ phận hợp tác với người hỗ trợ tiến hành gọi điện trao đổi với người hỗ trợ để làm rõ vấn đề khiếu nại.<br/>
Bước 4: Bộ phận hợp tác với người hỗ trợ ngay sau khi trao đổi xong sẽ xác nhận thông tin xử lý khiếu nại với người hỗ trợ qua email.<br/>
<br/>     
           </h6>
           <br/>
       </Container>
       </div>
     </div>

    );
}