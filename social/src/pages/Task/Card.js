import React, {useState} from 'react';
import EditTask from './EditTask'
import {
    Link
  } from "react-router-dom";
import s from "./Task.module.css"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import OrderTask from "../../API/ordertask"
import Checkbox from "@material-ui/core/Checkbox";
import TaskFinished from '../../API/TaskFinished';

 
const Card = ({taskObj, index, deleteTask, updateListArray, reloadJoin}) => {
   
    const [state, setState] = React.useState({
    complete: true,
        
      });
      const handleToggle = ({ target }) =>
      setState(s => ({ ...s, [target.name]: !s[target.name] }));



    const [modal, setModal] = useState(false);

    const colors = [
        {
            primaryColor : "#5D93E1",
            secondaryColor : "#ECF3FC"
        },
        {
            primaryColor : "#F9D288",
            secondaryColor : "#FEFAF1"
        },
        {
            primaryColor : "#5DC250",
            secondaryColor : "#F2FAF1"
        },
        {
            primaryColor : "#F48687",
            secondaryColor : "#FDF1F1"
        },
        {
            primaryColor : "#B964F7",
            secondaryColor : "#F3F0FD"
        }
    ]

    const toggle = () => {
        setModal(!modal);
    }

    const updateTask = (obj) => {
        updateListArray(obj, index)
    }

    // const handleDelete = () => {
    //     deleteTask(index)
    // }
    const orDer = async(e,ob)=>{
        e.preventDefault();
        const json = await OrderTask(ob)
        // console.log(json)
        if(json.status === 0){
            alert('Duyệt thất bai')
        }
        reloadJoin()
    }

    const taskFinished = async(e,ob)=>{
        e.preventDefault();
        let obTask = {
            id_ta: ob.id_ta,
            id_st: ob.id_st
        }
        const json = await TaskFinished(ob)
        // console.log(json)
        if(json.status){
            alert('Công việc hoàn tất')
        }else{
            alert('Xảy ra lỗi')
        }
        reloadJoin()
    }

    return (
        <div className = {`${s.cardwrapper}`}>
            <div className = {`${s.cardtop}`} style={{"backgroundColor": colors[index%5].primaryColor}}></div>
            <div className={`${s.taskholder}`}>
                <div className={`${s.top}`}>
                <span className = {`${s.cardheader}`} style={{"backgroundColor": colors[index%5].secondaryColor, "borderRadius": "10px", color:"red"}}>{taskObj.name}
                </span>
                {Object.keys(state).map(key => (
                        <input
                        className={s.chbox}
                        type="checkbox"
                        onChange={handleToggle}
                        key={key}
                        name={key}
                        checked={state[key]}
                        />
                    ))}
              </div>
             
                
                    {/* {Object.keys(state).map(key => (
                        <input
                        type="checkbox"
                        onChange={handleToggle}
                        key={key}
                        name={key}
                        checked={state[key]}
                        />
                    ))} */}
    
               
               {taskObj.start ? 
               <p className={s.date}>{taskObj.start}</p>
               :
               <p className={s.date}>Loading...</p>
               }



                {/* <p>{taskObj.start}</p> */}
                
                {/* <p className = "mt-3">{taskObj.Description}</p> */}
                {/* <p style={{color:"black"}}>{taskObj.content}</p> */}
                <textarea className={`${s.content}`}
                value= {taskObj.content}/>
                <div style={{"position": "absolute", "right" : "20px", "bottom" : "20px"}}>
                    {/* <i class="fa fa-pencil-square-o" aria-hidden="true" style={{"color" : colors[index%5].primaryColor, "cursor" : "pointer"}} onClick = {() => setModal(true)}></i>
                    &emsp;&emsp;
                    <i  class="fa fa-trash" aria-hidden="true" style = {{"color" : colors[index%5].primaryColor, "cursor" : "pointer"}} onClick = {handleDelete}></i> */}
                </div>
              <div className={`${s.nut}`}>
                <button className={`${s.butt}`}>
                    <Link to={{pathname: 'Message', 
                                state:{ id: taskObj.connecter_id,
                                        username: taskObj.username,
                                        email: taskObj.email,
                                        phone: taskObj.phone,
                                        name: taskObj.name,
                                        avatar: taskObj.avatar,
                                        show: false}}}>Liên hệ</Link>
                </button>

                {taskObj.start ? 
               null
               :
               
               
                <button className={`${s.butt}`} onClick={(e)=>{orDer(e,{
                    id_st: taskObj.id_st,
                    connecter_id: taskObj.connecter_id
                })}} >Duyệt</button>}

                {/* {taskObj.status_ta ? 
                } */}

<button className={`${s.butt}`} onClick={(e)=>{taskFinished(e,{
                            id_st: taskObj.id_st,
                            id_ta: taskObj.id_ta
                        })}} >Hoàn thành</button>
              </div>
        </div>
        <EditTask modal = {modal} toggle = {toggle} updateTask = {updateTask} taskObj = {taskObj}/>
     
    </div>
        
    );
};

export default Card;