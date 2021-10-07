import { useState } from "react"
import Child from "./Child";


export default function Parent(){
    const[so, setSo]= useState(0);
    //truyen Prop
    const tangDan =(a)=>{
        setSo(so +a);
    }
    return(
       <div>
            <h1>Parent</h1>
            <p>Gia tri ban dau {so}</p>
            <Child ham={tangDan} />
           
        </div>
    )
}