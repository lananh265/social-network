import "./rightbar.css";
import { Users } from "../../dummyData";
import Online from "../online/Online";

import { Search } from "@material-ui/icons";

export default function Rightbar({ profile }) {
  const HomeRightbar = () => {
    return (
      <>
        {/* <div className="phanhoiContainer">
          <img className="phanhoiImg" src="assets/gift.png" alt="" />
          
        </div> */}
        {/* <img className="rightbarAd" src="assets/ad.png" alt="" /> */}

       
      
           
         
            
        <h4 className="rightbarTitle">Thành viên đang hoạt động</h4>
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Tìm kiếm..."
            className="searchInput" />
        </div>
        <br/>
        <ul className="rightbarFriendList">
          {Users.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        <h4 className="rightbarTitle"></h4>
        </>
    );
  }
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {profile ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}
