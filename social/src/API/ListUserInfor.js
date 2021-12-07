import { Url } from "./url"
export default async function ListUserInfor(){
    const url =Url.api+"v0.1/listuser"
    return fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(data => data.json())
}