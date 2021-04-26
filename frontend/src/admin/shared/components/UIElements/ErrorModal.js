import React from 'react';

import Modal from './Modal';
import Button from '../FormElements/Button';

const ErrorModal = props => {
  return (
    <Modal
      onCancel={props.onClear}
      header="Ha ocurrido un error!"
      show={!!props.error}
      footer={<div className="center"><Button onClick={props.onClear}>Aceptar</Button></div>}
    >
      <p>{props.error}</p>
    </Modal>
  );
};

export default ErrorModal;
