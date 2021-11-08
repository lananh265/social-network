import { Url } from "./url"
export default function Transfer(ob){

    return fetch(Url.api+'v0.1/transfer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(ob)
      })
        .then(data => data.json())
     }
   
