import s from "./progress.module.css"
import React from "react";
import { useEffect } from "react";
import { Style } from "@material-ui/icons";
export default function Progress({done}){
	const [style, setStyle] = React.useState({});
	useEffect( ()=>{
        // console.log(done)
        const newStyle = {
                opacity: 1,
                width: `${done}%`
            }
            // console.log("cap nhat style")
            setStyle(newStyle);
      },[done])
	
	return (
		<div className={`${s.progress}`}>
			<div className={`${s.progressdone}`} style={style}>
			<span className={`${s.num}`}>{done}% </span>
			</div>
		</div>
	)
}