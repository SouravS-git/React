import {forwardRef, useEffect, useImperativeHandle, useRef} from 'react';
import { createPortal } from 'react-dom';

const Modal = forwardRef(function Modal({ children, open, onClose }, ref) {
  const dialog = useRef();

  /*useImperativeHandle(ref, () => {
    return {
      open: () => {
        dialog.current.showModal();
      },
      close: () => {
        dialog.current.close();
      },
    };
  });*/

  useEffect(() => {
    // If code doesn't work here without this useEffect, because the code will try to get executed before establishing the connection between the ref and dialog, and the ref will be undefined at that time.
    // But if we use the hook useEffect, this code will run after the component function is executed. So the ref will be defined and the code will work.
    if(open){
      dialog.current.showModal();
    }else{
      dialog.current.close();
    }
  }, [open]);

  return createPortal(
    <dialog
      className="modal"
      ref={dialog}
      //open={open} // The backdrop won't be shown if the modal is not opened programmatically using showModal() method.
      onClose={onClose}
    >
      { open ?  children : null }
    </dialog>,
    document.getElementById('modal')
  );
});

export default Modal;
