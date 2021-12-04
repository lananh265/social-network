
import { Container } from "../../components/css/cssform";
import s from "./ChinhSachthanhtoan.module.css"
import React from 'react'; 

export default function ChinhSachthanhtoan(){
    return(
        <div>  
          <div className={s.thongtin}>  
       <Container>
       <div className={s.noidung}>
           <div className={`${s.left}`}>
             <div className={`${s.carttop}`}>Hình thức thanh toán khóa học</div>
             <p style={{color:"black",}}>Hướng dẫn thanh toán bằng ví Momo<br/> tại website LANA</p>
           </div>
           <div className={`${s.right}`}>
             <h3 style={{color:"#104E8B"}}>Để đăng kí khóa học, tôi phải thanh toán khóa học như thế nào?</h3><br/>
             <h6 style={{color:"black",}}>
              <b> Đến với LANA.VN, quý khách thực hiện thanh toán khóa học qua Ví Momo như sau:</b>
              <br/><br/>
               Hệ thống sẽ hiển thị Thông tin QR code. Bạn nhập số tiền muốn nạp hoặc rút.<br/>
               Sau đó, bạn đăng nhập ví Momo trên điện thoại chọn “quét mã” và thực hiện quét mã QR.<br/>
               Kiểm tra thông tin, số tiền cần thanh toán cho khóa học sau đó nhấn “xác nhận”. <br/>
               Giao dịch hoàn tất, kiểm tra lại số dư trong ví MoMo, đồng thời đăng nhập vào Kyna để tham gia học.<br/>
               <br/><br/><br/>
               <b>Các trường hợp giao dịch bị hủy:</b> <br/>

              <li>Trường hợp hai bên đối tác xảy ra mâu thuẫn không thể giải quyết </li>
              <li>Trường hợp bạn báo hủy đơn hàng</li>
             </h6>

           </div>
    
         </div>
       </Container>
       </div>
       
       </div>

    );
}
