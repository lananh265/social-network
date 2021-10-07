import s from "./share.module.css";
import {MonetizationOn, Label,Room, EmojiEmotions, Share} from "@material-ui/icons"
import { useState } from "react";
import PostShare from "../../API/postShare";
import useToken from "../../API/useToken";

const obShare = {
  connecter_id: 1,
  content: "",
  benefit: "",
}
export default function Poststatus() {
  // const id = "1";
  // const [content, setContent]= useState("")
  // const [benefit, setBenefit] = useState("")

 const [share, setShare] = useState(obShare )
 const {token, luuToken} = useToken()
 const inputShare = e =>{
   const inputName = e.currentTarget.name;
   const value = e.currentTarget.value;
   setShare(prev =>({ ...prev, [inputName] : value}));
 };

 const [error, setError] = useState('');
 
 const _handleShare = async(e) =>{
   e.preventDefault();
   for (let key in share){
     if (share[key] === '') {
       setError(`Bạn chưa nhập ${key} !`)
       return
     }
   }
   setError('');
   let ob = {
    connecter_id: token.id,
    content: share.content,
    benefit: share.benefit
   }
   const json = await PostShare(ob)
   console.log(json)
   
   if(!json.status){
     alert("Chia sẻ thất bại!")
   }else{
    alert("Chia sẻ thành công!")
    setShare(obShare)
   }
 };

  return (
    <div className={`${s.share}`}>
      <div className={`${s.shareWrapper}`}>
        <div className={`${s.shareTop}`}>
        <img className={`${s.shareProfileImg}`} src="/assets/person/user.png" alt="" />
          <input 
            placeholder="Nơi nhập nội dung cần chia sẻ..."
            type ="text"
            name="content"
            value={share.content}
            onChange={inputShare}
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
                    value= {share.benefit}
                    onChange={inputShare}
                    className={`${s.bebefitInput}`} />
                </div>
            </div>
            <button onClick={_handleShare} className={`${s.shareButton}`}>Chia Sẻ</button>
        </div>
      </div>
    </div>
  );
}
