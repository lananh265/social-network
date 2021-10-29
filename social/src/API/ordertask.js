import { Url } from "./url"
export default function Ordertask(ob){

    return fetch(Url.api+'v0.1/ordertask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(ob)
      })
        .then(data => data.json())
     }
   
