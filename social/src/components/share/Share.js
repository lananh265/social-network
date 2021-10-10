import s from "./share.module.css";
import {MonetizationOn, Label,Room, EmojiEmotions, Share, PinDropSharp} from "@material-ui/icons"
import { useState } from "react";
import PostShare from "../../API/postShare";
import useToken from "../../API/useToken";

const obInput ={
  content: "",
  benefit:""
}
export default function Poststatus({props}) {
  // const id = "1";
  // const [content, setContent]= useState("")
  // const [benefit, setBenefit] = useState("")

  const [input, setInput] = useState(obInput)

  const tokenString = localStorage.getItem('token');
  const token = JSON.parse(tokenString);

//  const [share, setShare] = useState(obShare )
//  const {luuToken} = useToken()
//  const inputShare = e =>{
//    const inputName = e.currentTarget.name;
//    const value = e.currentTarget.value;
//    setShare(prev =>({ ...prev, [inputName] : value}));
//  };

 const [error, setError] = useState('');
 
 const _handleShare = async(e) =>{
   e.preventDefault();
   for (let key in input){
     if (input[key] === '') {
       setError(`Bạn chưa nhập ${key} !`)
       return
     }
   }
   setError('');
   let ob = {
    connecter_id: token.id,
    content: input.content,
    benefit: input.benefit
   }
   const json = await PostShare(ob)
   console.log(json)
   
   if(!json.status){
     alert("Chia sẻ thất bại!")
   }else{
    alert("Chia sẻ thành công!")
    
    let obShare = {
      id_st:json.id_st,
      connecter_id:token.id,
      name: token.name,
      content:input.content,
      benefit:input.benefit,
      date_st: "1 second ago"
    }
    props(obShare)
    setInput(obInput)
   }
 };

 const _handleInput = (e)=>{
   const inputName = e.currentTarget.name
   const value = e.currentTarget.value
   setInput(prev =>({...prev, [inputName]: value}))
 }

  return (
    <div className={`${s.share}`}>
      <div className={`${s.shareWrapper}`}>
        <div className={`${s.shareTop}`}>
        <img className={`${s.shareProfileImg}`} src="/assets/person/user.png" alt="" />
          <input 
            placeholder="Nơi nhập nội dung cần chia sẻ..."
            type ="text"
            name="content"
            value={input.content}
            onChange={_handleInput}
            className={`${s.shareInput}`}
          />
        </div>
        <hr className={`${s.shareHr}`}/>
        <div className={`${s.shareBottom}`}>
            <div className={`${s.shareOptions}`}>
            <div className={`${s.shareOption}`}>
                    <MonetizationOn htmlColor="#FF9900" className={`${s.shareIcon}`}/>
                    <span className={`${s.shareOptionText}`}></span>
                    <input type ="number"
                    name = "benefit"
                    value= {input.benefit}
                    onChange={_handleInput}
                    className={`${s.bebefitInput}`} />
                </div>
            </div>
            <button onClick={_handleShare} className={`${s.shareButton}`}>Chia Sẻ</button>
        </div>
      </div>
    </div>
  );
}
