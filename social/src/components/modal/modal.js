import React from 'react';
import ReactDOM from 'react-dom';
import s from './join.module.css'
const joinTask = ({hide})=>{
    alert("Đang xử lý join Task")
    hide()
}
const Modal = ({ isShowing, hide, ob }) => isShowing ? ReactDOM.createPortal(
  <React.Fragment>
    <div className={s.modal_overlay}/>
    <div className={s.modal_wrapper} aria-modal aria-hidden tabIndex={-1} role="dialog">
      <div className={s.modal}>
        <div className={s.top}> 
          Bạn muốn kiếm tiền thưởng {ob.benefit} từ {ob.name}
          {ob.content}
        </div>
        <div className={s.down}> 
            <div className={s.left}> 
                <button className={s.button_default} onClick={()=>{joinTask({hide})}}>Đồng Ý</button> 
            </div>
            <div className={s.right}> 
                <button className={s.button_default} onClick={hide}>Đóng</button> 
            </div>
        </div>
      </div>
    </div>
  </React.Fragment>, document.body
) : null;

export default Modal;