import { Url } from "./url"
export default async function License(ob){

    return fetch(Url.api+'v0.1/license', {
        method: 'POST',
        body: (ob)
      })
        .then(data => data.json())
     
}