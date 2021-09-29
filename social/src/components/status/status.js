import {useState, useEffect} from 'react';

export default function Status(){
    const [listStatus, setListStatus] = useState([{},{}])

    const status = listStatus.map( (element,index) =>{
        return <h3 key={index}>{element.id_st }{' '}{element.connecter_id}{element.content}{element.date_st}{element.benefit}{element.name} </h3>
    })  

    useEffect( ()=>{
        const url="http://localhost:4000/status"
        fetch(url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
              },
        })
        .then(status=>status.json())
        .then((statusJson)=>{
            setListStatus(statusJson)
            console.log(statusJson)
        })
        .catch((e)=>{
            console.log(e)
        })
    },[])
    return(
        <div>
            <h1>Day la trang load status</h1>
               {status}
        </div>
    )
}