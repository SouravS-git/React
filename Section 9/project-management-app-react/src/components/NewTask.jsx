import {useRef, useState} from "react";
import Modal from "./Modal.jsx";

export default function NewTask({ onAddTask }) {
  const [title, setTitle] = useState('');
  const modal = useRef();

  function handleChange(event){
    setTitle(event.target.value);
  }

  function handleAdd(){
    if(title.trim() === ''){
      modal.current.open();
      return;
    }

    onAddTask({
      id: crypto.randomUUID(),
      title,
    });

    setTitle('');
  }

  return (
    <>
      <Modal ref={modal} buttonLabel="Close">
        <h2 className="text-xl font-bold text-stone-700 my-4">Invalid Input</h2>
        <p className="text-stone-600 mb-4">Oops... looks like you forgot to enter a value.</p>
        <p className="text-stone-600 mb-4">Please make sure you provide a valid value and try again.</p>
      </Modal>
      <div className="flex items-center gap-4">
        <input
          type="text"
          className="w-64 px-2 py-1 rounded-sm bg-stone-200"
          value={title}
          onChange={handleChange}
        />
        <button
          className="text-stone-700 hover:text-stone-950"
          onClick={handleAdd}
        >
          Add Task
        </button>
      </div>
    </>
  );
}