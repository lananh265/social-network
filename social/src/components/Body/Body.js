import Sidebar from "../sidebar/sidebar"
import Rightbar from "../rightbar/Rightbar"
import Feed from "../feed/Feed"
export default function Body(){
    
    return(
        <div>
            <div className="home">
            <Sidebar />
            <div className="profileRight">
            <div className="homeContainer">
                <Feed />
                <Rightbar />
            </div>
        </div>
    </div>
        </div>
    )
}