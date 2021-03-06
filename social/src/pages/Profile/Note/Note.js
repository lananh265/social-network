import s from "./Note.module.css"
import {useEffect, useState} from 'react';
import ShowTasks from "../../../API/Showtasks"
export default function Note(){
    const [role, setRole] = {"role": 0}
    const [join, setJoin] = useState([{}])
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
    useEffect( ()=>{
        let mounted = true;
        let ob = {
          target_id: 2
        }
        ShowTasks(ob)
        .then(items => {
            if(mounted) {
                setJoin(items)
                // console.log(items)
            }
        })
        return () => mounted = false;
      },[])
    const ItemStart = ({taskObj, index})=>(
        <div>
            { taskObj.status_ta? 
            <div className = {`${s.cardwrapper}`}>
            <div className = {`${s.cardtop}`} 
                style={{"backgroundColor": colors[index%5].primaryColor}}>
            </div>
            <div className={`${s.taskholder}`}>
                <span className = {`${s.cardheader}`} 
                        style={{"backgroundColor": colors[index%5].secondaryColor, 
                        "borderRadius": "10px", color:"red"}}>{taskObj.name}{' '}
                        <input type="checkbox" defaultChecked="true"/>
                </span>
                {taskObj.start ? 
                        <p className={s.date}>{taskObj.start}</p>:
                        <p className={s.date}>Loading ...</p>
                }
                <textarea className={s.content} value={taskObj.content} spellCheck="false"/>   
                
                <div className={s.nut} >
                    <button>Li??n h???</button>
                </div>
            </div>
            </div>
            :
            <div className = {`${s.cardwrapper}`}>
                <div className = {`${s.cardtop}`} 
                    style={{"backgroundColor": colors[index%5].primaryColor}}>
                </div>
                <div className={`${s.taskholder}`}>
                    <span className = {`${s.cardheader}`} 
                            style={{"backgroundColor": colors[index%5].secondaryColor, 
                            "borderRadius": "10px", color:"red"}}>{taskObj.name}{' '}
                            {/* <input type="checkbox" defaultChecked="true"/> */}
                    </span>
                    {taskObj.start ? 
                            <p className={s.date}>{taskObj.start}</p>:
                            <p className={s.date}>Loading ...</p>
                    }
                    <textarea className={s.content} value={taskObj.content} spellCheck="false"/>   
                    
                    <div className={s.nut} >
                        <button>Li??n h???</button>
                        {taskObj.date_start ? 
                            <button>Ho??n th??nh</button> :
                            <button>Duy???t</button>
                        }
                        
                    </div>
                </div>
            </div>
            }
        </div>

    )
   

    return(
        <div className={s.homeContainer}>
        <div className= {s.leftbar} >
        </div>
        
        <div className={s.body}>
            <div className = {`${s.headertextcenter}`}>
                <h3><b>Danh s??ch nh???ng ng?????i tham gia c??ng vi???c c???a b???n</b></h3>
            </div>

            <div className = {`${s.taskcontainer}`}>
                {join && join.map((obj , index) => 
                <ItemStart taskObj = {obj} index = {index} key={index}/> 
                )}
            </div>

        </div>

        <div className= {s.rightbar} ></div>

        </div>
    )
}