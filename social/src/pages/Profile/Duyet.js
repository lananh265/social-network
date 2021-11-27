import { useState } from "react"

const json = [
    {
        id: '1',
        name: 'Tỷ',
        amount: '10000',
        status: 0
    },
    {
        id: '2',
        name: 'Nhi',
        amount: '50000',
        status: 0
    },
    {
        id: '3',
        name: 'Lộc',
        amount: '30000',
        status: 0
    },
]

const json2 = [
    {
        id: '1',
        name: 'Tỷ',
        amount: '10000',
        status: 0
    },
    {
        id: '2',
        name: 'Nhi',
        amount: '50000',
        status: 0
    },
    {
        id: '3',
        name: 'Lộc',
        amount: '30000',
        status: 1
    },
]
export default function Duyet(){
    const [list, setList] = useState(json)
    const duyet = (e,index)=>{
        setList(json2)
    }
    const listCheck = list.map( (e,index)=>{
        return(
            <div style={{display:'flex', justifyContent:'space-between',
                width:'600px',   margin:'10px'}}>
                <div>{e.id}</div>
                <div>{e.name}</div>
                <div>{e.amount}</div>
                <div> 
                    { list[index].status == 1 ?
                        <>Đã Duyệt</> :
                        <button onClick={()=>duyet(e, index)}>Duyệt</button>
                    }
                </div>
            </div>
        )
    })
    return(
        <div>
            <h1>Danh sách yêu cầu rút tiền</h1>
            <div style={{display:'flex', justifyContent:'space-between',
                width:'600px',  margin:'10px'}}>
                <div>ID</div>
                <div>Name</div>
                <div>Số tiền</div>
                <div>Duyệt</div>
            </div>
            {listCheck}
        </div>
    )
}