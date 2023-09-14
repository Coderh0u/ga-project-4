import ReactDOM from "react-dom";
import styles from "./ActionModal.module.css";
const authRoot = document.querySelector<HTMLDivElement>("#auth-root")!;

const DelModal = (props: any) => {
  return (
    <>
      {ReactDOM.createPortal(
        <div className={styles.backdrop}>
          <div className={styles.modal}>
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                textAlign: "center",
              }}
            >
              <h2>Confirm delete?</h2>
              <button
                value={props.id}
                onClick={(e) => {
                  props.deleteProduct(e);
                  props.setDelModal(false);
                  props.setRerender(!props.rerender);
                }}
              >
                Yes
              </button>
              <button
                onClick={() => {
                  props.setDelModal(false);
                }}
              >
                No
              </button>
            </div>
          </div>
        </div>,
        authRoot
      )}
    </>
  );
};

export default DelModal;
