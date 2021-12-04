import GetInfor from "../../API/GetInfor"
import ShowTasks from "../../API/Showtasks"
import React, {useEffect, useState} from 'react';
import CreateNote from './CreateNote';
import Card from './Card';
import s from './Note.module.css'
import Sidebar from '../../components/sidebar/sidebar';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import ShowNotes from "../../API/Shownotes"

const Note  = () => {
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
    const reloadJoin =()=>{
        let ob = {
            connecter_id: token.id
          }
          ShowNotes(ob)
          .then(items => {
            setJoin(items)
          })
    }
    useEffect( ()=>{
        let mounted = true;
        let ob = {
          connecter_id: token.id
        }
        ShowNotes(ob)
        .then(items => {
            if(mounted) {
                
                setJoin(items)
               
            }
        })
        return () => mounted = false;
      },[token.id])



    const deleteTask= (index) => {
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
                <h2>Danh Sách Công Việc Bạn Được Tín Nhiệm</h2>
                {/* <button className = "btn btn-primary mt-2" onClick = {() => setModal(true)} >Tạo Công Việc</button> */}
            </div>

            {/* <div className = {`${s.taskcontainer}`}>
            {taskList && taskList.map((obj , index) => <Card taskObj = {obj} index = {index} deleteTask = {deleteTask} updateListArray = {updateListArray}/> )}
            </div> */}
             <div className = {`${s.taskcontainer}`}>
            {join && join.map((obj , index) => <Card taskObj = {obj} key={index} index = {index} deleteTask = {deleteTask} updateListArray = {updateListArray} reloadJoin={reloadJoin}/> )}
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

export default Note ;






