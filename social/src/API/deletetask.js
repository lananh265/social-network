import { Url } from "./url"
export default function Deletetask(ob){

    return fetch(Url.api+'v0.1/deletetask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(ob)
      })
        .then(data => data.json())
     }
   
