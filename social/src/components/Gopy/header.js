import s from './header.module.css'
import App2 from './App'

export default function Header(){
    return(
     <div className={s.container}>
        <div className={s.header}>
            <div className={`${s.left} ${s.box}`}>
                <h1>LANA.VN</h1>
            </div>

            <div className={`${s.right} ${s.box}`}>

            <button className={s.button}>Đăng Xuất</button>
            </div>
        </div>
        &nbsp;&nbsp;&nbsp;
        <div className={s.body}>
           <App2 />
      </div>
      &nbsp;&nbsp;&nbsp;
        <div className={s.footer}>
            <div className={s.top}>
                <div className={s.trai}>  
                <h3>Chính sách hỗ trợ </h3><br/>
                <h6 href="#">Điều khoản chính sách</h6><br/>
                <h6 href="#">Giải quyết khiếu nại, tranh chấp</h6><br/>
                </div>

                <div className={s.phai}>
                <h3>Dịch vụ hỗ trợ</h3><br/>
                <h6 href="#">Góp ý về dịch vụ</h6><br/>
           
                </div>

            </div>
            <br/>
            

            <div className={s.down}> <h6 style={{ color: "green", 
                   textAlign: "center", 
                  }}>
        Cơ quan chủ quản: Công ty Cổ phần Đầu tư và Dịch vụ Giáo dục<br/>
        MST: 02315656972 do Sở kế hoạch và Đầu tư thành phố Hồ Chí Minh cấp ngày 15 tháng 05 năm 2012<br/>
        Giấy phép cung cấp dịch vụ mạng xã hội trực tuyến số 596/GP-BTTTT Bộ Thông tin và Truyền thông cấp ngày 26/4/2017.<br/>
        Địa chỉ:<br/> 
        - Văn phòng Hà Nội: Tầng 9, Tòa nhà 52A2, Đường Nguyễn Huệ, Phường Trung Hòa, Quận Cầu Giấy, Hà Nội.<br/>
        - Văn phòng TP.HCM: 26A đường số 5, Phường 9, Quận Bình Thạnh, TP.Hồ Chí Minh.<br/>
        Hotline: 19002605<br/>
        Email: hotro@lana.vn</h6>
        </div>
    </div>
</div>  
    )
}