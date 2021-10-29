import { Url } from "./url"
export default function GetMess(ob){

  return fetch(Url.api+'v0.1/getMess', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(ob)
    })
      .then(data => data.json())
   }
 



   