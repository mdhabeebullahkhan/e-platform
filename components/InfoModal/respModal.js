import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Modal } from 'react-responsive-modal';

const App = (props) => {
    const {children, open, setOpen} = props;
 

//    const onOpenModal = () => {
//     openModal(!open)  //This will negate the previous state
// };

const onCloseModal = () => {
  setOpen(!open) //This will negate the previous state
};

  
  
    return (
      <>
        <Modal open={open} classNames="react-responsive-modal-modal" onClose={() => onCloseModal(false)}>
          
          
          <div className="content">{children}</div>
          
        </Modal>
      </>
    );
  };
  
  export default App;