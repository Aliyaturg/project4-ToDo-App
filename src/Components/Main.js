import "./styles.css";
import PLUS_SIGN from "./Images/Plus Math.svg";
import { useState, useEffect } from "react";
import TASK_DOTS from "./Images/ThreeDots.svg";
import Modal from "./Modal";
import DeleteModal from "./DeleteModal.js";
import MoveToTrashModal from "./MoveToTrashModal.js";
import { v4 as uuid } from "uuid";

const tasks = [
  {
    id: uuid(),
    content: "find internship",
    status: "To Do",
    checked: true,
    isModalOpen: false,
  },
  {
    id: uuid(),
    content: "watch lectures - 3times",
    status: "Done",
    checked: true,
    isModalOpen: false,
  },
  {
    id: uuid(),
    content: "get stressful education",
    status: "Done",
    checked: true,
    isModalOpen: false,
  },
  {
    id: uuid(),
    content: "remember my code",
    status: "To Do",
    checked: false,
    isModalOpen: false,
  },
  {
    id: uuid(),
    content: "set alarm for office hours",
    status: "Done",
    checked: false,
    isModalOpen: false,
  },
  {
    id: uuid(),
    content: "do not sleep until ToDo app is done ",
    status: "To Do",
    checked: false,
    isModalOpen: false,
  },
  {
    id: uuid(),
    content: "stop procrastinating",
    status: "Trash",
    checked: true,
    isModalOpen: false,
  },
  {
    id: uuid(),
    content: "buy MCT oil",
    status: "Trash",
    checked: false,
    isModalOpen: false,
  },
  {
    id: uuid(),
    content: "eat vegetables",
    status: "Trash",
    checked: true,
    isModalOpen: false,
  },
];

export default function Main() {
  const [items, setItems] = useState(tasks); // перезаписываем массив
  const [filter, setFilter] = useState("To Do"); //используем для фильтра и изменения надписи темы
  const [isAddModalShown, setIsAddModalShown] = useState(false); //открытие и закрытие моадльного окна для добавления элементов

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

  // функция для открытия модального окна для добавления todo
  const openAddModal = () => {
    setIsAddModalShown(!isAddModalShown);
  };

  // распознование включения галочки в checkbox
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

  // отображение модального окна для перемещения и удаления тудушек
  const handleModal = (keyFromClick) => {
    const index = items.findIndex((item) => item.id === keyFromClick);
    const oldObject = items[index];
    const newObject = { ...oldObject };
    items.forEach((item) => (item.isModalOpen = false));
    newObject.isModalOpen = !newObject.isModalOpen;
    const leftPart = items.slice(0, index);
    const rightPart = items.slice(index + 1, items.length);
    const newItems = [...leftPart, newObject, ...rightPart];
    return setItems(newItems);
  };

  // adding new todos in a modal window
  const addToDo = (todo) => {
    const newItem = {
      id: uuid(),
      content: todo,
      status: "To Do",
      checked: false,
    };
    return setItems([newItem, ...items]);
  };

  // перемещение тудушек в корзину
  const handleMoveClick = (keyFromClick) => {
    const index = items.findIndex((item) => item.id === keyFromClick);
    const oldObject = items[index];
    const newObject = { ...oldObject };
    newObject.status = "Trash";
    newObject.isModalOpen = false;
    const leftPart = items.slice(0, index);
    const rightPart = items.slice(index + 1, items.length);
    const newItems = [...leftPart, newObject, ...rightPart];
    setItems(newItems);
  };

  // полное удаление тудушек из корзины
  const handleFirstClick = (keyFromClick) => {
    const index = items.findIndex((item) => item.id === keyFromClick);
    const leftPart = items.slice(0, index);
    const rightPart = items.slice(index + 1, items.length);
    const newItems = [...leftPart, ...rightPart];
    setItems(newItems);
  };

  // возвращение тудушек в todo или done
  const handleSecondClick = (keyFromClick) => {
    const index = items.findIndex((item) => item.id === keyFromClick);
    const oldObject = items[index];
    const newObject = { ...oldObject };
    if (newObject.checked === true) {
      newObject.status = "Done";
      newObject.isModalOpen = false;
      const leftPart = items.slice(0, index);
      const rightPart = items.slice(index + 1, items.length);
      const newItems = [...leftPart, newObject, ...rightPart];
      setItems(newItems);
    } else {
      newObject.status = "To Do";
      newObject.isModalOpen = false;
      const leftPart = items.slice(0, index);
      const rightPart = items.slice(index + 1, items.length);
      const newItems = [...leftPart, newObject, ...rightPart];
      setItems(newItems);
    }
  };

  // фильтр отображения todos по категориям
  const filteredData = items.filter((item) => {
    if (filter === "To Do") {
      return item.status === "Done" || item.status === "To Do";
    } else if (filter === "Done") {
      return item.status === "Done";
    } else {
      return item.status === "Trash";
    }
  });

  //changing page title
  document.title = filter;

  // функция чтобы todo стояли выше done
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
                ? "rgba(8, 30, 52, 0.42)"
                : "rgba(8, 30, 52, 0.05)",
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
                ? "rgba(8, 30, 52, 0.42)"
                : "rgba(8, 30, 52, 0.05)",
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
                ? "rgba(8, 30, 52, 0.42)"
                : "rgba(8, 30, 52, 0.05)",
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
            onClick={openAddModal}
            style={{ transform: isAddModalShown ? "rotate(45deg)" : "" }}>
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
              {item.isModalOpen &&
              (item.status === "To Do" || item.status === "Done") ? (
                <MoveToTrashModal
                  onClick={() => {
                    handleMoveClick(item.id);
                  }}
                />
              ) : item.isModalOpen && item.status === "Trash" ? (
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