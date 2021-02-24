import React, { useEffect, useState } from 'react';
import { Button, Row, Col, Modal, ModalBody, ModalFooter, ModalTitle, Form, FormGroup, FormFile, Container } from 'react-bootstrap';
import ModalHeader from 'react-bootstrap/ModalHeader';
import BullTrend from './components/BullTrend';
import RawData from './components/RawData';
import './styles/App.scss';

const App = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [formattedData, setFormattedData] = useState(null);

  const csvDataToArray = data => {
    const rows = data.slice(data.indexOf('\n')).split('\n');
    const newRows = rows.map(row => row.split(', '));
    newRows.forEach((row, index) => {
      if (row.length === 1) {
        newRows.splice(index, 1);
      }
    });
    setFormattedData(newRows);
  };

  const readFile = () => {
    const file = document.getElementById('file').files[0];
    const fileReader = new FileReader();
    fileReader.onload = (() => {
      const data = fileReader.result;
      csvDataToArray(data);
      setModalOpen(false);
    });
    fileReader.readAsText(file);
  };

  useEffect(() => {
    console.log(formattedData);
  }, [formattedData]);

  const conditional = formattedData ? <RawData data={formattedData} />
    : <h1>Start by Importing Data</h1>;

  return (
    <Container fluid="xl" className="container">
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
      <main className="main">
        {/* <BullTrend /> */}
        {conditional}
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
