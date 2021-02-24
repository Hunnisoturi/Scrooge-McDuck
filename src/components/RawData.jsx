import React from 'react';
import { Accordion, AccordionToggle, AccordionCollapse, Button, Table, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';

const RawData = ({ data }) => (
  <Accordion>
    <Card>
      <Card.Header className="w-100">
        <AccordionToggle as={Button} variant="link" eventKey="0">
          Show Raw Data
        </AccordionToggle>
      </Card.Header>
      <AccordionCollapse eventKey="0">
        <Table>
          <thead>
            <th>Date</th>
            <th>Close</th>
            <th>Volume</th>
            <th>Open</th>
            <th>High</th>
            <th>Low</th>
          </thead>
          <tbody>
            {data.map(row => (
              <tr>
                <td>{row[0]}</td>
                <td>{row[1]}</td>
                <td>{row[2]}</td>
                <td>{row[3]}</td>
                <td>{row[4]}</td>
                <td>{row[5]}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </AccordionCollapse>
    </Card>
  </Accordion>
);

RawData.propTypes = {
  data: PropTypes.array.isRequired,
};

export default RawData;
