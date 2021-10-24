import { useState } from "react";
import s from "./Money.module.css"
import { StyledError, StyledForm, StyledFormWrapper, StyledButton } from '../../components/css/cssform';
import {MonetizationOn} from "@material-ui/icons"
const obMoney = {
    name: "",
    email: "",
    phone: "",
    balance: "",
    cash: "",
    naptien: "",
    ruttien:"",
}
export default function Money() {
  const [money, setMoney] = useState(obMoney)
  const [error] = useState('');
//   const handleMoney = async e =>{
//     e.preventDefault();
//     console.log('submitted!');
//     console.log(money);

//     for (let key in money) {
//       if (money[key] === '') {
//         setError(`You must provide the ${key}`)
//         return
//       }
//   }
//   setError('');
//   const ob = {
//       username: money.name,
//       password: money.password
//   }
// //  let json = await PostLogin(ob)
// //  console.log(json)

// //   layToken(json)
// //  if(!json.status){
// //   alert("Cập nhật thông tin không thành công. Vui lòng kiểm tra lại!")
// // }else{
// //   window.location.href = "/";
// // }
// };
const inputMoney =(e) =>{
    const inputName = e.currentTarget.name
    const value = e.currentTarget.value
    setMoney (prev => ({ ...prev, [inputName]: value }));
}
const obthongTin ={
  name: "Hồ Thị Lan Anh",
  email: "AnhB1710104@student.ctu.edu.vn",
  phone: "0987654799",
  balance:"4.579.079",
}
const state = money.naptien
const format = state.replace(/\B(?=(\d{3})+(?!\d))/g, ',')


const state1 = money.ruttien
const format1 = state1.replace(/\B(?=(\d{3})+(?!\d))/g, ',')



    return (
        <div>
        <StyledFormWrapper>
          <StyledForm >
            <h2><b>Thông Tin Tài Khoản</b></h2>
            <br/>
            <b>
            <p>Họ tên : {obthongTin.name}</p>
            <p>Email : {obthongTin.email}</p>
            <p>Số điện thoại : {obthongTin.phone}</p>
            <p>Số dư khả dụng : {obthongTin.balance} VNĐ</p>
            </b>
            <br/><br/>
           
                  <label><b>Số tiền chuyển vào : </b></label>
                  <div className={`${s.shareOption}`}>
                    <MonetizationOn htmlColor="#FF9900" className={`${s.shareIcon}`}/>
                    <span className={`${s.shareOptionText}`}></span>
                    <input type ="number"
                    name = "naptien"
                    value= {money.naptien}
                    onChange={inputMoney}
                    className={`${s.bebefitInput}`} /><b>{format}  VNĐ</b>
                </div>
                  <br/>
                  <label><b>Số tiền rút ra : </b></label>
                  <div className={`${s.shareOption}`}>
                    <MonetizationOn htmlColor="#FF9900" className={`${s.shareIcon}`}/>
                    <span className={`${s.shareOptionText}`}></span>
                    <input type ="number"
                    name = "ruttien"
                    value= {money.ruttien}
                    onChange={inputMoney}
                    className={`${s.bebefitInput}`} /><b>{format1}  VNĐ</b>
                </div>
                  
            {error && (
              <StyledError>
                <p>{error}</p>
                </StyledError>
            )}
            <br/><br/> 
            
            <StyledButton  type="submit">Cập Nhật</StyledButton>
          </StyledForm>
        </StyledFormWrapper>
    
        </div>
  
  );
}
  
  