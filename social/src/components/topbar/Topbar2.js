import "./Topbar2.css"
import { Search} from "@material-ui/icons";
import s from "../css/header.module.css"
import Sidebarleft from "../sidebarleft/Sidebarleft";
import { useState } from "react";
import PostSearch from "../../API/PostSearch";

export default function Topbar({setSearch}) {
  const [key,setKey] = useState("")
    const dangXuat = () =>{
        localStorage.removeItem("token")
        window.location.href = "/";
    }
    const enterKey = async(e)=>{
      if (e.key === 'Enter') {
          e.preventDefault();
          e.stopPropagation();
          let ob = {
            key: key
          }
          const json = await PostSearch(ob)
          console.log(json)
          setSearch(json)
        }
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
            className="searchInput" 
            value = {key}
            onKeyDown = {(e)=>{enterKey(e)}}
            onChange = {(e)=>{setKey(e.target.value)}}/>
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
