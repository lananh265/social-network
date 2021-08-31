import "./sidebar.css";

import {
  House,
  Storage ,
  MenuBook,
  Chat,
  
} from "@material-ui/icons";
import { Users } from "../../dummyData";
import CloseFriend from "../closeFriend/CloseFriend";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <House className="sidebarIcon" />
            <span className="sidebarListItemText">Trang Chủ</span>
          </li>
          <li className="sidebarListItem">
            <Storage className="sidebarIcon" />
            <span className="sidebarListItemText">Giới Thiệu</span>
          </li>
          {/* <li className="sidebarListItem">
            <MenuBook className="sidebarIcon" />
            <span className="sidebarListItemText">Đăng Bài</span>
          </li>
          <li className="sidebarListItem">
            <Chat className="sidebarIcon" />
            <span className="sidebarListItemText">Nhắn Tin</span>
          </li> */}
          
        </ul>
        
      </div>
    </div>
  );
}
