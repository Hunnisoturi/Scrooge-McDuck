import React, { useEffect, useState } from 'react';
import { Button, Row, Col, Modal, ModalBody, ModalFooter, ModalTitle, Form, FormGroup, FormFile, Container } from 'react-bootstrap';
import ModalHeader from 'react-bootstrap/ModalHeader';
import BullTrend from './components/BullTrend';
import RawData from './components/RawData';
import './styles/App.scss';

const App = () => {
  const [dataModalOpen, setDataModalOpen] = useState(false);
  const [dateModalOpen, setDateModalOpen] = useState(false);
  const [formattedData, setFormattedData] = useState(null);
  const [dateMin, setDateMin] = useState('');
  const [dateMax, setDateMax] = useState('');

  const formatData = data => {
    // formattedData.forEach(row => {
    //   const date = row[0].split('/');
    //   const newDate = new Date(date[2], date[0] - 1, date[1]);
    //   row[0] = newDate;
    //   row.forEach(item => {
    //     if (item.includes('$')) {
    //       const newItem = item.replace('$', '');
    //       console.log(newItem);
    //     }
    //   });
    // });
    // const finalData = [[]];

    // data.forEach(row => {
    //   row.forEach((item, index) => {
    //     let newDate = null;
    //     if (index === 0) {
    //       const date = row[0].split('/');
    //       newDate = new Date(date[2], date[0] - 1, date[1]);
    //     }
    //   });
    //   finalData.push
    // });
    // console.log(finalData);
  };

  useEffect(() => {
    console.log(dateMax);
    console.log(dateMin);
    console.log(formattedData);
  }, [dateMin, dateMax, formattedData]);

  const csvDataToArray = data => {
    const rows = data.slice(data.indexOf('\n')).split('\n');
    const newRows = rows.map(row => row.split(', '));
    newRows.forEach((row, index) => {
      if (row.length === 1) {
        newRows.splice(index, 1);
      }
    });
    formatData(newRows);
  };

  const readFile = () => {
    const file = document.getElementById('file').files[0];
    const fileReader = new FileReader();
    fileReader.onload = (() => {
      const data = fileReader.result;
      csvDataToArray(data);
      setDataModalOpen(false);
    });
    fileReader.readAsText(file);
  };

  const componentOrNull = formattedData ? <RawData data={formattedData} />
    : <h1>Start by Importing Data</h1>;

  return (
    <Container fluid="xl" className="container">
      <header className="header">
        <Row>
          <Col xs={8}>
            <h3>Scrooge McDuck</h3>
          </Col>
          <Col xs={4} className="d-flex justify-content-end">
            <Button variant="primary" className="button" onClick={() => setDataModalOpen(true)}>Import Data</Button>
            <Button variant="primary" className="button" onClick={() => setDateModalOpen(true)} disabled={!formattedData}>Pick Date Range</Button>
          </Col>
        </Row>
      </header>
      <main className="main">
        {/* <BullTrend /> */}
        {componentOrNull}
      </main>
      <Modal size="lg" centered show={dataModalOpen} onHide={() => setDataModalOpen(false)}>
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
          <Button variant="danger" onClick={() => setDataModalOpen(false)}>Close</Button>
          <Button variant="success" onClick={readFile}>Save Data</Button>
        </ModalFooter>
      </Modal>
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
