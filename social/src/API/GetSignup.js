import { Url } from "./url"
export default function GetSignup(ob){
    
    const url = Url.api+"v0.1/signup?"+
    "username="+ob.username+
    "&password="+ob.password+
    "&email="+ob.email+
    "&phone="+ob.phone+
    "&name="+ob.name+
    "&gender="+ob.gender
    
    return fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        
      })
        .then(data => data.json())
     }
   
