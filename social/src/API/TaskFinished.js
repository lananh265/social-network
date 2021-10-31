import { Url } from "./url"
export default function TaskFinished(ob){

    return fetch(Url.api+'v0.1/taskfinished', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(ob)
      })
        .then(data => data.json())
     }
   
