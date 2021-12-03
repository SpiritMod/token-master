//core
import React from "react";
import { Modal, ModalBody } from "reactstrap";

import Close from "../../../assets/icons/close.svg";

const ModalDialog = ({
  title,
  children,
  className,
  closeCls,
  isOpen,
  toggle,
  backdrop = true,
}) => {
  return (
    <Modal
      wrapClassName="modal-wrapper"
      isOpen={isOpen}
      toggle={toggle}
      className={className}
      backdrop={backdrop}
    >
      <div className="modal-header">
        {
          title && <div className="modal-title">{title}</div>
        }
        <div className={`modal-close ${closeCls ? closeCls : ''}`} onClick={toggle}>
          <Close />
        </div>
      </div>
      <ModalBody>
        <div className="modal-text">
          {children}
        </div>
      </ModalBody>
    </Modal>
  );
};

export default ModalDialog;
