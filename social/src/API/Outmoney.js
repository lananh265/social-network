import { Url } from "./url"
export default async function Outmoney(ob){

    return fetch(Url.api+'v0.1/outmoney', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(ob)
      })
        .then(data => data.json())
     
}