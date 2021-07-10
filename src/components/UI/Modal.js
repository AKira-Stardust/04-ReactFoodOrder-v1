import React from "react";
import ReactDOM from "react-dom";

import styles from "./Modal.module.css";

function Backdrop(props){
    return(
        <div className={styles.backdrop} onClick={props.onBGClick} />
    );
}

function ModalOverlay(props){
    return(
        <div className={styles.modal}>
            <div className={styles.content}>{props.children}</div>
        </div>
    );
}

// //Without Portals
// function Modal(props){
//     return(
//         <React.Fragment>
//             <Backdrop />
//             <ModalOverlay>{props.children}</ModalOverlay>
//         </React.Fragment>
//     );
// }

//Using Portals

const portalTarget = document.getElementById("overlays_root");

function Modal(props){
    return(
        <React.Fragment>
            { ReactDOM.createPortal( <Backdrop onBGClick={props.onBGClick}/>, portalTarget) }
            { ReactDOM.createPortal( <ModalOverlay>{props.children}</ModalOverlay>, portalTarget) }
        </React.Fragment>
    );
}

export default Modal;