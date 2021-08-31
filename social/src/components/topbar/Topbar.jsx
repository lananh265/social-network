import "./topbar.css";
import { Search, Person, PersonAdd, Notifications } from "@material-ui/icons";



export default function Topbar() {
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

     
    
         
        
      
     
        <div className="topbarIcons">
         
         
          {/* <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge"></span>
          </div> */}
       </div>
       </div>
      
  );
}
