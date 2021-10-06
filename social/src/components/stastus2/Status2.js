import Post from "../post/Post";
import s from "./status2.module.css";
import { Posts } from "../dummyData"
import GetStatus from "../../API/GetStatus"
import { useState, useEffect } from "react";

export default function Status() {
  const [posts, setPost] = useState([])
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
    <div className={`${s.feed}`}>
      <div className={`${s.feedWrapper}`}>
        {posts.map((p) => (
          <Post key={p.id_st} post={p} />
        ))}
      </div>
    </div>
  );
}
