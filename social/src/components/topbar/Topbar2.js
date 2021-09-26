import "./Topbar2.css"
import { Search} from "@material-ui/icons";
import s from "../css/header.module.css"
import Sidebarleft from "../sidebarleft/Sidebarleft";

export default function Topbar() {
    const dangXuat = () =>{
        localStorage.removeItem("token")
        window.location.href = "/";
    }
  return (
      
    <div className="topbarContainer">
      
      <div className="sidebar">
        <Sidebarleft />
      </div>
      <div className="topbarLeft">
        <h1>LANA.VN</h1>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Tìm kiếm..."
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
