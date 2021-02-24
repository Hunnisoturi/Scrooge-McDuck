import React, { useEffect, useState } from 'react';
import { Button, Row, Col, Modal, ModalBody, ModalFooter, ModalTitle, Form, FormGroup, FormFile, Container } from 'react-bootstrap'
import ModalHeader from 'react-bootstrap/ModalHeader'
import API from './services/api';
import './styles/App.scss';

const App = () => {

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const uploadFile = () => {
    setSelectedFile(document.getElementById("file").files[0]);

    const data = new FormData();
    data.append('file', selectedFile);
    API.uploadCSVData(data)
    .then(() => {
      setModalOpen(false);
    })
    .catch(err => {
      console.error(err);
    })
  }

  useEffect(() => {
    console.log(selectedFile);
  }, [selectedFile]);

  return (
    <Container fluid>
      <header className="header">
        <Row>
          <Col xs={10}>
            <h3>Scrooge McDuck</h3>
          </Col>
          <Col xs={2} className="d-flex justify-content-end">
            <Button variant="primary" onClick={() => setModalOpen(true)}>Import Data</Button>
          </Col>
        </Row>
      </header>
      {/* <main className="d-flex align-items-center justify-content-center">
        <h1>Start by importing data from a file</h1>
      </main> */}
      <Modal size="lg" centered show={modalOpen} onHide={() => setModalOpen(false)}>
        <ModalHeader closeButton>
          <ModalTitle>
            Import a file
          </ModalTitle>
        </ModalHeader>
        <ModalBody>
          <strong><p>The file must be of type .csv</p></strong>
          {/* <input type="file"></input> */}
          <Form>
            <FormGroup>
              <FormFile id="file" accept=".csv"/>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button variant="danger" onClick={() => setModalOpen(false)}>Close</Button>
          <Button variant="success" onClick={uploadFile}>Save Data</Button>
        </ModalFooter>
      </Modal>
      </Container>
  );
}

export default App;
