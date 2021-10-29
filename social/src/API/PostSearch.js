import { Url } from "./url"
export default function PostSearch(ob){

    return fetch(Url.api+'v0.1/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(ob)
      })
        .then(data => data.json())
     }
   
