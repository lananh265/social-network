import { Box, Column, Container, Row, Heading } from "../footer/FooterStyles";
import React, {useState}from 'react';  
// import Footer from "../footer/Footer";
import "./Gioithieu.css"



export default function Gioithieu(){
    return(
        <div>
            <div className="Header">
                <div className="trai">
                    <h1>LANA.VN</h1>
                </div>
                <div className="phai">
                    <h3>NỀN TẢNG HỌC TẬP TRỰC TUYẾN HÀNG ĐẦU VIỆT NAM</h3>
                </div>
            </div>


            <div className="body">
                
                    
                    <Container>
                    <h1 style={{ color: "black ", 
                   textAlign: "center", 
                  }}>GIỚI THIỆU </h1>
                        <Row>
                            <Column>
                            <h3>DUYỆT DANH MỤC </h3><br/>
                            <h5>Duyệt qua danh mục. Tìm người hỗ trợ mà bạn
                                có thể tin tưởng bằng cách duyệt qua các mẫu công việc trước đây của họ và đọc các đánh giá của họ.<br/>
                            </h5>
                            </Column>

                            <Column>
                            <h3>BÁO GIÁ NHANH </h3><br/>
                            <h5>Nhận báo giá miễn phí từ các nhà hỗ trợ tài năng của chúng tôi một cách nhanh chóng.<br/>
                            80% dự án được đặt ngay trong vòng 60 giây.<br/>
                            <br/>
                            </h5>
                            </Column>

                            <Column>
                            <h3>CHẤT LƯỢNG</h3><br/>
                            <h5>Công việc do <b color="blue">LANA.VN</b> đảm nhận có chất lượng cao - hơn một triệu người để lựa chọn.<br/>
                            <br/>
                            </h5>
                            </Column>

                            <Column>
                            <h3>THEO DÕI TIẾN ĐỘ</h3><br/>
                            <h5>Luôn cập nhật và theo dõi, luôn biết những gì các nhà hỗ trợ tự do đang làm.<br/>
            
                            </h5>
                            </Column>

                        </Row>


                        <Row>
                            <Column>
                            <h3>ĐĂNG BÀI</h3><br/>
                            <h5>Đăng công việc miễn phí, dễ dàng. Chỉ cần điền vào một tiêu đề, mô tả và ngân sách.
                                 Giá cạnh tranh sẽ cập nhật trong vài phút.<br/>
                            </h5>
                            </Column>

                            <Column>
                            <h3>BÁO GIÁ NHANH </h3><br/>
                            <h5>Nhận báo giá miễn phí từ các nhà hỗ trợ tài năng của chúng tôi một cách nhanh chóng.<br/>
                            80% dự án được đặt ngay trong vòng 60 giây.<br/>
                            <br/>
                            </h5>
                            </Column>

                            <Column>
                            <h3>THANH TOÁN AN TOÀN</h3><br/>
                            <h5>Chỉ thanh toán cho công việc khi đã được hoàn thành 100% hài lòng với chất lượng bằng cách sử dụng hệ thống thanh toán của chúng tôi.<br/>
                            <br/>
                            </h5>
                            </Column>

                            <Column>
                            <h3>GIÚP ĐỠ</h3><br/>
                            <h5>Với những nhà hỗ trợ tài năng có thể giúp bạn tìm được người hướng dẫn tốt nhất cho công việc, thậm chí có thể quản lí dự án cho bạn.<br/>
            
                            </h5>
                            </Column>

                        </Row>
                    </Container>
                    <br/>
                    <h5 style={{ color: "green", 
                   textAlign: "center", 
                  }}>
        <h1>LANA.VN</h1>
        <h2>Đơn vị hỗ trợ học tập trực tuyến hàng đầu tại Việt Nam</h2>
        <br/>
        <br/>
        <br/>
       
        <h4>
        Cơ quan chủ quản: Công ty Cổ phần Đầu tư và Dịch vụ Giáo dục<br/>
        MST: 02315656972 do Sở kế hoạch và Đầu tư thành phố Hồ Chí Minh cấp ngày 15 tháng 05 năm 2012<br/>
        Giấy phép cung cấp dịch vụ mạng xã hội trực tuyến số 596/GP-BTTTT Bộ Thông tin và Truyền thông cấp ngày 26/4/2017.<br/>
        Đại chỉ:<br/> </h4>
        <ul><li><h4>Văn phòng Hà Nội: Tầng 9, Tòa nhà 52A2, Đường Nguyễn Huệ, Phường Trung Hòa, Quận Cầu Giấy, Hà Nội.</h4></li></ul>
        <ul><li><h4>Văn phòng TP.HCM: 26A đường số 5, Phường 9, Quận Bình Thạnh, TP.Hồ Chí Minh.</h4></li></ul><br/>
        
        <h4 style={{color:"red"}}> Hotline: 19002605</h4> 
        <h4 style={{color:"red"}}>Email: hotro@lana.vn</h4>
        
        
      </h5>
              

            </div>
            {/* <Footer /> */}
           
        </div>

    );
}