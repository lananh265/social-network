import { Url } from "./url"
export default async function ShowTasks(ob){

    return fetch(Url.api+'v0.2/showtasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(ob)
      })
        .then(data => data.json())
     
}