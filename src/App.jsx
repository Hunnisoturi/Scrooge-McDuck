import React, { useEffect } from 'react';
import API from './services/api';
import { Button, Row, Col } from 'react-bootstrap'
import './styles/App.scss';

const App = () => {

  // useEffect(() => {
  //   API.fetchStockData()
  //     .then(data => {
  //       console.log(data);
  //     })
  //     .catch(err => {
  //       console.error(err)
  //     })
  //   }, [])

  return (
    <div className="app d-flex">
      <header className="header">
        <Row>
          <Col xs={10}>
            <h3>Scrooge McDuck</h3>
          </Col>
          <Col xs={2}>
            <Button variant="primary">Import Data</Button>
          </Col>
        </Row>
      </header>
    </div>
  );
}

export default App;
