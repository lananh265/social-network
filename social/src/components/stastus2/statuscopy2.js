import Post from "../post/Post";
import s from "./status2.module.css";
import { Posts } from "../dummyData"
import GetStatus from "../../API/GetStatus"
import { useState, useEffect } from "react";
import useToken from "../../API/useToken";

export default function Status() {
  const [posts, setPost] = useState([])
  const [newPost, setNewPost] = useState("")

const listPost = posts.map((p) =>(
    <Post key={p.id_st} post={p} />
))

const postStatus = () =>{
    const url = "http://localhost:4000/v0.1/status"
    const json = {
        id_st: token.id,
        desc: newPost
    }
    
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
    <div className={`${s.feed}`}>
      <div className={`${s.feedWrapper}`}>
        {posts.map((p) => (
          <Post key={p.id_st} post={p} />
        ))}
      </div>
    </div>
  );
}
