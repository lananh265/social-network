// // import useToken from "../API/useToken";

// // import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
// // import Message from "../Message/Message";
// // import Infor from "../Infor/Infor";
// // import Task from "../Task/Task";
// // import Money from "../Money/Money";
// // import Feedback from "../Feedback/Feedback";
// // import Status from "../../components/status/status";
// //import Feed from "../../components/feed/Feed";
// //import Rightbar from "../../components/rightbar/Rightbar";
// import Share from "../../components/share/Share";
// import "../../components/css/home.css"
// import Sidebar from "../../components/sidebar/sidebar";
// import s from "./profile.module.css"

// export default function Profile() {
    
//     // const [formBody, setFormBody] = useState(true)
    
//     const goInfor=()=>{
//         window.location.href = "/Infor";
//     }
    
//     return (
//         <>
//         <div className={s.homeContainer}>
//             <Sidebar />
//            <div className={s.body}>
//             <div className={`${s.profileRight}`}>
//                 <div className={`${s.profileRightTop}`}> 
//                     <div className={`${s.profileCover}`}> 
//                     <img
//                         className={`${s.profileUserImg}`}
//                         src="assets/person/3.jpg"
//                         alt=""
//                     />
//                 </div>
//              <div className={`${s.profileInfo}`}>
//                 <h4 className={`${s.profileInfoName}`}><b>Lan Anh</b></h4>
//             </div>

//             <div>
//                 <button className={s.button} onClick={()=>{goInfor()}}><b>Cập nhật thông tin</b></button>
//             </div>

//                 </div>
//             </div>

//             <div className={s.share}>
//         <Share />
//         </div>
//         </div>
//             {/* <Rightbar profile /> */}
//             <div className= {s.rightbar} >

//         </div>
//      </div>
     
//         </>
//    );
//    }
   


import React, { useState, useEffect } from "react";
import Progress from "../../components/progress/Progress";
import Transfer from "../../API/Transfer";

// const ob ={
//     connecter_id:1,
//     target_id:2,
//     coin:4
// }
// export default function Profile () {
//     const [so, setSo] = useState(0);
//     const tangDan =()=>{
//         if(so<100){
//             setSo(so+10);
//         }else{
//             setSo(0);
//         }
//     }
//     const chuyenTien= async(e)=>{
//         e.preventDefault();
//     let json = await Transfer(ob)
//     console.log(json)
//     if(!json.status){
//         alert("Chuyen tien thất bại")
//       }else{
//         alert(json.code)
//       }
//       setSo(100)
//   };

   
//     return(
// 	<>
// 		<h1>React Progress Bar</h1>
// 		<Progress  done = {so}/>
// 		<button onClick={()=>{tangDan()}}>Click</button>
// 		<button onClick={(e)=>{chuyenTien(e)}}>Chuyen tien</button>
// 	</>
//     )
// };
	



// import React, {useState, useEffect} from "react";
// import AccountInfor from "../../API/AccountInfor";
// import GetInfor from "../../API/GetInfor"
// export default function Money (){
//     const [accountInfor, setAccountInfor] = useState([{}])
//     const {token} = GetInfor()
//     const [showQR, setShowQR]= useState(false)
//     const [inMoney, setInMoney] = useState(false)
//     useEffect( ()=>{
//         let mounted = true
//         const ob = {
//             user_id: token.id
//         }
//         AccountInfor(ob).then((json)=>{
//             if(mounted){
//                 setAccountInfor(json)
//                 console.log(json)
//             }
//         })
//         return ()=>mounted = false
//     },[])
//     return(
//         <div>
//             <ul>
//              <li>  Name: {accountInfor[0].name}</li>
//              <li>  Email: {accountInfor[0].email}</li>
//               <li> Phone: {accountInfor[0].phone}</li>
//               <li>Balance: {accountInfor[0].balance}</li> 
//             </ul>

//         </div>
//     )
// }


{/* <StyledForm onSubmit={handleSignup}>
    <h2>Đây là Money</h2>
    <br/>
    <ul>
          <li>Name:{accountInfor[0].name} </li>
          <li>Email: {accountInfor[0].email}</li>
          <li>SDT: {accountInfor[0].phone}</li>
          <li>Blance: {accountInfor[0].balance}</li>
        </ul>
    <StyledInput
     type="radio"
     value="nap"
     name="tien"
     onChange={()=>setInMoney(true)}
    />
        Nạp tiền

    <StyledInput
      type="radio"
      value="rut"
      name="tien"
      onChange={()=>setInMoney(false)}
    />
    Rút tiền
    <h6>Nhập số tiền bạn muốn rút:</h6>
                  <h6>URL: {checkAction()}</h6>
    <StyledInput
      placeholder="Nhập email"
      type="email"
      name="email"
      value={signup.email}
      onChange={inputSignup}
    />
  
      <StyledInput
     type ="number" onChange={(e)=>{setCoin(e.target.value)}}/>
     {showQR ?
     
     <button onClick={()=>{setShowQR(false)}}>Ẩn mã QR</button>:
     <button onClick={()=>{setShowQR(true)}}>Quét mã QR</button>
     }
     {showQR ?
     <div>
     <QRCode
id='qrcode'
value={checkAction()}
size={190}
level={'H'}
includeMargin={true}
/>
</div>:null}     


  
</StyledForm>
 */}
