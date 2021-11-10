import { Url } from "./url"
export default async function PostJoin(ob){

    return fetch(Url.api+'v0.2/ordertask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(ob)
      })
        .then(data => data.json())
     
}