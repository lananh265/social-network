

import {useState, useEffect } from 'react'

export default function Chat(){

  const [ob, setOB] = useState({id:2, name:"ty"})
  const [array, setArray] =useState([{id:2, name:"ty"},{id:3, name:"anh"}])

  return(
    <div>
      <h1>Đây là Chat </h1>
      <h3>{ob.name}{ob.id}</h3>
      <h3>{array[1].name}</h3>
    </div>
  )
}