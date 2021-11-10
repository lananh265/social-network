import { Url } from "./url"
export default function TaskConfirm(ob){

    return fetch(Url.api+'v0.1/taskconfirm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(ob)
      })
        .then(data => data.json())
     }
   
