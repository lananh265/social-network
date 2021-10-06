import { useState } from "react";

import GetSignup from "../../API/GetSignup";
import PostLogin from "../../API/postLogin";
import s from '../../components/css/header.module.css';
import { GlobalStyle, StyledFormWrapper,StyledForm, StyledInput,
    StyledButton, StyledFieldset, StyledError, Column, Container, Row } from '../../components/css/cssform';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import { Link } from '@mui/material';
import Chinhsach from "../../components/welcome/Chinhsach";
import Khieunai from "../../components/welcome/Khieunai";

const obLogin = {
    username: "",
    password: ""
}
const obSignup = {
    username: "",
    password: "",
    email:"",
    phone:"",
    name:"",
    gender:"",
}

export default function Login({layToken}) {
const [login, setLogin] = useState(obLogin) //khoi tao ob luu state dang nhap
const [signup, setSignUp] = useState(obSignup) //khoi tao ob luu state dang ki

//state hien thi form input
const [formLogin, setFormLogin] = useState(true)
const [formSignup, setFormSignup] = useState(false)
const [chinhsach, setChinhsach] = useState(false)
const [khieunai, setKhieunai] = useState(false)

//hien thi loi nhap Input
const [error, setError] = useState('');

//trang thai quyet dinh form Dang nhap hay Dang ki duoc hien thi
//Nguoi dung nhan vao nut dang nhap
const handleLogin =  async e => {
    e.preventDefault();
    console.log('submitted!');
    console.log(login);

    for (let key in login) {
      if (login[key] === '') {
        setError(`You must provide the ${key}`)
        return
      }
    }
    setError('');
    const ob = {
        username: login.username,
        password: login.password
    }
   let json = await PostLogin(ob)
   console.log(json)

    layToken(json)
   if(!json.status){
    alert("Đăng nhập thất bại")
  }else{
    window.location.href = "/";
  }
  // console.log("Succeeded!!!")
  };
// luu du lieu nhap vao state Login
const inputLogin = (e) =>{
    const inputName = e.currentTarget.name
    const value = e.currentTarget.value
    setLogin (prev => ({ ...prev, [inputName]: value }));
}

//luu du lieu vao state Signup
const inputSignup =(e) =>{
    const inputName = e.currentTarget.name
    const value = e.currentTarget.value
    setSignUp (prev => ({ ...prev, [inputName]: value }));
}



//kiem tra Gender dua ve kieu so
let ob = {
  gender: signup.gender,
}
const checkGender = ()=>{
  if(ob.gender === "male"){
    return 1
  }
  if(ob.gender === "female"){
    return 2
  }
  if(ob.gender === "other"){
    return 0
  }
}
console.log(checkGender())

//nguoi dung nhan vao nut dang ki
const handleSignup = async(e) => {
e.preventDefault();
for (let key in signup) {
    if (signup[key] === '') {
    setError(`You must provide the ${key}`)
    return
    }
}
setError('');
let ob = {
  username: signup.username,
  password: signup.password,
  email: signup.email,
  phone: signup.phone,
  name: signup.name,
  gender: checkGender()
}
console.log(ob)
const json = await GetSignup(ob)

console.log(json)


if(!json.status){
  alert("Đăng ký thất bại!")
}else {
  alert("Đăng ký thành công!")
}
};

    return (
   <div>
       <GlobalStyle />

      <Router>
        <Switch>
        <Route path="/chinhsach"> <Chinhsach /> </Route>
        <Route path="/khieunai"> <Khieunai /> </Route>
        </Switch>
        </Router>

       <div className={s.Header}>
           <div className={`${s.left} ${s.box}`}>
               <h1>LANA.VN</h1>
           </div>
           <div className={`${s.right} ${s.box}`}>
                <button className={s.button} onClick ={()=>{setFormSignup(true); setFormLogin(false)}}>Đăng Ký</button>
                &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
               <button className={s.button} onClick={()=>{setFormLogin(true); setFormSignup(false)}}>Đăng Nhập</button>
               &nbsp;&nbsp;&nbsp;
           </div>
       </div>
       
    <div>
       { formLogin && 
         <StyledFormWrapper>
            <StyledForm onSubmit={handleLogin}>
            <h2>Đăng Nhập</h2>
            <br/><br/><br/>
            
            <StyledInput
                placeholder="Nhập tài khoản"
                type="text"
                name="username"
                value={login.username}
                onChange={inputLogin}
            />
            <br/><br/> <br/>
            
            <StyledInput
                placeholder="Nhập mật khẩu"
                type="password"
                name="password"
                value={login.password}
                onChange={inputLogin}
            />
            {error && (
                <StyledError>
                <p>{error}</p>
                </StyledError>
            )}
            <br/><br/><br/><br/>
            <StyledButton type="submit">Submit</StyledButton>
            <br/><br/><br/><br/><br/>
            </StyledForm>
        </StyledFormWrapper>
        }

        { formSignup &&
          <StyledFormWrapper>
            <StyledForm onSubmit={handleSignup}>
                <h2>Đăng Ký</h2>
                <br/><br/>
                <StyledInput
                 placeholder="Nhập tài khoản"
                  type="text"
                  name="username"
                  value={signup.username}
                  onChange={inputSignup}
                />

  
                <StyledInput
                  placeholder="Nhập mật khẩu"
                  type="password"
                  name="password"
                  value={signup.password}
                  onChange={inputSignup}
                />
               
                <StyledInput
                  placeholder="Nhập email"
                  type="email"
                  name="email"
                  value={signup.email}
                  onChange={inputSignup}
                />
              
                  <StyledInput
                  placeholder="Nhập số điện thoại"
                    type="number"
                    name="phone"
                    value={signup.phone}
                    onChange={inputSignup}
                  />
                 
                  <StyledInput
                  placeholder="Nhập tên"
                    type="text"
                    name="name"
                    value={signup.name}
                    onChange={inputSignup}
                  />
                <StyledFieldset>
                  <legend>Giới tính</legend>
                  <label>
                    <input
                      type="radio"
                      value="female"
                      name="gender"
                      checked={signup.gender === 'female'}
                      onChange={inputSignup}
                    />
                    Nữ
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="male"
                      name="gender"
                      checked={signup.gender === 'male'}
                      onChange={inputSignup}
                    />
                    Nam
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="other"
                      name="gender"
                      checked={signup.gender === 'other'}
                      onChange={inputSignup}
                    />
                    Khác
                  </label>
                </StyledFieldset>

                        {error && (
                  <StyledError>
                    <p>{error}</p>
                  </StyledError>
                )}
                <br/>
              <StyledButton type="submit">Submit</StyledButton>
              <br/>
            </StyledForm>
          </StyledFormWrapper>
        }

        {chinhsach &&
        <Chinhsach />
        }

        {
          khieunai &&
          <Khieunai />
        }

    </div>
    <div className={s.footer}>

  <div className="body">


                <Container>
                <h1 style={{ color: "#FFFFFF",
                   textAlign: "center",
                  }}>LANA.VN - Đơn vị hỗ trợ học tập trực tuyến hàng đầu tại Việt Nam</h1>
                    <Row>
                        <Column>
                        <h3 style={{ color: "#FFCC33",
              }}>DUYỆT DANH MỤC </h3><br/>
                        <h5 style={{ color: "white ",
               textAlign: "left",
              }}>Duyệt qua danh mục. Tìm người hỗ trợ mà bạn
                            có thể tin tưởng bằng cách duyệt qua các mẫu công việc trước đây của họ và đọc các đánh giá của họ.<br/>
                        </h5>
                        </Column>

                        <Column>
                        <h3 style={{ color: "#FFCC33",
              }}>BÁO GIÁ NHANH </h3><br/>
                        <h5 style={{ color: "white ",
               textAlign: "left",
              }}>Nhận báo giá miễn phí từ các nhà hỗ trợ tài năng của chúng tôi một cách nhanh chóng.<br/>
                         80% dự án được đặt ngay trong vòng 60 giây.<br/>

                        </h5>
                        </Column>

                        <Column>
                        <h3 style={{ color: "#FFCC33",
              }}>THANH TOÁN AN TOÀN</h3><br/>
                        <h5 style={{ color: "white ",
               textAlign: "left",
              }}>Chỉ thanh toán cho công việc khi đã được hoàn thành 100% hài lòng với chất lượng bằng cách sử dụng hệ thống thanh toán của chúng tôi.<br/>
                        <br/>
                        </h5>
                        </Column>

                        <Column>
                        <h3 style={{ color: "#FFCC33",
              }}>THEO DÕI TIẾN ĐỘ</h3><br/>
                        <h5 style={{ color: "white ",
               textAlign: "left",
              }}>Luôn cập nhật và theo dõi, luôn biết những gì các nhà hỗ trợ tự do đang làm.<br/>

                        </h5>
                        </Column>

                    </Row>
                    <Row>
                        <Column>
                        <h3 style={{ color: "#FFCC33",
              }}>ĐĂNG BÀI</h3><br/>
                        <h5 style={{ color: "white ",
               textAlign: "left",
              }}>Đăng công việc miễn phí, dễ dàng. Chỉ cần điền vào một tiêu đề, mô tả và ngân sách.
                             Giá cạnh tranh sẽ cập nhật trong vài phút.<br/>
                        </h5>
                        </Column>

                        <Column>
                        <h3 style={{ color: "#FFCC33",
              }}>GIÚP ĐỠ</h3><br/>
                        <h5 style={{ color: "white ",
               textAlign: "left",
              }}>Với những nhà hỗ trợ tài năng có thể giúp bạn tìm được người hướng dẫn tốt nhất cho công việc, thậm chí có thể quản lí dự án cho bạn.<br/>

                        </h5>
                        </Column>

                        <Column>
                        <h3 style={{ color: "#FFCC33",
              }}>CHẤT LƯỢNG</h3><br/>
                        <h5 style={{ color: "white ",
               textAlign: "left",
              }}>Công việc do <b color="blue">LANA.VN</b> đảm nhận có chất lượng cao - hơn một triệu người để lựa chọn.<br/>
                        <br/>
                        </h5>
                        </Column>

                        <Column>
                        <h3 style={{ color: "#FFCC33",
              }}>CHÍNH SÁCH HỖ TRỢ</h3>
                        <Link onClick={()=>{setFormSignup(false); setFormLogin(false); setKhieunai(false); setChinhsach(true); window.scrollTo(0, 0)}}><h5>Điều khoản chính sách</h5></Link>
                        
                        <Link onClick={()=>{setFormSignup(false); setFormLogin(false); setKhieunai(true); setChinhsach(false);  window.scrollTo(0, 0)}}><h5>Giải quyết khiếu nại, tranh chấp </h5></Link>
                        
                        </Column>
                    </Row>
                </Container>
                <br/>
                </div>
      <br/>
      <h6 style={{ color:"white",
                   textAlign: "center",
                  }}>
        Cơ quan chủ quản: Công ty Cổ phần Đầu tư và Dịch vụ Giáo dục<br/>
        MST: 02315656972 do Sở kế hoạch và Đầu tư thành phố Hồ Chí Minh cấp ngày 15 tháng 05 năm 2012<br/>
        Giấy phép cung cấp dịch vụ mạng xã hội trực tuyến số 596/GP-BTTTT Bộ Thông tin và Truyền thông cấp ngày 26/4/2017.<br/>
        Đại chỉ:<br/>
         Văn phòng Hà Nội: Tầng 9, Tòa nhà 52A2, Đường Nguyễn Huệ, Phường Trung Hòa, Quận Cầu Giấy, Hà Nội.<br/>
         Văn phòng TP.HCM: 26A đường số 5, Phường 9, Quận Bình Thạnh, TP.Hồ Chí Minh.<br/>
        Liên hệ: <br/>
         Hotline: 19002605<br/>
         Email: hotro@lana.vn
      </h6>
             </div>
   </div>
);
}

  
  
  
  
  