import React, { useState } from 'react';
import { Button, Row, Col, Modal, ModalBody, ModalFooter, ModalTitle, Form, FormGroup, FormFile, Container } from 'react-bootstrap';
import ModalHeader from 'react-bootstrap/ModalHeader';
import BullTrend from './components/BullTrend';
import './styles/App.scss';

const App = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [csvData, setCsvData] = useState(false);

  const readFile = () => {
    const file = document.getElementById('file').files[0];
    const fileReader = new FileReader();
    fileReader.onload = (() => {
      setCsvData(fileReader.result);
      console.log(fileReader.result);
      setModalOpen(false);
    });
    fileReader.readAsText(file);
  };

  return (
    <Container fluid="xl">
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
      <main>
        <BullTrend data={csvData} />
      </main>
      <Modal size="lg" centered show={modalOpen} onHide={() => setModalOpen(false)}>
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
          <Button variant="danger" onClick={() => setModalOpen(false)}>Close</Button>
          <Button variant="success" onClick={readFile}>Save Data</Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
};

export default App;
