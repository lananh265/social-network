
export default function PostShare(ob){

    return fetch('http://localhost:4000/v0.1/postshare', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(ob)
      })
        .then(data => data.json())
     }
   
