import { createPortal } from "react-dom";
import { useRef, useEffect } from "react";

export default function Modal({ children, className = '', open, onClose }) {
  const modalRef = useRef();

  useEffect(() => {
    if (open) {
      modalRef.current.showModal();
    }else{
      modalRef.current.close();
    }
  }, [open]);

  return createPortal(
    <dialog ref={modalRef} className={`modal ${className}`} onClose={onClose}>
      {children}
    </dialog>
    , document.getElementById('modal'));
}