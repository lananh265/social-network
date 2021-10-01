
import { useState } from "react";

// import "./post.css"
export default function Post(){
    return(
    <div>
        <div className="status">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <h1>name</h1>
                    </div>
                    <div className="postDate">
                        <h1>Date</h1>
                    </div>
                    <div className="postBenifit">
                        <h1>benefit</h1>
                    </div>
                </div>

                <div className="postContent">
                    <h1>Content</h1>
                </div>
            </div>
     
        </div>  
    </div>
    )
}