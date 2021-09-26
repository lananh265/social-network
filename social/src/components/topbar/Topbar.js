import "./Topbar.css"
import { Search} from "@material-ui/icons";
import s from "../css/header.module.css"

export default function Topbar() {
    const dangXuat = () =>{
        localStorage.removeItem("token")
        window.location.href = "/";
    }
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <span className="logo">LANA.VN</span>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search..."
            className="searchInput" />
        </div>
      </div>
        <div className="topbarRight">
        <button className={s.button} onClick={dangXuat}>Đăng Xuất</button>
        </div>
        <div className="topbarIcons">
       </div>
    </div>
  );
}
