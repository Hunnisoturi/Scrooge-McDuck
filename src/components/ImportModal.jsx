import React, { useState } from 'react';
import { Modal, ModalBody, ModalFooter, ModalTitle, Form, FormGroup, FormFile, Button } from 'react-bootstrap';
import ModalHeader from 'react-bootstrap/ModalHeader';
import PropTypes from 'prop-types';

const ImportModal = ({ open, setOpen, read }) => {
  const [selectedFile, setSelectedFile] = useState(false);

  const validate = files => {
    if (files.length > 0) {
      setSelectedFile(true);
    }
  };

  const clearStateAndHide = () => {
    setSelectedFile(false);
    setOpen(false);
  };

  const clearStateAndSubmit = () => {
    setSelectedFile(false);
    read();
    setOpen(false);
  };

  return (
    <Modal size="lg" centered show={open} onHide={clearStateAndHide}>
      <ModalHeader closeButton>
        <ModalTitle>
          Import a file
        </ModalTitle>
      </ModalHeader>
      <ModalBody>
        <strong><p>The imported file must be formatted as follows:</p></strong>
        <p>
          “Date, Close/Last, Volume, Open, High, Low
        </p>
        <p>
          01/20/2021, $127.83, 90757330, $127.78, $128.71, $126.938
        </p>
        <p>
          01/19/2021, $123.83, 12334530, $225.41, $98.52, $126.938”
        </p>
        <Form>
          <FormGroup>
            <FormFile id="file" accept=".csv" onChange={e => validate(e.target.files)} />
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button variant="danger" onClick={clearStateAndHide}>Close</Button>
        <Button variant="success" onClick={clearStateAndSubmit} disabled={!selectedFile}>Import Data</Button>
      </ModalFooter>
    </Modal>
  );
};

ImportModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  read: PropTypes.func.isRequired,
};

export default ImportModal;
