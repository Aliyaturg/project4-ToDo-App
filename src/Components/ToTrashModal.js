import "./styles.css";
import TRASH_BIN from "./Images/TrashBin.svg";

export default function ToTrash({ onClick }) {
  return (
    <div className="moveToTrash-modal">
      <button onClick={onClick}>
        <img src={TRASH_BIN} alt="trash bin" />
        Move to trash
      </button>
    </div>
  );
}
