import React, {useState}from 'react';
import { Box, Column, Container, Row, Heading } from "../footer/FooterStyles";
import s from './header.module.css'
import { GlobalStyle, StyledFormWrapper,StyledForm, StyledInput,
        StyledButton, StyledFieldset, StyledError } from './cssform';
import { Link } from '@mui/material';
import PostLogin from '../../API/postLogin';

const initalState = {
    username: '',
    password: '',
   
  };

  const signUpState = {
    username: '',
    password: '',
    email: '',
    phone: '',
    gender: '',
    
  };
  
 export default function Welcome({nhanToken}) {

  const [state, setState] = useState(initalState);
  const [signupstate, setSignUpState] = useState(signUpState);

  const [error, setError] = useState('');

  const handleSubmit =  async e => {
    e.preventDefault();
    console.log('submitted!');
    console.log(state);

    for (let key in state) {
      if (state[key] === '') {
        setError(`You must provide the ${key}`)
        return
      }
    }
    setError('');

    // const regex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    // const test = regex.test(state.email);
    // console.log(test);
   
  
    const ob = {
        username: state.username,
        password: state.password
    }
   let json = await PostLogin(ob)
   console.log(json)

   nhanToken (json)
    console.log("Succeeded!!!")
  };


  const handleSubmit_sign = e => {
    e.preventDefault();
    console.log('submitted!');
    console.log(signupstate);

    for (let key in signupstate) {
      if (signupstate[key] === '') {
        setError(`You must provide the ${key}`)
        return
      }
    }
    setError('');

    // const regex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    // const test = regex.test(state.email);
    // console.log(test);

    console.log("Succeeded!!!")
  };


  const handleInput = e => {
    const inputName = e.currentTarget.name;
    const value = e.currentTarget.value;
    console.log(inputName)
    console.log(value)

    setState(prev => ({ ...prev, [inputName]: value }));
  };

  const inputLogin = e => {
    const inputName = e.currentTarget.name;
    const value = e.currentTarget.value;
    console.log(inputName)
    console.log(value)

    setSignUpState(prev => ({ ...prev, [inputName]: value }));
  };

    const [Username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const [login, setLogin] = useState(true);
    const [sign, setSign] = useState(false);

    const dangnhap = ()=>{
        nhanToken('dang nhap thanh cong!');
    }

    const dangki = ()=>{
        alert ('dang ki thanh cong!');
    }

return (
   <div>
       <GlobalStyle />

   <div className={s.Header}>
           <div className={`${s.left} ${s.box}`}>
               <h1>LANA.VN</h1>
           </div>
           <div className={`${s.right} ${s.box}`}>
                <button className={s.button} onClick ={()=>{setSign(true); setLogin(false)}}>Đăng Ký</button>
                &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
               <button className={s.button} onClick={()=>{setLogin(true); setSign(false)}}>Đăng Nhập</button>
               &nbsp;&nbsp;&nbsp;
           </div>
       </div>
       <div>
       { login && 
       
       <StyledFormWrapper>
        <StyledForm onSubmit={handleSubmit}>
          <h2>Đăng Nhập</h2>
          <br/><br/><br/>
          <label htmlFor="username">Username</label>
          <StyledInput
            type="text"
            name="username"
            value={state.username}
            onChange={handleInput}
          />
          <br/><br/>
           <label htmlFor="password">Password</label>
          <StyledInput
            type="password"
            name="password"
            value={state.password}
            onChange={handleInput}
          />



         
          {error && (
            <StyledError>
              <p>{error}</p>
            </StyledError>
          )}
          <br/><br/><br/><br/>
          <StyledButton type="submit">Submit</StyledButton>
          <br/><br/><br/><br/>
        </StyledForm>
      </StyledFormWrapper>
  }
  

  { sign && 
           <StyledFormWrapper>
           <StyledForm onSubmit={handleSubmit_sign}>
             <h2>Đăng Ký</h2>
             <label htmlFor="username">Username</label>
             <StyledInput
               type="text"
               name="username"
               value={signupstate.username}
               onChange={inputLogin}
             />
              <label htmlFor="password">Password</label>
             <StyledInput
               type="password"
               name="password"
               value={signupstate.password}
               onChange={inputLogin}
             />
             <label htmlFor="email">Email</label>
             <StyledInput
               type="email"
               name="email"
               value={signupstate.email}
               onChange={inputLogin}
             />
              {/* <label htmlFor="phone">Phone</label>
             <StyledInput
               type="phone"
               name="phone"
               value={signupstate.phone}
               onChange={inputLogin}
             /> */}
              <label htmlFor="phone">Phone</label>
              <StyledInput
                type="text"
                name="phone"
                value={signupstate.phone}
                onChange={inputLogin}
              />
             <StyledFieldset>
               <legend>Gender</legend>
               <label>
                 <input
                   type="radio"
                   value="female"
                   name="gender"
                   checked={signupstate.gender === 'female'}
                   onChange={inputLogin}
                 />
                 Female
               </label>
               <label>
                 <input
                   type="radio"
                   value="male"
                   name="gender"
                   checked={signupstate.gender === 'male'}
                   onChange={inputLogin}
                 />
                 Male
               </label>
               <label>
                 <input
                   type="radio"
                   value="other"
                   name="gender"
                   checked={signupstate.gender === 'other'}
                   onChange={inputLogin}
                 />
                 Other
               </label>
             </StyledFieldset>

             {error && (
               <StyledError>
                 <p>{error}</p>
               </StyledError>
             )}
             <StyledButton type="submit">Submit</StyledButton>
           </StyledForm>
         </StyledFormWrapper>
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
              }}>CHÍNH SÁCH HỖ TRỢ</h3><br/>
                        <h5><Link href="#">Điều khoản chính sách</Link><br/>
              <br/>
                      <Link href="#">Giải quyết khiếu nại, tranh chấp</Link>
                        </h5>
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
