import React, { useEffect, useState } from 'react';
import { Accordion, AccordionToggle, AccordionCollapse, Button, Table, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import '../styles/RawData.scss';

const RawData = ({ data }) => {
  const [rawData, setRawData] = useState(data);

  useEffect(() => {
    console.log('Raw data updated');
    setRawData(data);
  }, [data]);

  return (
    <Accordion className="accordion">
      <Card className="card">
        <Card.Header className="header">
          <AccordionToggle as={Button} variant="link" eventKey="0">
            Show Raw Data
          </AccordionToggle>
        </Card.Header>
        <AccordionCollapse eventKey="0">
          <Table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Close ($)</th>
                <th>Volume ($)</th>
                <th>Open ($)</th>
                <th>High ($)</th>
                <th>Low ($)</th>
              </tr>
            </thead>
            <tbody>
              {rawData.map(({ Date, Close, Volume, Open, High, Low }) => (
                <tr key={Date}>
                  <td>{ `${Date.getDate()}/${Date.getMonth() + 1}/${Date.getFullYear()}` }</td>
                  <td>{ Close }</td>
                  <td>{ Volume}</td>
                  <td>{ Open }</td>
                  <td>{ High }</td>
                  <td>{ Low }</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </AccordionCollapse>
      </Card>
    </Accordion>
  );
};

RawData.propTypes = {
  data: PropTypes.array.isRequired,
};

export default RawData;
