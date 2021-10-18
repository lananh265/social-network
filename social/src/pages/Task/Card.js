

import React, {useState} from 'react';
import EditNote from './EditTask'

import s from "./Task.module.css"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
const Card = ({taskObj, index, deleteTask, updateListArray}) => {
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

    const handleDelete = () => {
        deleteTask(index)
    }

    return (
        <div className = {`${s.cardwrapper}`}>
            <div className = {`${s.cardtop}`} style={{"background-color": colors[index%5].primaryColor}}></div>
            <div className={`${s.taskholder}`}>
                <span className = {`${s.cardheader}`} style={{"background-color": colors[index%5].secondaryColor, "border-radius": "10px"}}>{taskObj.name}</span>
                <p className = "mt-3">{taskObj.content}</p>

                <div style={{"position": "absolute", "right" : "20px", "bottom" : "20px"}}>
                    {/* <i class="fa fa-pencil-square-o"  style={{"color" : colors[index%5].primaryColor, "cursor" : "pointer"}} onClick = {() => setModal(true)}></i>
                    &emsp;&emsp; */}
                    <i  class="fa fa-trash"  style = {{"color" : colors[index%5].primaryColor, "cursor" : "pointer"}} onClick = {handleDelete}></i>
                </div>
        </div>
        <EditNote modal = {modal} toggle = {toggle} updateTask = {updateTask} taskObj = {taskObj}/>
     
        </div>
        
    );
};

export default Card;