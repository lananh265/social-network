
export default function GetSignup(){
    
    const url = "http://localhost:4000/v0.1/status"
    
    return fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        
      })
        .then(data => data.json())
     }
   
