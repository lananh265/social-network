
import { Container } from "../components/css/cssform";
import "../components/css/Chinhsach.css"
import React, {useState}from 'react';
import s from "../components/css/header.module.css"
import { GlobalStyle } from "../components/css/cssform";

export default function chinhsach(){
    return(
        <div>
             <GlobalStyle />
        <div className={s.Header}>
           <div className={`${s.left} ${s.box}`}>
               <h1>LANA.VN</h1>
           </div>
           <div className={`${s.right} ${s.box}`}>
                <button className={s.button}>Đăng Kí</button>
                &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
               <button className={s.button}>Đăng Nhập</button>
               &nbsp;&nbsp;&nbsp;

           </div>
       </div>
       <div className="noidung">
       <Container>
           <h6 style={{ color: "white ",
                   textAlign: "left",
                  }}>
            <h2 style={{ color: "#EE0000",
                   textAlign: "left",
                  }}>Chào mừng bạn đến với Điều Khoản và Chính Sách của LANA.VN</h2><br/>
            Chính sách Bảo mật này là một phần không thể tách rời với điều kiện sử dụng trang web của LANA.VN<br/>
            </h6>

           <h6 style={{ color: "white ",
                   textAlign: "left",
                  }}>
            <h4 style={{ color: "#FFCC33",
                   textAlign: "left",
                  }}>1. Thông tin LANA.VN thu thập</h4>

LANA.VN thu thập thông tin nhằm cung cấp sản phẩm, dịch vụ tốt hơn cho các Bạn, từ việc tìm hiểu những thông tin cơ bản như thông tin cá nhân: họ và tên, giới tính, ngày sinh; Thông tin liên lạc: số điện thoại, địa chỉ gửi thư, địa chỉ email; Thông tin về thanh toán: thông tin chuyển khoản, mã số thẻ cào; hay các thông tin cá nhân được tự động tạo ra khi Bạn sử dụng website.<br/>
                  </h6>

           <h6 style={{ color: "white ",
                   textAlign: "left",
                  }}>
               <br/>
            <h4 style={{ color: "#FFCC33",
                   textAlign: "left",
                  }}>2. Cách LANA.VN sử dụng thông tin thu thập được</h4>
LANA.VN sử dụng thông tin thu thập từ tất cả các sản phẩm, dịch vụ của mình để cung cấp, duy trì, bảo vệ và cải thiện các sản phẩm, dịch vụ; nhằm phát triển các sản phẩm, dịch vụ mới và bảo vệ LANA.VN và thành viên của mình. LANA.VN cũng sử dụng thông tin này nhằm cung cấp cho Bạn nội dung phù hợp – như cung cấp cho Bạn các thông tin về sản phẩm, dịch vụ liên quan hơn.<br/>
Khi Bạn liên hệ với LANA.VN, chúng tôi sẽ ghi lại nội dung giao tiếp của Bạn nhằm giúp giải quyết mọi vấn đề mà Bạn có thể đang gặp phải. LANA.VN có thể sử dụng địa chỉ email, Số điện thoại của Bạn để thông báo cho Bạn biết về sản phẩm, dịch vụ của LANA.VN, chẳng hạn như cho Bạn biết về các thay đổi hoặc cải tiến sắp tới.<br/>
LANA.VN sẽ đề nghị Bạn đưa ra sự đồng ý trước khi sử dụng thông tin cho một mục đích nào đó khác với các mục đích được nêu trong Chính sách về sự riêng tư này.<br/>
                  </h6>
                  <br/>
                  <h6 style={{ color: "white ",
                   textAlign: "left",
                  }}>
            <h4 style={{ color: "#FFCC33",
                   textAlign: "left",
                  }}>3. Truy cập và cập nhật thông tin cá nhân của Bạn</h4>
Bất cứ khi nào Bạn sử dụng sản phẩm, dịch vụ của LANA.VN, chúng tôi luôn cố gắng cung cấp cho Bạn quyền truy cập thông tin cá nhân của Bạn.<br/>
LANA.VN có thể từ chối các yêu cầu lặp lại nhiều lần một cách bất hợp lý, đòi hỏi các nỗ lực không tương xứng về kỹ thuật, gây rủi ro đến sự riêng tư của người khác hoặc quá phi thực tế<br/>
Trong trường hợp LANA.VN có thể cung cấp quyền truy cập và chỉnh sửa thông tin, LANA.VN sẽ làm như vậy miễn phí, trừ khi việc đó đòi hỏi sự nỗ lực không tương xứng.<br/>
                  </h6>
                  <br/>

       </Container>
       </div>
     </div>

    );
}
