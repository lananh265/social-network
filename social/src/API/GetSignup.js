

export default function GetSignup(ob){
    
    const url = "http://localhost:4000/v0.1/signup?"+
    "username="+ob.username+
    "&password="+ob.password+
    "&email="+ob.email+
    "&phone="+ob.phone+
    "&name="+ob.name
    
    return fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        
      })
        .then(data => data.json())
     }
   
