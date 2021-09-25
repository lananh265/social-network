import { useState } from "react";
import Home from "./pages/Home";
import Welcome from "./pages/Welcome2";
import useToken from "./API/useToken";
export default function App() {
  // const [token, setToken] = useState("")

const {token, luuToken} = useToken()

  if(!token){
    return <Welcome layToken={luuToken} /> //props:layToken
  }
  return (
 <div>
   <Home />

 </div>

);
}



