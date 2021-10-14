// src: https://upmostly.com/tutorials/modal-components-react-custom-hooks
import React from 'react';
import s from './join.module.css'
import Modal from "./modal";
import useModal from './useModal';
import { MoreVert } from "@material-ui/icons"
// const ob = {
//   name: 'ty',
//   id: 1,
//   status: 'i love you 3000'
// }
const Join = ({ob}) => {
  const {isShowing, toggle} = useModal();

  return (
    <div className={s.App}>
      {/* <button className={s.button_default} onClick={toggle}>Show Modal</button> */}
      <MoreVert onClick={toggle}/>
      <Modal
        isShowing={isShowing}
        hide={toggle}
        ob={ob}
      />
    </div>
  );
};

export default Join;