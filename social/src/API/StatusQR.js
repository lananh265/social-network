import { Url } from "./url"
export default async function StatusQR(ob){

    return fetch(Url.api+'v0.1/statusqr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(ob)
      })
        .then(data => data.json())
     
}