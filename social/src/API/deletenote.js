import { Url } from "./url"
export default function DeleteNote(ob){

    return fetch(Url.api+'v0.1/deletenote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(ob)
      })
        .then(data => data.json())
     }
   
