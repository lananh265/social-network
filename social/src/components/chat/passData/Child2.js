import { useState } from "react"

export default function Child2({ham}){
    const [data, setData] = useState("lananh")
  const nhanProp=()=>{
      ham(data)

  }
    return(
        <div>
            <h1>Child2</h1>
            <button onClick={()=>{nhanProp()}}>Click</button>
        </div>
    )
}