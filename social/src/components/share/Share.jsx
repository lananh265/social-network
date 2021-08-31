import "./share.css";
import {PermMedia, Label,Room, EmojiEmotions} from "@material-ui/icons"

export default function Share(post) {
  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
       
          <input
            placeholder="Chúng tôi có thể giúp gì cho bạn?"
            className="shareInput"
            
          />
        </div>
        <br/>
        <br/>
        <button  onClick={()=>{post()}}> Đăng bài</button>
     
      </div>
    </div>
  );
}
