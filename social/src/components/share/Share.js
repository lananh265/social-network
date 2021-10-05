import "./share.css";

export default function Poststatus() {
  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          
          <input
            placeholder="Nơi nhập nội dung cần chia sẻ..."
            className="shareInput"
          />
        </div>
        <hr className="shareHr"/>
        <div className="shareBottom">
            <div className="shareOptions">
            </div>
            <button className="shareButton">Chia Sẻ</button>
        </div>
      </div>
    </div>
  );
}
