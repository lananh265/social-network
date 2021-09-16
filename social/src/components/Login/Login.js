import { useState } from "react"

async function loginUser(ob) {
    return fetch('http://localhost:4000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(ob)
    })
      .then(data => data.json())
   }

export default function Login({nhanToken}){
    const [userName, setUserName]= useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async e => {
        e.preventDefault();

        const ob = {
            username:userName,
            password:password
        }

        const token = await loginUser(ob);
        nhanToken(token);
      }


    return(
        <div>
            <h1>Day la trang Login</h1>
            <div>
            <form>
                <label>
                    <p>Username: </p>
                    <input type="text" onChange={(e)=>{setUserName(e.target.value)}} />
                </label>
                <br/>
                <label>
                    <p>Password: </p>
                    <input type="password" onChange={(e)=>{setPassword(e.target.value)}} />
                </label>
                </form>
                <button onClick={handleSubmit}>Login</button>
            </div>
        </div>
    )
}