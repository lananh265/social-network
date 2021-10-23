
export default function GetMess(ob){

  return fetch('  http://localhost:4000/v0.1/getMess', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(ob)
    })
      .then(data => data.json())
   }
 



   