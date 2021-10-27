
export default function GetUser(ob){

    return fetch('http://localhost:4000/v0.1/getuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(ob)
      })
        .then(data => data.json())
     }
   
