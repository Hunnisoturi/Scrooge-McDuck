import React, { useEffect, useState } from 'react';
import { Button, Row, Col, Modal, ModalBody, ModalFooter, ModalTitle, Form, FormGroup, FormFile, Container } from 'react-bootstrap';
import ModalHeader from 'react-bootstrap/ModalHeader';
import BullTrend from './components/BullTrend';
import RawData from './components/RawData';
import VolumeAndVariation from './components/VolumeAndVariation';
import MovingAverage from './components/MovingAverage';
import ImportModal from './components/ImportModal';
import './styles/App.scss';

const App = () => {
  const [dataModalOpen, setDataModalOpen] = useState(false);
  const [dateModalOpen, setDateModalOpen] = useState(false);
  const [arrayData, setArrayData] = useState(null);
  // const [formattedData, setFormattedData] = useState(null);

  const formatData = data => {
    setArrayData(data);
  };

  const csvDataToArray = data => {
    const rows = data.slice(data.indexOf('\n')).split('\n');
    const newRows = rows.map(row => row.split(','));
    newRows.forEach((row, index) => {
      if (row.length === 1) {
        newRows.splice(index, 1);
      }
    });
    // console.log(newRows);
    formatData(newRows);
  };

  const readFile = () => {
    const file = document.getElementById('file').files[0];
    const fileReader = new FileReader();
    fileReader.onload = (() => {
      const data = fileReader.result;
      // console.log(data);
      csvDataToArray(data);
      setDataModalOpen(false);
    });
    fileReader.readAsText(file);
  };

  const componentsOrPrompt = arrayData
    ? (
      <Container fluid>
        <Row>
          <Col xs={4}>
            <BullTrend data={arrayData} />
          </Col>
          <Col xs={4}>
            <VolumeAndVariation data={arrayData} />
          </Col>
          <Col xs={4}>
            <MovingAverage data={arrayData} />
          </Col>
        </Row>
        <Row>
          <RawData data={arrayData} />
        </Row>
      </Container>
    )
    : <h1>Start by Importing Data</h1>;

  return (
    <Container fluid="xl" className="container">
      <header className="header">
        <Row>
          <Col xs={8}>
            <h3>Scrooge McDuck</h3>
          </Col>
          <Col xs={4} className="d-flex justify-content-end">
            <Button variant="primary" className="button" onClick={() => setDateModalOpen(true)} disabled={!arrayData}>Pick Date Range</Button>
            <Button variant="primary" className="button" onClick={() => setDataModalOpen(true)}>Import Data</Button>
          </Col>
        </Row>
      </header>
      <main className="main">
        {componentsOrPrompt}
      </main>
      <ImportModal open={dataModalOpen} setOpen={setDataModalOpen} read={readFile} />
      <Modal size="lg" centered show={dateModalOpen} onHide={() => setDateModalOpen(false)}>
        <ModalHeader closeButton>
          <ModalTitle>
            Select Date Range
          </ModalTitle>
        </ModalHeader>
        <ModalBody>
          <strong><p>Select a time range to view</p></strong>
          <Form>
            <input type="date" />
            {' '}
            <input type="date" />
          </Form>
        </ModalBody>
      </Modal>
    </Container>
  );
};

export default App;
