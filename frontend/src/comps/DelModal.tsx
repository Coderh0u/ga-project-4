import ReactDOM from "react-dom";
import styles from "../authentication/Modal.module.css";
const authRoot = document.querySelector<HTMLDivElement>("#auth-root")!;

const DelModal = (props: any) => {
  return (
    <>
      {ReactDOM.createPortal(
        <div className={styles.backdrop}>
          <div
            className={styles.modal}
            // style={{ height: "50%", color: "#c20f08" }}
          >
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                textAlign: "center",
              }}
            >
              <h2>Confirm delete product?</h2>
              <button
                value={props.id}
                onClick={(e) => {
                  props.deleteProduct(e);
                  props.setDelModal(false);
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
