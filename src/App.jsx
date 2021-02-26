import React, { useState } from 'react';
import { Button, Row, Col, Container, Navbar, Image, Card } from 'react-bootstrap';
import TimeRangePicker from './components/TimeRangePicker';
import BullTrend from './components/BullTrend';
import RawData from './components/RawData';
import VolumeAndVariation from './components/VolumeAndVariation';
import MovingAverage from './components/MovingAverage';
import ImportModal from './components/ImportModal';
import scrooge from './assets/scrooge.jpg';
import './styles/App.scss';

const App = () => {
  const [dataModalOpen, setDataModalOpen] = useState(false);
  const [formattedData, setFormattedData] = useState(null);

  const formatData = data => {
    const final = [];
    data.forEach(row => {
      const date = row[0].split('/');
      const newDate = new Date(date[2], date[0] - 1, date[1]);

      const close = row[1].replace('$', '');
      const newClose = parseFloat(close);

      const newVolume = parseInt(row[2], 10);

      const open = row[3].replace('$', '');
      const newOpen = parseFloat(open);

      const high = row[4].replace('$', '');
      const newHigh = parseFloat(high);

      const low = row[5].replace('$', '');
      const newLow = parseFloat(low);

      final.push({
        Date: newDate,
        Close: newClose,
        Volume: newVolume,
        Open: newOpen,
        High: newHigh,
        Low: newLow,
      });
    });
    setFormattedData(final);
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

  const componentsOrPrompt = formattedData
    ? (
      <Container fluid>
        <Row className="row-wide">
          <Card body className="component-card">
            <TimeRangePicker data={formattedData} />
          </Card>
        </Row>
        <Row>
          <Col xs={4}>
            <Card body className="component-card">
              <BullTrend data={formattedData} />
            </Card>
          </Col>
          <Col xs={4}>
            <Card body className="component-card">
              <VolumeAndVariation data={formattedData} />
            </Card>
          </Col>
          <Col xs={4}>
            <Card body className="component-card">
              <MovingAverage data={formattedData} />
            </Card>
          </Col>
        </Row>
        <Row>
          <RawData data={formattedData} />
        </Row>
      </Container>
    )
    : (
      <Col className="welcome">
        <h1>Welcome Mr McDuck!</h1>
        <h4>Start analyzing by importing data.</h4>
      </Col>
    );

  return (
    <>
      <Navbar bg="light">
        <Container fluid="xl" className="header">
          <Navbar.Brand>
            <Image
              alt="scrooge"
              src={scrooge}
              width="50"
              height="50"
              roundedCircle
            />
            {' '}
            Scrooge McDuck
          </Navbar.Brand>
          <Button
            variant="outline-success"
            className="button"
            onClick={() => setDataModalOpen(true)}
          >
            Import Data
          </Button>
        </Container>
      </Navbar>
      <Container fluid="xl" className="container">
        <main className="main">
          {componentsOrPrompt}
        </main>
        <ImportModal open={dataModalOpen} setOpen={setDataModalOpen} read={readFile} />
      </Container>
    </>
  );
};

export default App;
