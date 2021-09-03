
import React from "react";
import {
  Box,
  Container,
  Row,
  Column,
  FooterLink,
  Heading,
} 
from "./FooterStyles";
  
const Footer = () => {
  return (
    <Box>
     <h5 style ={{marginTop: "-50px" }}></h5>
      <Container>
        <Row>
          <Column>

            <Heading>Chính sách hỗ trợ </Heading>
            <FooterLink href="#">Điều khoản chính sách</FooterLink>
            {/* <FooterLink href="#">Chính sách bảo mật thông tin</FooterLink> */}
            <FooterLink href="#">Giải quyết khiếu nại, tranh chấp</FooterLink>
          </Column>
          &nbsp;
          <Column>
            <Heading>Dịch vụ hỗ trợ</Heading>
            {/* <FooterLink href="#">Chat</FooterLink>
            <FooterLink href="#">Diễn đàn học tập</FooterLink> */}
            <FooterLink href="#">Góp ý về dịch vụ</FooterLink>
           
          </Column>
          {/* <Column>
            <Heading>Khách hàng/<br/>Đối tác</Heading>
            <FooterLink href="#">Góp ý về dịch vụ</FooterLink>
            <FooterLink href="#">Giải đáp thắc mắc</FooterLink>
           
          </Column> */}
 
          <Column>
          <Heading><h4>Thông tin liên hệ</h4></Heading>
          <h5 style={{color:"red"}}> Hotline: 19002605</h5>
          <h5 style={{color:"red"}}>Email: hotro@lana.vn</h5>
          </Column>
         
          {/* <Column>
          <h6 style={{ color: "green", 
                   textAlign: "center", 
                  }}>
        Cơ quan chủ quản: Công ty Cổ phần Đầu tư và Dịch vụ Giáo dục<br/>
        MST: 02315656972 do Sở kế hoạch và Đầu tư thành phố Hồ Chí Minh cấp ngày 15 tháng 05 năm 2012<br/>
        Giấy phép cung cấp dịch vụ mạng xã hội trực tuyến số 596/GP-BTTTT Bộ Thông tin và Truyền thông cấp ngày 26/4/2017.<br/>
        Đại chỉ:<br/> 
        - Văn phòng Hà Nội: Tầng 9, Tòa nhà 52A2, Đường Nguyễn Huệ, Phường Trung Hòa, Quận Cầu Giấy, Hà Nội.<br/>
        - Văn phòng TP.HCM: 26A đường số 5, Phường 9, Quận Bình Thạnh, TP.Hồ Chí Minh.<br/>
        
      </h6>
           
          </Column> */}


        </Row>
      </Container>
      <br/>
      <h6 style={{ color: "green", 
                   textAlign: "center", 
                  }}>
        Cơ quan chủ quản: Công ty Cổ phần Đầu tư và Dịch vụ Giáo dục<br/>
        MST: 02315656972 do Sở kế hoạch và Đầu tư thành phố Hồ Chí Minh cấp ngày 15 tháng 05 năm 2012<br/>
        Giấy phép cung cấp dịch vụ mạng xã hội trực tuyến số 596/GP-BTTTT Bộ Thông tin và Truyền thông cấp ngày 26/4/2017.<br/>
        Đại chỉ:<br/> 
        - Văn phòng Hà Nội: Tầng 9, Tòa nhà 52A2, Đường Nguyễn Huệ, Phường Trung Hòa, Quận Cầu Giấy, Hà Nội.<br/>
        - Văn phòng TP.HCM: 26A đường số 5, Phường 9, Quận Bình Thạnh, TP.Hồ Chí Minh.<br/>
       
        
        
      </h6>
    </Box>
  );
};
export default Footer;