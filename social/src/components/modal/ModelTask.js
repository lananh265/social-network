// src: https://upmostly.com/tutorials/modal-components-react-custom-hooks
import React from 'react';
import s from './join.module.css'
import ReactDOM from 'react-dom';
import useModal from './useModal';
import { MoreVert } from "@material-ui/icons"
import TaskFinished from '../../API/TaskFinished';
import Deletetask from '../../API/deletetask';
import Transfer from '../../API/Transfer';
import Progress from '../progress/Progress';
export default function ModalTask({taskObj, reloadJoin}) {
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

const taskFinished = async(e,ob, reloadJoin,hide)=>{
  e.preventDefault();
  let obTask = {
      id_ta: ob.id_ta,
      id_st: ob.id_st
  }
  const json = await TaskFinished(obTask)
  // console.log(json)
  if(json.status){
      alert('Công việc hoàn tất')
  }else{
      alert('Xảy ra lỗi')
  }
  reloadJoin(hide)
}

const deleteTask = async(e, reloadJoin, hide, ob)=>{
  e.preventDefault();
  let obTask={
    target_id: ob.target_id,
    id_st: ob.id_st
  }
  console.log(obTask)
  const json = await Deletetask(obTask)
  console.log(json)
  if(json.status){//status = 1
    alert('Bạn muốn xóa công việc này!')
}else{ //status = 0
    alert('Xảy ra lỗi')
}
  //Xu li API
  //Cap nhat du lieu Task moi tu Server
  reloadJoin()
  //dong form
  hide()
}

const transfer = async(e, ob, reloadJoin, setStart, setDone)=>{
  e.preventDefault();
console.log(ob)
  let obTranfer={
    connecter_id: ob.connecter_id,
    target_id: ob.target_id,
    coin: ob.benefit
    
  }
  console.log(obTranfer)
  const json = await Transfer(obTranfer)
  console.log(json)
  if(json.status){
    alert(json.code)
}else{
    alert('Xảy ra lỗi')
}}
//   setStart(true)
//   alert ('ok!')
//   let obTranfer={
//     connecter_id: ob.connecter_id,
//     target_id: ob.target_id,
//     coin: ob.benefit
//   }
//   let json = await Transfer(obTranfer)
//   console.log(json)
//   if(json.status){
//     setDone(100)
//   }else{
//     alert('loi')
//   }
//   setTimeout(function(){
//     alert(json.code)
//   },1000)
// }


const chuyenTien= async(e, ob)=>{
  e.preventDefault();
  console.log(ob)
  let obTranfer={
    connecter_id: ob.connecter_id,
    target_id: ob.target_id,
    coin: ob.benefit
    
  }
  console.log(obTranfer)
let json = await Transfer(obTranfer)
console.log(json)
if(!json.status){
  alert("Chuyen tien thất bại")
}else{
  alert(json.code)
}

};


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
              {taskObj.date_start?
                  <button className={s.button_default} 
                   onClick={(e)=>{chuyenTien(e,taskObj)}}>Chuyen tien</button> :null
               } 
              </div>
              <div className={s.center}> 
                  <button className={s.button_default}
                   onClick={(e)=>deleteTask(e,reloadJoin,hide, taskObj)}>Xóa</button> 
              </div>
              <div className={s.right}> 
                  <button className={s.button_default} onClick={hide}>Đóng</button> 
              </div>

              {/* <div className={s.right}> 
                  <button className={s.button_default} onClick={(e)=>{transfer(e, taskObj)}}>Transfer</button> 
              </div> */}
              {/* <div className={s.right}>
              
              <button onClick={(e)=>{chuyenTien(e,taskObj)}}>Chuyen tien</button>
                </div> */}

          </div>
        </div>
      </div>
    </React.Fragment>, document.body
  ) : null;
