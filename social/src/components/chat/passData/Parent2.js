import { useState } from "react"
import Child2 from "./Child2"

export default function Parent2(){
    const [dl, setDl] = useState("la")
    const thaydoi = (a)=>{
        setDl(a)
    }
    return(
        <div>l
            <h1>Parent2</h1>
            {dl}
            <Child2 ham={thaydoi} />
        </div>
    )
}