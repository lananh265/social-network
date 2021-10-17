import GetInfor from "../../API/GetInfor"
import ShowTasks from "../../API/Showtasks"
import { useState,useEffect  } from "react"

import s from './Task.module.css'
import Sidebar from '../../components/sidebar/sidebar';

export default function Task(){
    const {token} = GetInfor()

    //luu ob tra ve khi tham gia dau thau
    const [join, setJoin] = useState([{}])
    // console.log(token)
    useEffect( ()=>{
        let mounted = true;
        let ob = {
          target_id: token.id
        }
        ShowTasks(ob)
        .then(items => {
            if(mounted) {
                
                setJoin(items)
               
            }
        })
        return () => mounted = false;
      },[])
      
      const list = join.map((e,index)=>{
          return <h3 key = {index}>
          Họ tên: &nbsp; {join[index].name}<br/>
          Tên Chủ Đề:&nbsp;  {join[index].content}<br/>
          </h3>
      })

    return(

        <>
        <div className={s.homeContainer}>
            <Sidebar />
            <div className={s.body}>
            <div className = {`${s.headertextcenter}`}>
                <h3><b>Danh Sách Những Người Đã Tham Gia<br/> Hỗ Trợ Bạn Tỷ</b></h3>
              
                
            </div>

            <div className = {`${s.taskcontainer}`}>
            {list}
            </div>

            {/* <CreateTask toggle = {toggle} modal = {modal} save = {saveTask}/> */}
            </div>

            <div className= {s.rightbar} >
                {/* <Rightbar/> */}
            </div>

            </div>
        </>
    );
};





