import React , { useState } from 'react';
import PropTypes from 'prop-types';

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
    <h1> Please Login</h1>
    <form onSubmit={handleSubmit}>
      <label>
        <p>Username</p>
        <input type="text"  onChange={e => setUserName(e.target.value)}/>
      </label>
      <label>
        <p>Password</p>
        <input type="password" onChange={e => setPassword(e.target.value)} />
      </label>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
    </div>
  )
}
