import Post from "../post/Post";
import s from "./status2.module.css";
import Share from "../share/Share";
// import { Posts } from "../dummyData"
import GetStatus from "../../API/GetStatus"
import { useState, useEffect } from "react";

export default function Status({search}) {
  const [posts, setPost] = useState([])
  const addPost = (ob)=>{
    setTimeout(function(){
      setPost ((posts)=>[ob, ...posts])
    },1000);//time out
  }
  useEffect( ()=>{
    let mounted = true;
    GetStatus()
    .then(items => {
        if(mounted) {
            setPost(items)
        }
    })
    return () => mounted = false;
},[])
  return (
    <>
      <Share props={addPost} />
    <div className={`${s.feed}`}>
      <div className={`${s.feedWrapper}`}>
         {search.map((p,index) => (
          <Post key={index} post={p} />
        ))}
        --------------------------------
        {posts.map((p) => (
          <Post key={p.id_st} post={p} />
        ))}
      </div>
    </div>
    </>
  );
}
