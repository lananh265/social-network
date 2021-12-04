import Sidebar from '../../components/sidebar/sidebar';
import s from './Money.module.css';
import { CardGiftcardOutlined,LaptopWindowsRounded,LocalAtm} from "@material-ui/icons"
import { Link } from '@mui/material';



export default function Money(){
  const goChinhSachthanhtoan = ()=>{
    window.location.href = "/Chinhsachthanhtoan";
  }

  const goNaptien = ()=>{
    window.location.href = "/Naptien";
  }
  const goRuttien = ()=>{
    window.location.href = "/Ruttien";
  }

  return(
  
      <div className={s.homeContainer}>
            <Sidebar />
            
            <div className={s.body}>
            <div className={`${s.cardwrapper}`}>
            <div className = {`${s.headertextcenter}`}>
                <h2>THÔNG TIN HỌC PHÍ</h2>
            </div>

            <div className={`${s.noidung}`}>
            <div className={`${s.nap}`}>
              <LocalAtm style={{color:"#FF9900",fontSize:"92px"}}/>&ensp;
              <p><Link onClick={()=>{goNaptien()}}><b style={{ fontSize:"38px"}}>Nạp tiền</b></Link></p><br/>
              </div>
              <div className={`${s.rut}`}>
              <CardGiftcardOutlined style={{color:"#FF9900",fontSize:"92px"}}/>&ensp;
              <p><Link onClick={()=>{goRuttien()}}><b style={{ fontSize:"38px"}}>Rút tiền</b></Link></p><br/>
              </div>
            </div>
            <div className= {s.rightbar} >
                {/* <Rightbar/> */}
            </div>

          </div>
          <h4 style={{color:"red",}}>Lưu ý:</h4>
          <h6 style={{color:"black",}}>
          &#42; Để thực hiện đăng tin mời bạn vui lòng nạp tiền vào hệ thống!<br/>
          &#42; Thời gian học: 24h/24h<br/>
          &#42; Điều khoản thanh toán, <Link onClick={()=>{goChinhSachthanhtoan()}}>xem tại đây.</Link>
          </h6>
          </div>
    </div>
  )
}