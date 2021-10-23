import s from "./post.module.css";
// import { MoreVert } from "@material-ui/icons";
// import { Users } from "../dummyData";
// import { useState } from "react";
// import  Message  from "../../pages/Message/Message";
import {MonetizationOn} from "@material-ui/icons"
import { Link } from '@mui/material';
import Join from "../modal/Join"
import GetInfor from "../../API/GetInfor"

export default function Post({ post }) {
const {token} = GetInfor()
  const ob = {
    id_st: post.id_st,
    connecter_id: token.id,
    target_id: post.connecter_id,
    name: post.name,
    benefit: post.benefit,
    content: post.content         
  }
  const goMess = ()=>{
    window.location.href = "/Message";
  }
  return (
    <div className={`${s.post}`}>
      <div className={`${s.postWrapper}`}>
        <div className={`${s.postTop}`}>
          <div className={`${s.postTopLeft}`}>
            {/* <img
              className="postProfileImg"
              src={Users.filter((u) => u.id === post?.userId)[0].profilePicture}
              alt=""
            /> */}
            {/* neu Post ton tai tra ve Post.name */}
            <span className={`${s.postUsername}`}>
              {/* <Link onClick={()=>{<Message/>}}>{post?.name}</Link> */}

              <Link onClick={()=>{goMess()}}>{post?.name}</Link>

              {/* {Users.filter((u) => u.id === post?.userId)[0].username} */}
            </span>
            <span className={`${s.postDate}`}>{post.date_st}</span>
          </div>
          <div className={`${s.postTopRight}`}>
            <span><MonetizationOn  htmlColor="#FF9900"/>{post.benefit}</span>
            <button className={s.option} > <Join ob={ob}/></button> 
          </div>
        </div>
        <div className={`${s.postCenter}`}>
          <span className={`${s.postText}`}>{post.content}</span>
          {/* <img className="postImg" src={post.photo} alt="" /> */}
        </div>
        <div className={`${s.postBottom}`}>
          {/* <div className="postBottomLeft">
            <img className="likeIcon" src="assets/like.png" onClick={likeHandler} alt="" />
            <img className="likeIcon" src="assets/heart.png" onClick={likeHandler} alt="" />
            <span className="postLikeCounter">{like} people like it</span>
          </div> */}
          {/* <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comments</span>
          </div> */}
        </div>
      </div>
    </div>
  );
}
