import { Url } from "./url"
export default async function ListCashOut(){
    const url =Url.api+"v0.1/listcashout"
    return fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(data => data.json())
}