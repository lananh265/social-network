import s from "./rightmess.module.css";
const src = "http://localhost:1337/server-node/v0.1/server/images/avatars/"
export default function RightMess({listInbox, setTargetUser}) {
  const HomeRightbar = () => {
    return (
      <>
        <h4 className={s.rightbarTitle}>Danh sách đối tác</h4>
        <ul className={s.rightbarFriendList}>
          {listInbox.map((u) => (
            <div key={u.id}>
                <li className={s.rightbarFriend}>
        
                <div className={s.rightbarProfileImgContainer} onClick={()=>{setTargetUser(u)}}>
                <img className={s.rightbarProfileImg} src={src+u.avatar} alt="" />
                {/* <span className={s.rightbarOnline}></span> */}
                </div>
                <span className={s.rightbarUsername}>{u.name}</span>
        
                </li>
            </div>
          ))}
        </ul>
      </>
    );
  };


  return (
    <div className={s.rightbar}>
      <div className={s.rightbarWrapper}>
        <HomeRightbar />
      </div>
    </div>
  );
}
