import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const LogOutModal = (props) => {
  const {showModal, handleClose, handleLogout, remainingTime} = props;

//   const [modal, setModal] = useState(false);

//   const toggle = () => setModal(!modal);

  return (
    <div>
      
      <Modal isOpen={showModal}>
        <ModalHeader>You Have Been Idle! <Button style={{position: 'absolute', right: '21px', fontSize: '16px' }}color="danger" onClick={handleClose}>{"x"}</Button></ModalHeader>
        <ModalBody>
        You Will Get Timed Out. You want to stay?
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleLogout}>Logout</Button>{' '}
          <Button color="secondary" onClick={handleClose}>Stay</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default LogOutModal;

// import React from 'react';
// import { Modal, Button } from 'reactstrap';

// export default class LogOutModal extends React.Component() {
//     constructor(props) {
//         super(props);
//     }
//     render() {
//         const {showModal, handleClose, handleLogout, remainingTime} = this.props;
//         debugger;
//         return (
//             <Modal show={showModal} onHide={handleClose}>
//                 <Modal.Header closeButton>
//                 <Modal.Title>You Have Been Idle!</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>You Will Get Timed Out. You want to stay?</Modal.Body>
//                 <Modal.Footer>
//                 <Button variant="danger" onClick={handleLogout}>
//                     Logout
//                 </Button>
//                 <Button variant="primary" onClick={handleClose}>
//                     Stay
//                 </Button>
//                 </Modal.Footer>
//             </Modal>
//         )
//     }
// }