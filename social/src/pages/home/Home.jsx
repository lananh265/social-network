import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import "./home.css"

export default function Home() {
  return (
    <>
      <Topbar />

      <div className="home">
        <Sidebar />
        <div className="profileRight">
        <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src="assets/post/hoconl.jpg"
                alt=""
              />
            </div>
            
          </div>
          <div className="homeContainer">
        <Feed/>
        <Rightbar/>
      </div>
      </div>
      </div>
    </>
  );
}
