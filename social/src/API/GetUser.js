import { Url } from "./url"
export default function GetUser(ob){

    return fetch(Url.api+'v0.1/getuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(ob)
      })
        .then(data => data.json())
     }
   
