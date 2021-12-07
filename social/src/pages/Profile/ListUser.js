import { useState, useEffect } from "react"
import ListUserInfor from "../../API/ListUserInfor"

export default function ListUser(){
    const [ listUser, setListUser] = useState([{}])

    const getListUser = async()=>{
        ListUserInfor()
        .then(items=>{
            console.log(items)
            setListUser(items)
        })
    }

    useEffect( ()=>{
        let mounted = true;
        if(mounted){
            getListUser()
        }
      return () => mounted = false
    },[])

    const listUserInfor = listUser.map( (e,index)=>{
        return(<div key={index}>
          {e.id} {e.name} {e.phone} {e.balance} 
        </div>)
      })

    return(
        <div>
            <h5>Danh sách thông tin người dùng</h5>
            {listUserInfor}
        </div>
    )
}