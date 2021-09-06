import React, {useState}from 'react';
// import './Title.css'
import s from '../Gopy/header.module.css'
import { GlobalStyle } from '../Gopy/cssform';
import {StyledFormWrapper,StyledForm, StyledInput,StyledButton, StyledFieldset, StyledError} from '../Gopy/cssform'


// export default function Welcome({nhanProps}) {
//     const [Username, setUsername] = useState("");
//     const [password, setPassword] = useState("");
//     const [email, setEmail] = useState("");
//     const [phone, setPhone] = useState("");

//     const [login, setLogin] = useState(false);
//     const [sign, setSign] = useState(false);

//     const dangnhap = ()=>{
//         nhanProps('dang nhap thanh cong!');
//     }

//     const dangki = ()=>{
//         alert ('dang ki thanh cong!');
//     }


const initalState = {
    username: '',
    email: '',
    message: '',
    gender: ''
  };
  
  export default function Welcome({nhanProps}) {

    const [Username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const [login, setLogin] = useState(false);
    const [sign, setSign] = useState(false);

    const dangnhap = ()=>{
        nhanProps('dang nhap thanh cong!');
    }

    const dangki = ()=>{
        alert ('dang ki thanh cong!');
    }

    const [state, setState] = useState(initalState);
    const [error, setError] = useState('');
  
    const handleSubmit = e => {
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
  
      console.log("Succeeded!!!")
    };
  
    const handleInput = e => {
      const inputName = e.currentTarget.name;
      const value = e.currentTarget.value;
  
      setState(prev => ({ ...prev, [inputName]: value }));
    };
return (
   <div>
       <GlobalStyle />

   <div className={s.Header}>
           <div className={`${s.left} ${s.box}`}>
               <h1>LANA.VN</h1>
           </div>
           <div className={`${s.right} ${s.box}`}>
                <button className={s.button} onClick ={()=>{setSign(true); setLogin(false)}}>Đăng Kí</button>
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
          <label htmlFor="name">Username</label>
          <StyledInput
            type="text"
            name="name"
            value={state.name}
            onChange={handleInput}
          />
           <label htmlFor="name">Password</label>
          <StyledInput
            type="pass"
            name="name"
            value={state.name}
            onChange={handleInput}
          />
         
          {error && (
            <StyledError>
              <p>{error}</p>
            </StyledError>
          )}
          <StyledButton type="submit">Submit</StyledButton>
        </StyledForm>
      </StyledFormWrapper>
  }
  

  { sign && 
           <StyledFormWrapper>
           <StyledForm onSubmit={handleSubmit}>
             <h2>Đăng Ký</h2>
             <label htmlFor="name">Username</label>
             <StyledInput
               type="text"
               name="name"
               value={state.name}
               onChange={handleInput}
             />
              <label htmlFor="name">Password</label>
             <StyledInput
               type="pass"
               name="name"
               value={state.name}
               onChange={handleInput}
             />
             <label htmlFor="email">Email</label>
             <StyledInput
               type="email"
               name="email"
               value={state.email}
               onChange={handleInput}
             />
              <label htmlFor="name">Phone</label>
             <StyledInput
               type="number"
               name="name"
               value={state.name}
               onChange={handleInput}
             />
             <StyledFieldset>
               <legend>Gender</legend>
               <label>
                 <input
                   type="radio"
                   value="female"
                   name="gender"
                   checked={state.gender === 'female'}
                   onChange={handleInput}
                 />
                 Female
               </label>
               <label>
                 <input
                   type="radio"
                   value="male"
                   name="gender"
                   checked={state.gender === 'male'}
                   onChange={handleInput}
                 />
                 Male
               </label>
             </StyledFieldset>
             {/* <label htmlFor="message">Message</label>
             <StyledTextArea
               name="message"
               value={state.message}
               onChange={handleInput}
             /> */}
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
  
  
   {/* <Footer /> */}

   &nbsp;&nbsp;&nbsp;
        <div className={s.footer}>

            <div className={s.down}> <h6 style={{ color: "white", 
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
);
}
