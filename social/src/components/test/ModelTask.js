// src: https://upmostly.com/tutorials/modal-components-react-custom-hooks
import React, { useState, useEffect } from 'react';
import s from './join.module.css'
import ReactDOM from 'react-dom';
import useModal from './useModal';
import { MoreVert } from "@material-ui/icons"
import TaskFinished from '../../API/TaskFinished';
import DeleteTask from '../../API/DeleteTask';
import Progress from '../Progress/Progress'
import Transfer from '../../API/Transer';
export default function ModalTask({taskObj,reloadJoin}) {
  const {isShowing, toggle} = useModal();
  const [done, setDone] = useState(90);
  const [start, setStart] = useState(false)
  useEffect(() => {
    if(start){
      done < 90 && setTimeout(() => setDone(done + 10), 400);
    }
  }, [done,start]);
  return (
    <div className={s.App}>
      <MoreVert onClick={toggle}/>
      <Modal
        isShowing={isShowing}
        hide={toggle}
        taskObj={taskObj}
        reloadJoin={reloadJoin}
        done = {done}
        setDone= {setDone}
        setStart = {setStart}
        start = {start}
      />
    </div>
  );
};

const taskFinished = async(e, ob, reloadJoin, hide)=>{
  e.preventDefault();
  let obTask = {
      id_ta: ob.id_ta,
      id_st: ob.id_st
  }
  const json = await TaskFinished(obTask)
  console.log(json)
  if(json.status){
      alert('Công việc hoàn tất')
  }else{
      alert('Xảy ra lỗi')
  }
  reloadJoin()
  hide()
}

const deleteTask = async(e, reloadJoin, hide, ob)=>{
    e.preventDefault();
    let obTask = {
        target_id: ob.target_id,
        id_st: ob.id_st
      }
    //Xu ly API
    const json = await DeleteTask(obTask)
    if(json.status){
      alert('Xóa thành công')
    }else{
        alert('Xảy ra lỗi')
    }
    //Cat nhat du lieu task moi tu server
    reloadJoin()
    //dong form lai
    hide()
}

const transfer = async(e, ob, reloadJoin, setStart, setDone)=>{
  e.preventDefault()
  setStart(true)
  let obTransfer = {
    connecter_id: ob.target_id,
    target_id: ob.connecter_id,
    coin: ob.benefit
  }
  let obTask = {
    id_ta: ob.id_ta,
    id_st: ob.id_st
  }
  let json =  await Transfer(obTransfer)
  console.log(json)
  if(json.status){
    let finished = await TaskFinished(obTask)
    if(finished.status){
      setDone(100)
      setTimeout( function(){
        alert(json.code)
      },500)
    }else{
      alert("Chuyển tiền xong nhưng xác nhận cv thất bại")
    }
    
  }else{
    alert("co lỗi xảy ra!")
  }
  reloadJoin()
}
const Modal = ({ isShowing, hide, taskObj, reloadJoin, done,
                setDone, setStart, start }) => isShowing ? ReactDOM.createPortal(
    <React.Fragment>
      <div className={s.modal_overlay}/>
      <div className={s.modal_wrapper} aria-modal aria-hidden tabIndex={-1} role="dialog">
        <div className={s.modal}>
          <div className={s.top}> 
            Công việc mà bạn giao cho: {taskObj.name}{''}
            <br/>Ngày: {taskObj.start}
            <br/>Giá trị: {taskObj.benefit} coin
            { taskObj.confirm_st ?
              <div className={s.text_done}>Đã hoàn thành</div> : null
            }
          </div>
          <div className={s.down}> 
              {/* {!taskObj.start ? <h4>rong</h4> : <h4>co ngay</h4>} */}
              <div className={s.left}> 
                  { taskObj.confirm_st && taskObj.status_ta && taskObj.start? 
                    null :
                    <>{!taskObj.start || start ? null :
                    // <button className={s.button_default} 
                    //   onClick={(e)=>taskFinished(e,taskObj,reloadJoin,hide)}>Hoàn Thành
                    // </button> 
                    <button className={s.button_default} 
                        onClick={(e)=>transfer(e,taskObj,reloadJoin, setStart, setDone)}>
                          Thưởng
                    </button> 
                    }
                    </>
                  } 
              </div>
              <div className={s.center}> 
                <button className={s.button_default} 
                    onClick={(e)=>deleteTask(e, reloadJoin, hide, taskObj)}>Xóa</button>
              </div>
              <div className={s.right}> 
                  <button className={s.button_default} onClick={hide}>Đóng</button> 
              </div>
          </div>
          <div className={s.progress_down}>
            { start &&
              <Progress done={done}/>
            }
            
          </div>
        </div>
      </div>
    </React.Fragment>, document.body
  ) : null;
  