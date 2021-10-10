// import { useState } from "react"

import { useState } from "react"

// export default function Thieunhi(){
//     //const [ten_cua_state, set_ten_cua_state] = useState(gia_tri_ban_dau)
//     const[id, setID] = useState(0) //so
//     //const[dl, setDL] = useState("a") //chuoi " "
//     // const[id, setID] = useState({status:"ok"}) //object { }
//     // const[id, setID] = useState([2]) //mang []
    
    
//     // const[dl, setDL] = useState("") //tao state "lan anh"
     
//     // const[dl, setDL] = useState("") //tao chuoi rong
//     // const ob={
//     //     name:"lan anh",
//     //     old: 18
//     // }
//     // const [data, setData] = useState([{},{}]) //tao state 1 mang co 2 ob rong
//     // const [data, setData] = useState(["lan anh","ty"]) //tao state 1 mang co
//     // //2 chuoi lan luot la "ty" va "lan anh"
//     // var dl = ""
//     // function setDL (dulieu){
//     //     dl = dulieu
//     //     return dl
//     // }
//     // setDL("lan anh")
//     // console.log(id)
//     const[dl, setDL] = useState("")
//     const thaydoi =()=>{
//         setDL("lan anh");
//     }
//     return(
//         <div>
//             <h1>Thieu nhi</h1>
//             <p>{dl}</p>
//             <button onClick={()=>{thaydoi()}}>click</button>
//         </div>
//     )
// }




export default function Thieunhi(){
    // const so = 0
    // const [id, setID] = useState(so) // truyen param (so) vao
    // const [id, setID] = useState(0)

    // const dulieu = "lan anh"
    // const [name, setName] = useState(dulieu)

    // const dulieu = ["lan anh" , "ty"]
    // const [name, setName] = useState(dulieu)
    // const thaydoi = ()=>{

    // }

// const e ={id:1, name:"la"}
// const [a, setA] = useState(e)
// const thayDoi=()=>{
//     setA ({id:2, name:"ty"})
// }

// const [a, setA] =useState([{id:1, name:"la"}])

// const thayDoi=()=>{
//     setA ([{id:2, name:"ty"}])
// }


const [a, setA] = useState([{id:10, name:"la"}])

 const themOb=()=>{
     const b={id:1, name:"ty"}
    setA (a=>[...a,b])
 
}
// const Hienthi = a.map((e)=>{
// return({id:e.id, name:e.name})
// })
// console.log(hienthi)
// const a =[{id:1,name:"Ty"}]
// const listSo = a.map((e)=>{
//     return(
//        <h1>{ e.id}{e.name}</h1>)
// })

const list= a.map((e)=>{
return(<h1>{e.id}{e.name}</h1>)
})
    return(
        <div>
           {/* {a[0].id}{a[0].name} */}
         {/* {a[0].id}{a[0].name}   */}
          {list}
        <button onClick={()=>{themOb()}}>Nhan</button>  
         {/* <button onClick={()=>{thayDoi()}}>Click</button>  */}

         </div>
    )
 }

