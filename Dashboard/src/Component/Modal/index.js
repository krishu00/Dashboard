import React, { useEffect } from "react";
import Modal from "react-modal";
import DataTable from "../DataTable/DataTable";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
  },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#root");

const MyModal = ({ openModal, children,close }) => {
  const [modalIsOpen, setIsOpen] = React.useState(false);

  useEffect(() => {
    if (openModal) {
      setIsOpen(true);
    }
  }, [openModal]);
  const CloseModal = (e) => {
    e.preventDefault();
    setIsOpen(false);
    close && close(false);

  };
  const afterOpenModal = () => {
    console.log("test after modal");
  };

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={(e) => CloseModal(e)}
        style={customStyles}
        contentLabel="Example Modal"
      >
        {/* <h2>Hello</h2> */}
        <button onClick={(e) => CloseModal(e)}>close</button>
        {/* <div>I am a modal</div> */}
        <DataTable/>
        {children}
      </Modal>
    </>
  );
};

export default MyModal;
