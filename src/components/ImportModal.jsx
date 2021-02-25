import React from 'react';
import { Modal, ModalBody, ModalFooter, ModalTitle, Form, FormGroup, FormFile, Button } from 'react-bootstrap';
import ModalHeader from 'react-bootstrap/ModalHeader';
import PropTypes from 'prop-types';

const ImportModal = ({ open, setOpen, read }) => (
  <Modal size="lg" centered show={open} onHide={() => setOpen(false)}>
    <ModalHeader closeButton>
      <ModalTitle>
        Import a file
      </ModalTitle>
    </ModalHeader>
    <ModalBody>
      <strong><p>The file must be of type .csv</p></strong>
      <Form>
        <FormGroup>
          <FormFile id="file" accept=".csv" />
        </FormGroup>
      </Form>
    </ModalBody>
    <ModalFooter>
      <Button variant="danger" onClick={() => setOpen(false)}>Close</Button>
      <Button variant="success" onClick={read}>Save Data</Button>
    </ModalFooter>
  </Modal>
);

ImportModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  read: PropTypes.func.isRequired,
};

export default ImportModal;
