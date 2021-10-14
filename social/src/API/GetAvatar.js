export default async function GetAvatar(ob){
    const url ="http://localhost:4000/v0.1/avatar?id="+ob.id
    return fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(data => data.json())
}