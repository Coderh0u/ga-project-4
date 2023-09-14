import ReactDOM from "react-dom";
import styles from "../authentication/Modal.module.css";
const authRoot = document.querySelector<HTMLDivElement>("#auth-root")!;

const DelModal = (props: any) => {
  return (
    <>
      {ReactDOM.createPortal(
        <div className={styles.backdrop}>
          <div className={styles.modal}>
            <h2>Confirm delete product?</h2>
            <button value={props.id} onClick={props.deleteProduct}>
              {props.id}
            </button>
            <button
              onClick={() => {
                props.setDelModal(false);
              }}
            >
              No
            </button>
          </div>
        </div>,
        authRoot
      )}
    </>
  );
};

export default DelModal;
