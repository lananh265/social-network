

import {useState, useEffect } from 'react'

export default function Chat(){

  const [ob, setOB] = useState({id:2, id:"ty"})
  const [array, setArray] =useState([{id:2, id:"ty"},{id:3, id:"anh"}, {id:4, id:"nhi"}])
  
  const listTN = array.map( (e, index)=>{
      return <h3 key ={index}> {e.id} {e.name}</h3>

  })
  return(
    <div>
      <h1>Đây là Chat </h1>
     {listTN }
    </div>
  )
}