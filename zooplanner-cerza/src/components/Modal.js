import React from "react";


const Modal = (props) => {

    const modalStyle = {
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "#f09f54",
        padding: "50px",
        borderRadius: "10px",
        border: "solid black",
        zIndex: "999",
        boxShadow: "0px 0px 15px 5px rgba(0, 0, 0, 0.3)",
      };
        
  return (
    <div className="modal1" style={modalStyle}>
        <button onClick={props.onClose} style={{float: 'right'}}>Fermer</button>
      <div className="modal-content">
        {props.content}
      </div>
    </div>
  );
};

export default Modal;
