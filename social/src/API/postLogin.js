import { Url } from "./url"
export default function PostLogin(ob){

    return fetch(Url.api+'v0.1/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(ob)
      })
        .then(data => data.json())
     }
   
