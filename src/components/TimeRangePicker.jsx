import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import '../styles/TimeRangePicker.scss';

const TimeRangePicker = ({ data }) => {
  const [dateMin, setDateMin] = useState(null);
  const [dateMax, setDateMax] = useState(null);

  const getDateInputString = input => {
    const year = input.getFullYear().toString();
    let month = (input.getMonth() + 1).toString();
    let date = input.getDate().toString();

    if (date.length === 1) {
      date = '0'.concat('', date);
    }
    if (month.length === 1) {
      month = '0'.concat('', month);
    }
    return `${year}-${month}-${date}`;
  };

  const getDateMin = () => setDateMin(getDateInputString(data[data.length - 1].Date));

  const getDateMax = () => setDateMax(getDateInputString(data[0].Date));

  useEffect(() => {
    getDateMax();
    getDateMin();
  }, [data]);

  return (
    <div className="time-picker">
      <h3>Select time range to be viewed</h3>
      <Row>
        <Col>
          <p>Pick a starting date</p>
          <input id="datemin" type="date" min={dateMin} max={dateMax} />
        </Col>
        <Col>
          <p>Pick a ending date</p>
          <input id="datmax" type="date" min={dateMin} max={dateMax} />
        </Col>
      </Row>
    </div>
  );
};

TimeRangePicker.propTypes = {
  data: PropTypes.array.isRequired,
};

export default TimeRangePicker;
