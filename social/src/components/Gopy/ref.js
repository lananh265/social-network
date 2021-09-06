import { useState , useRef} from "react";



export default function Ref(){
    const [noiDung, setnoiDung] = useState("");
    console.log("render lai component");
    let dem = useRef(0);
    const xinchao = ()=>{
        setnoiDung (noiDung + "-abc-")
        alert(noiDung)
        dem.current ++;
        console.log(dem.current);
    }
    return(
        <div>
            <h1>Day la Ref</h1>
            <button onClick = {xinchao}>Xin chao</button>
        </div>
    )
}