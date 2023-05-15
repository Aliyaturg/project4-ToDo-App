import "./styles.css";
import { useState } from "react";

export default function Modal({ addToDo, closeModal }) {
  const [input, setInput] = useState("");
  const handleChange = (event) => {
    // console.log(e.target.value);
    setInput(event.target.value);
  };

  return (
    <div className="add-modal">
      <h4 className="add-modal-title">Add New To Do</h4>
      <textarea
        className="modal-input"
        type="text"
        placeholder="Your text"
        value={input}
        onChange={handleChange}
      />
      <button
        type="submit"
        className="modal-add-button"
        onClick={() => {
          if (input.trim()) {
            addToDo(input);
            setInput("");
            closeModal();
          }
        }}>
        Add
      </button>
    </div>
  );
}
