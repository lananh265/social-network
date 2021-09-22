import { useState } from "react"
import PostLogin from "../../API/postLogin"
export default function Login({nhanToken}){
    const [username, setUserName] = useState("")
    const [password, setPassword] = useState("")

    // const dangNhap = () =>{
    //     nhanToken("abc")
    // }
    const dangNhap = async e =>{
        e.preventDefault();
        const ob = {
            username: username,
            password: password
        }
       let json = await PostLogin(ob)
     console.log(json)
       nhanToken (json)
    }
    return(
        <div>
            <h1>Day la Login</h1>
            <div>
                <form>
                    <label>
                        <p>Username: </p>
                        <input type="text" onChange={(e)=>{setUserName(e.target.value)}} value={username} />
                    </label>
                    <label>
                        <p>Password: </p>

                        <input type="password" onChange={(e)=>{setPassword(e.target.value)}} value={password} />
                    </label>
                </form>
                <button onClick={dangNhap}>Login</button>
                
            </div>
        </div>
    )
}