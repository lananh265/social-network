import { Url } from "./url"
export default function PostShare(ob){

    return fetch(Url.api+'v0.1/postshare', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(ob)
      })
        .then(data => data.json())
     }
   
