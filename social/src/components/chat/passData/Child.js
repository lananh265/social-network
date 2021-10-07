import { useState } from "react"

export default function Child({ham}){
    const [number, setNumber] = useState(2)
    const nhanProp =()=>{
        ham(number)
    }
    
    return(
        <div>
            <h1>Child</h1>
            <button onClick={()=>{nhanProp()}}>Tang them</button>
            
        </div>
    )
}