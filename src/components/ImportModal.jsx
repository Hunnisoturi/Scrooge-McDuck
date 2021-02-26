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
