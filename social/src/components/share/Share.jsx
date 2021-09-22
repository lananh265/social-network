import "./share.css";
import {PermMedia, Label,Room, EmojiEmotions} from "@material-ui/icons"

export default function Share(post) {
  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <input  className="shareInput" placeholder="Chúng tôi có thể giúp gì cho bạn?" />
        </div>
      </div>
    </div>
  );
}
