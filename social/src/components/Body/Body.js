import Sidebar from "../sidebar/sidebar"
import Rightbar from "../rightbar/Rightbar"
// import Feed from "../feed/Feed"
import s from "./Body.module.css"
import Status from "../status/status"
import Share from "../share/Share"
import Status2 from "../stastus2/Status2"
// import Feed from "../feed/Feed"
export default function Body({search}){
    
    return(
        <div className= {s.statusContainer}>
        <div className={s.sidebar}>
        {/* <h1>a</h1> */}
        </div>

        <div className= {s.status} >
            {/* <Share/> */}
            {/* <Feed /> */}
            <Status2 search={search}/>
            {/* <Status/> */}
            
        </div>

        <div className= {s.rightbar} >

        </div>
    </div>
    )
}