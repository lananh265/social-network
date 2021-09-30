import {useState, useEffect} from 'react';
import { Users } from '../data';

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
              {/* <div className="status">
      <div className="statusWrapper">
        <div className="statusTop">
          <div className="statusTopLeft">
            <span className="statusname">
              {Users.filter((u) => u.id_st === status?.connecter_id)[0].name}
            </span>
            <span className="statusDate">{status.date_st}</span>
          </div>
          {/* <div className="statusTopRight">
            <MoreVert />
          </div>  */}
         {/* </div>
        <div className="statusCenter">
          <span className="statusText">{status?.desc}</span>
        </div>
      </div> */}
    {/* </div>   */}
    {status}
        </div>
    )
}