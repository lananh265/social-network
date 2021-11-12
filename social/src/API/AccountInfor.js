import { Url } from "./url"
export default async function AccountInfor(ob){

    return fetch(Url.api+'v0.1/accountinfor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(ob)
      })
        .then(data => data.json())
     
}