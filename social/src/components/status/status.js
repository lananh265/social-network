import {useState, useEffect} from 'react';
import s from "./status.module.css";

export default function Status(){
    const [listStatus, setListStatus] = useState([{},{}])

    // const status = listStatus.map( (element,index) =>{
    //     return (
    //     <div>
    //     <h3 key={index}>{element.id_st }{' '}{element.connecter_id}{element.content}{element.date_st}{element.benefit}{element.name} </h3>
    //     </div>
    //     )
    // }) 
    
    const status = listStatus.map( (element,index) =>{
      return (
        <div key={index} className={`${s.postWrapper}`}>
                <div className={`${s.postTop}`}>
                    <div className={`${s.postTopLeft}`}>
                    <h3 key={index}>{element.id_st }{' '}{element.name}</h3>
                    </div>
                    <div className={`${s.postDate}`}>
                    <h3 key={index}>{' '}{element.date_st}</h3>
                    </div>
                    <div className={`${s.postBenifit}`}>
                    <h3 key={index}>{' '}{element.benefit}</h3>
                    </div>
                </div>

                <div className={`${s.postContent}`}>
                <h3 key={index}>{' '}{element.content}</h3>
                </div>
            </div>
      )
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
        <div className={s.statusContainer}>
        {status}
        </div>
    )
}