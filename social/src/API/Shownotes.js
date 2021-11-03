import { Url } from "./url"
export default function ShowNotes(ob){

    return fetch(Url.api+'v0.1/shownotes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(ob)
      })
        .then(data => data.json())
     }
   
