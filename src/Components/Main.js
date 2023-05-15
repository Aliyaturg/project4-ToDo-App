import "./styles.css";
import PLUS_SIGN from "./Images/Plus Math.svg";
import { useState, useEffect } from "react";
import TASK_DOTS from "./Images/ThreeDots.svg";
import Modal from "./Modal";
import DeleteModal from "./DeleteModal.js";
import ToTrashModal from "./ToTrashModal.js";
import { v4 as uuid } from "uuid";

const list = [
  {
    id: uuid(),
    content: "find internship",
    status: "To Do",
    checked: true,
    opened: false,
  },
  {
    id: uuid(),
    content: "watch lectures - 3times",
    status: "Done",
    checked: true,
    opened: false,
  },
  {
    id: uuid(),
    content: "get stressful education",
    status: "Done",
    checked: true,
    opened: false,
  },
  {
    id: uuid(),
    content: "remember my code",
    status: "To Do",
    checked: false,
    opened: false,
  },
  {
    id: uuid(),
    content: "call mom",
    status: "Done",
    checked: false,
    opened: false,
  },
  {
    id: uuid(),
    content: "do not sleep until ToDo app is done ",
    status: "To Do",
    checked: false,
    opened: false,
  },
  {
    id: uuid(),
    content: "stop procrastinating",
    status: "Trash",
    checked: true,
    opened: false,
  },
  {
    id: uuid(),
    content: "buy MCT oil",
    status: "Trash",
    checked: false,
    opened: false,
  },
  {
    id: uuid(),
    content: "eat vegetables",
    status: "Trash",
    checked: true,
    opened: false,
  },
];

export default function Main() {
  const [items, setItems] = useState(list); 
  const [filter, setFilter] = useState("To Do"); 
  const [isAddModalShown, setIsAddModalShown] = useState(false); 

  // переключатель цвета button
  const [isActiveToDo, setIsActiveToDo] = useState(true);
  const [isActiveDone, setIsActiveDone] = useState(false);
  const [isActiveTrash, setIsActiveTrash] = useState(false);

  const selectToDo = () => {
    setIsActiveToDo(true);
    setIsActiveDone(false);
    setIsActiveTrash(false);
  };
  const selectDone = () => {
    setIsActiveToDo(false);
    setIsActiveDone(true);
    setIsActiveTrash(false);
  };
  const selectTrash = () => {
    setIsActiveToDo(false);
    setIsActiveDone(false);
    setIsActiveTrash(true);
  };

  const openAddModal = () => {
    setIsAddModalShown(!isAddModalShown);
  };

  const handleCheck = (keyFromCheck) => {
    const index = items.findIndex((item) => item.id === keyFromCheck);
    const oldObject = items[index];
    if (oldObject.status === "Trash") {
      setItems(items);
    } else {
      if (oldObject.status === "To Do") {
        const newObject = { ...oldObject };
        newObject.checked = true;
        newObject.status = "Done";
        const leftPart = items.slice(0, index);
        const rightPart = items.slice(index + 1, items.length);
        const newItems = [...leftPart, newObject, ...rightPart];
        return setItems(newItems);
      }
      if (oldObject.status === "Done") {
        const newObject = { ...oldObject };
        newObject.checked = false;
        newObject.status = "To Do";
        const leftPart = items.slice(0, index);
        const rightPart = items.slice(index + 1, items.length);
        const newItems = [...leftPart, newObject, ...rightPart];
        return setItems(newItems);
      }
    }
  };

  const handleModal = (keyFromClick) => {
    const index = items.findIndex((item) => item.id === keyFromClick);
    const oldObject = items[index];
    const newObject = { ...oldObject };
    items.forEach((item) => (item.opened = false));
    newObject.opened = !newObject.opened;
    const leftPart = items.slice(0, index);
    const rightPart = items.slice(index + 1, items.length);
    const newItems = [...leftPart, newObject, ...rightPart];
    return setItems(newItems);
  };

  const addToDo = (todo) => {
    const newItem = {
      id: uuid(),
      content: todo,
      status: "To Do",
      checked: false,
    };
    return setItems([newItem, ...items]);
  };

  const handleMoveClick = (keyFromClick) => {
    const index = items.findIndex((item) => item.id === keyFromClick);
    const oldObject = items[index];
    const newObject = { ...oldObject };
    newObject.status = "Trash";
    newObject.opened = false;
    const leftPart = items.slice(0, index);
    const rightPart = items.slice(index + 1, items.length);
    const newItems = [...leftPart, newObject, ...rightPart];
    setItems(newItems);
  };

  const handleFirstClick = (keyFromClick) => {
    const index = items.findIndex((item) => item.id === keyFromClick);
    const leftPart = items.slice(0, index);
    const rightPart = items.slice(index + 1, items.length);
    const newItems = [...leftPart, ...rightPart];
    setItems(newItems);
  };

  const handleSecondClick = (keyFromClick) => {
    const index = items.findIndex((item) => item.id === keyFromClick);
    const oldObject = items[index];
    const newObject = { ...oldObject };
    if (newObject.checked === true) {
      newObject.status = "Done";
      newObject.opened = false;
      const leftPart = items.slice(0, index);
      const rightPart = items.slice(index + 1, items.length);
      const newItems = [...leftPart, newObject, ...rightPart];
      setItems(newItems);
    } else {
      newObject.status = "To Do";
      newObject.opened = false;
      const leftPart = items.slice(0, index);
      const rightPart = items.slice(index + 1, items.length);
      const newItems = [...leftPart, newObject, ...rightPart];
      setItems(newItems);
    }
  };

  const filteredData = items.filter((item) => {
    if (filter === "To Do") {
      return item.status === "Done" || item.status === "To Do";
    } else if (filter === "Done") {
      return item.status === "Done";
    } else {
      return item.status === "Trash";
    }
  });

  document.title = filter;

  function compare(a, b) {
    if (a.checked < b.checked) {
      return -1;
    }
    if (a.checked > b.checked) {
      return 1;
    }
    return 0;
  }

  const sortedData = filteredData.sort(compare);

  return (
    <div className="main">
      <div className="top-buttons">
        <div className="top-left-buttons">
          <button
            className="categories"
            style={{
              backgroundColor: isActiveToDo
                ? "#081E34"
                : "#E4E6E7",
              color: isActiveToDo ? "white" : "",
            }}
            onClick={() => {
              selectToDo();
              setFilter("To Do");
            }}>
            To Do
          </button>
          <button
            className="categories"
            style={{
              backgroundColor: isActiveDone
                ? "#081E34"
                : "#E4E6E7",
              color: isActiveDone ? "white" : "",
            }}
            onClick={() => {
              selectDone();
              setFilter("Done");
            }}>
            Done
          </button>
          <button
            className="categories"
            style={{
              backgroundColor: isActiveTrash
                ? "#081E34"
                : "#E4E6E7",
              color: isActiveTrash ? "white" : "",
            }}
            onClick={() => {
              selectTrash();
              setFilter("Trash");
            }}>
            Trash
          </button>
        </div>
        <div>
          <button
            className="add-button"
            onClick={openAddModal}>
            <img src={PLUS_SIGN} alt="plus" />
          </button>
          {isAddModalShown && (
            <Modal addToDo={addToDo} closeModal={openAddModal} />
          )}
        </div>
      </div>
      <div className="window-title">
        <h4 className="title-text">{filter}</h4>
      </div>
      <div className="task-list">
        {sortedData.map((item) => (
          <div className="task" key={item.id}>
            <div className="modal-container">
              <button
                className="task-dots-button"
                onClick={() => {
                  handleModal(item.id);
                }}>
                <img
                  className="task-dots-img"
                  src={TASK_DOTS}
                  alt="task menu"
                />
              </button>
              {item.opened &&
              (item.status === "To Do" || item.status === "Done") ? (
                <ToTrashModal
                  onClick={() => {
                    handleMoveClick(item.id);
                  }}
                />
              ) : item.opened && item.status === "Trash" ? (
                <DeleteModal
                  onFirstClick={() => handleFirstClick(item.id)}
                  onSecondClick={() => handleSecondClick(item.id)}
                />
              ) : (
                ""
              )}
            </div>

            <input
              type="checkbox"
              checked={item.checked}
              onChange={() => {
                handleCheck(item.id);
              }}
            />
            <label className="task-text">{item.content}</label>
          </div>
        ))}
      </div>
    </div>
  );
}