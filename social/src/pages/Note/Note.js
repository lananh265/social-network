import GetInfor from "../../API/GetInfor"
import ShowTasks from "../../API/Showtasks"
import React, {useEffect, useState} from 'react';

import CreateNote from './CreateNote';
import Card from './Card';
import s from './Note.module.css'
import Sidebar from '../../components/sidebar/sidebar';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'


const TodoList = () => {
    const {token} = GetInfor()

    //luu ob tra ve khi tham gia dau thau
    const [join, setJoin] = useState([{}])

    const [modal, setModal] = useState(false);
    const [taskList, setTaskList] = useState([])

    
    
    useEffect(() => {
        let arr = localStorage.getItem("taskList")
        console.log(JSON.parse(arr))
        if(arr){
            let obj = JSON.parse(arr)
            setTaskList(obj)
        }
    }, [])
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



    const deleteTask = (index) => {
        let tempList = taskList
        tempList.splice(index, 1)
        localStorage.setItem("taskList", JSON.stringify(tempList))
        setTaskList(tempList)
        window.location.reload()
    }

    const updateListArray = (obj, index) => {
        let tempList = taskList
        tempList[index] = obj
        localStorage.setItem("taskList", JSON.stringify(tempList))
        setTaskList(tempList)
        window.location.reload()
    }

    const toggle = () => {
        setModal(!modal);
    }

    const saveTask = (taskObj) => {
        let tempList = taskList
        tempList.push(taskObj)
        localStorage.setItem("taskList", JSON.stringify(tempList))
        setTaskList(taskList)
        setModal(false)
    }


    return (
        <>
        <div className={s.homeContainer}>
            <Sidebar />
            <div className={s.body}>
            <div className = {`${s.headertextcenter}`}>
                <h3><b>Công Việc Cần Thực Hiện</b></h3>
                <button className = "btn btn-primary mt-2" onClick = {() => setModal(true)} >Tạo Công Việc Tỷ</button>
            </div>

            {/* <div className = {`${s.taskcontainer}`}>
            {taskList && taskList.map((obj , index) => <Card taskObj = {obj} index = {index} deleteTask = {deleteTask} updateListArray = {updateListArray}/> )}
            </div> */}
             <div className = {`${s.taskcontainer}`}>
            {join && join.map((obj , index) => <Card taskObj = {obj} index = {index} deleteTask = {deleteTask} updateListArray = {updateListArray}/> )}
            </div>

            <CreateNote toggle = {toggle} modal = {modal} save = {saveTask}/>
            </div>

            <div className= {s.rightbar} >
                {/* <Rightbar/> */}
            </div>

            </div>
        </>
    );
};

export default TodoList;
