import { useState } from "react";
import GetSignup from "../../API/GetSignup";
import PostLogin from "../../API/postLogin";

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

  const dangNhap = async(e) =>{
    e.preventDefault();
    //khoi tao ob dua cho PostLogin xu ly
      const ob = {
          username: login.username,
          password: login.password
      }
      //đợi PostLogin trả về một ob
      const json = await PostLogin(ob)
      console.log(json)
      
      //dua du lieu json vao token cua App moi co the vao duoc trang Home
      layToken(json) //json:toan bo ob thong tin ca nhan
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

    return (
   <div>
       <h1>Day la Welcome {login.username} </h1>
       <div>
           <form>
               <label>
                   <p>Username:</p>
                   <input type="text" name="username" value={login.username} onChange = {xulyInput} />
               </label>
               <br/>
               <label>
                   <p>Password:</p>
                   <input type="password" name="password" value={login.password} onChange = {xulyInput} />
               </label>
           </form>
           <button onClick={dangNhap}>Đăng Nhập</button>

           <div>
           <form>
               <label>
                   <p>Username:</p>
                   <input type="text" name="username" value={signup.username} onChange = {xulyNhap} />
               </label>
               <br/>
               <label>
                   <p>Password:</p>
                   <input type="password" name="password" value={signup.password} onChange = {xulyNhap} />
               </label>
               <label>
                   <p>Email:</p>
                   <input type="text" name="email" value={signup.email} onChange = {xulyNhap} />
               </label>
               <label>
                   <p>Phone:</p>
                   <input type="text" name="phone" value={signup.phone} onChange = {xulyNhap} />
               </label>
               <label>
                   <p>Name:</p>
                   <input type="text" name="name" value={signup.name} onChange = {xulyNhap} />
               </label>
               <label>
                   <p>Gender:</p>
                   <input type="text" name="gender" value={signup.gender} onChange = {xulyNhap} />
               </label>
           </form>
           <button onClick={dangKy}>Đăng Ký</button>
       </div>

       </div>
    </div>
  );
  }
  
  
  
  