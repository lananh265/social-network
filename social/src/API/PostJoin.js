import { Url } from "./url"
export default async function PostJoin(ob){

    return fetch(Url.api+'v0.1/jointask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(ob)
      })
        .then(data => data.json())
     
}