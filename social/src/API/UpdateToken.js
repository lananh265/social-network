import { Url } from "./url"
export default async function UpdateToken(ob){

    return fetch(Url.api+'v0.1/updatetoken', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(ob)
      })
        .then(data => data.json())
     
}