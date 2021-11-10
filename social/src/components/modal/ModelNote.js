// src: https://upmostly.com/tutorials/modal-components-react-custom-hooks
import React from 'react';
import s from './join.module.css'
import ReactDOM from 'react-dom';
import useModal from './useModal';
import { MoreVert } from "@material-ui/icons"
import TaskConfirm from '../../API/TaskConfirm';
import DeleteNote from '../../API/deletenote' 
export default function ModalNote({taskObj, reloadJoin}) {
  const {isShowing, toggle} = useModal();

  return (
    <div className={s.App}>
      <MoreVert onClick={toggle}/>
      <Modal
        isShowing={isShowing}
        hide={toggle}
        taskObj={taskObj}
        reloadJoin={reloadJoin}
      />
    </div>
  );
};

const taskConfirm = async(e,ob, reloadJoin,hide)=>{
  e.preventDefault();
  let obTask = {
      id_ta: ob.id_ta,
      id_st: ob.id_st
  }
  const json = await TaskConfirm(obTask)
  // console.log(json)
  if(json.status){
      alert('Công việc hoàn tất')
  }else{
      alert('Xảy ra lỗi')
  }
  reloadJoin(hide)
}

const deletenote = async(e, reloadJoin, hide, ob)=>{
  e.preventDefault();
  let obTask={
    connecter_id: ob.connecter_id,
    id_ta: ob.id_ta
  }
  console.log(obTask)
  const json = await DeleteNote(obTask)
  console.log(json)
  if(json.status){
    alert('Bạn muốn xóa công việc này!')
}else{
    alert('Xảy ra lỗi')
}
  //Xu li API
  //Cap nhat du lieu Task moi tu Server
  reloadJoin()
  //dong form
  hide()
}


const Modal = ({ isShowing, hide, taskObj, reloadJoin }) => isShowing ? ReactDOM.createPortal(
    <React.Fragment>
      <div className={s.modal_overlay}/>
      <div className={s.modal_wrapper} aria-modal aria-hidden tabIndex={-1} role="dialog">
        <div className={s.modal}>
          <div className={s.top}> 
            Xác nhận tùy chọn của bạn cho: {taskObj.name}{''}<br/>{taskObj.start}
            
          </div>
          <div className={s.down}> 
              <div className={s.left}> 
                  <button className={s.button_default} 
                  onClick={(e)=>taskConfirm(e,taskObj,reloadJoin,hide)}>Hoàn thành</button> 
              </div>
              <div className={s.center}> 
              {taskObj.status_ta && taskObj.confirm_st ?
              null:
                  <button className={s.button_default}
                   onClick={(e)=>deletenote(e,reloadJoin,hide, taskObj)}>Xóa</button> 
               } </div>
              <div className={s.right}> 
                  <button className={s.button_default} onClick={hide}>Đóng</button> 
              </div>
          </div>
        </div>
      </div>
    </React.Fragment>, document.body
  ) : null;
