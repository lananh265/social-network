import { useState } from "react";
import GetSignup from "../API/GetSignup";
import PostLogin from "../API/postLogin";
import s from '../components/css/header.module.css';
import { GlobalStyle, StyledFormWrapper,StyledForm, StyledInput,
    StyledButton, StyledFieldset, StyledError } from '../components/css/cssform';

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

export default function Welcome({layToken}) {
const [login, setLogin] = useState(obLogin)
const [signup, setSignUp] = useState(obSignup)
const [error, setError] = useState('');

//trang thai quyet dinh form Dang nhap hay Dang ki duoc hien thi
const [formLogin, setFormLogin] = useState(true);
const [formSignup, setFormSignup] = useState(false);


// nut dang nhap
const handleSubmit =  async e => {
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

   layToken (json)
console.log("Succeeded!!!")
  };
// lay du lieu dang nhap
const xulyInput = (e) =>{
    const inputName = e.currentTarget.name
    const value = e.currentTarget.value
    setLogin (prev => ({ ...prev, [inputName]: value }));
}

//xulyNhap cho Signup
const xulyNhap =(e) =>{
    const inputName = e.currentTarget.name
    const value = e.currentTarget.value
    setSignUp (prev => ({ ...prev, [inputName]: value }));
}


const dangKy = async(e) =>{
e.preventDefault();

    const ob = {
        username: signup.username,
        password: signup.password,
        email: signup.email,
        phone: signup.phone,
        name: signup.name,
        gender: signup.gender
    }
    
    const json = await GetSignup(ob)
    console.log(json)
    
    //dua du lieu json vao token cua App moi co the vao duoc trang Home
    //layToken(json) //json:toan bo ob thong tin ca nhan
}

const handleSubmit_signup = e => {
e.preventDefault();
console.log('submitted!');
console.log(signup);

for (let key in signup) {
    if (signup[key] === '') {
    setError(`You must provide the ${key}`)
    return
    }
}
setError('');
console.log("Succeeded!!!")
};

const tam = ()=>{
    
}

    return (
   <div>
       <GlobalStyle />
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
            <StyledForm onSubmit={handleSubmit}>
            <h2>Đăng Nhập</h2>
            <br/><br/><br/>
            <label htmlFor="username">Username</label>
            <StyledInput
                type="text"
                name="username"
                value={login.username}
                onChange={xulyInput}
            />
            <br/><br/>
            <label htmlFor="password">Password</label>
            <StyledInput
                type="password"
                name="password"
                value={login.password}
                onChange={xulyInput}
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

{ formSignup &&
        <StyledFormWrapper>
           <StyledForm onSubmit={handleSubmit_signup}>
               <h2>Đăng Ký</h2>
               <label htmlFor="username">Username</label>
               <StyledInput
                 type="text"
                 name="username"
                 value={signup.username}
                 onChange={xulyNhap}
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

    </div>
    </div>
  );
  }
  
  
  
  