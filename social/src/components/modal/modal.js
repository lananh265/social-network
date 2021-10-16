import React from 'react';
import ReactDOM from 'react-dom';
import s from './join.module.css'
import PostJoin from '../../API/PostJoin';
const joinTask = async (e,{hide,ob})=>{
    e.preventDefault();
    const json = await PostJoin(ob)
    console.log(json)
    if(json.status){
      alert("Đăng kí tham gia thành công. "+ ob.name+
            " sẽ inbox bạn trong thời gian sớm nhất")
    }else{
      alert("Không đăng kí được")
    }
    hide()
}
const Modal = ({ isShowing, hide, ob }) => isShowing ? ReactDOM.createPortal(
  <React.Fragment>
    <div className={s.modal_overlay}/>
    <div className={s.modal_wrapper} aria-modal aria-hidden tabIndex={-1} role="dialog">
      <div className={s.modal}>
        <div className={s.top}> 
          Bạn muốn hỗ trợ : {ob.name} &nbsp;&ndash; đề tài: {ob.content} &ndash; &#36; {ob.benefit}  
          
        </div>
        <div className={s.down}> 
            <div className={s.left}> 
                <button className={s.button_default} onClick={(e)=>{joinTask(e,{hide,ob})}}>Tham gia</button> 
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