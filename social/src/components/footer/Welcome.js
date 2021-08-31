import React, {useState}from 'react';
import Footer from './Footer';
import "./Title.css"
 
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

return (
   <div>
       
   <div className="Header">
           <div className="trai">
               <h1>LANA.VN</h1>
           </div>
           <div className="phai">
                <button onClick ={()=>{setSign(true); setLogin(false)}}>Đăng Kí</button>
               <button onClick={()=>{setLogin(true); setSign(false)}}>Đăng Nhập</button>
               
           </div>
       </div>
       { login && 
            <div className="input">
      
            <h1>Đăng Nhập</h1>
            <br/>
            
            <form >
                <label>
                    <p >Username</p>
                    <input type="text" onChange={(e)=>{setUsername(e.target.value)}}/>
                </label>
                <br/>
                <label>
                    <p>Password</p>
                    <input type="password" onChange={(e)=>{setPassword(e.target.value)}}/>
                </label>
                <br/>
                <br/>
               
                <div>
                 <button onClick={()=>{dangnhap()}}>Đăng Nhập</button>
                </div>
            </form>
     
        </div>
       }
  

  { sign && 
            <div className="input">
      
            <h1>Đăng Kí</h1>
            <form>
                <label>
                    <p>Username</p>
                    <input type="text" onChange={(e)=>{setUsername(e.target.value)}}/>
                </label>
                <label>
                    <p>Password</p>
                    <input type="password" onChange={(e)=>{setPassword(e.target.value)}}/>
                </label>
                <label>
                    <p>Email</p>
                    <input type="email" onChange={(e)=>{setEmail(e.target.value)}}/>
                </label>
                <label>
                    <p>Phone</p>
                    <input type="phone" onChange={(e)=>{setPhone(e.target.value)}}/>
                </label>
                <div>
                    <br/>
                 <button onClick={()=>{dangki()}}>Đăng Kí</button>
                </div>
            </form>
     
        </div>
       }
  
  
  
   <Footer />
   </div>
);
}
