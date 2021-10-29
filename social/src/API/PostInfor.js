import { Url } from "./url"
export default function PostInfor(ob){

    return fetch(Url.api+'v0.1/changeinfor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(ob)
      })
        .then(data => data.json())
     }
   
