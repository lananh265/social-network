
export default async function ShowTasks(ob){

    return fetch('http://localhost:4000/v0.2/showtasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(ob)
      })
        .then(data => data.json())
     
}