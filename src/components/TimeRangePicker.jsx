import React, { useEffect, useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import '../styles/TimeRangePicker.scss';

const TimeRangePicker = ({ data, setMin, setMax }) => {
  const [dateMin, setDateMin] = useState(null);
  const [dateMax, setDateMax] = useState(null);

  const [rangeMin, setRangeMin] = useState(null);
  const [rangeMax, setRangeMax] = useState(null);

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

  const validateDates = () => {
    const dateRangeMax = new Date(`${rangeMax}T00:00:00`);
    const dateRangeMin = new Date(`${rangeMin}T00:00:00`);

    let max = data.find(day => day.Date.getTime() === dateRangeMax.getTime());
    let min = data.find(day => day.Date.getTime() === dateRangeMin.getTime());

    if (!min) {
      min = data.find(day => day.Date.getTime() < dateRangeMin.getTime());
    }

    if (!max) {
      max = data.find(day => day.Date.getTime() < dateRangeMax.getTime());
    }

    const maxIndex = data.indexOf(max);
    const minIndex = data.indexOf(min) + 1;

    setMin(minIndex);
    setMax(maxIndex);
  };

  const getDateMin = () => setDateMin(getDateInputString(data[data.length - 1].Date));
  const getDateMax = () => setDateMax(getDateInputString(data[0].Date));

  const onMinChange = e => setRangeMin(e.target.value);
  const onMaxChange = e => setRangeMax(e.target.value);

  useEffect(() => {
    getDateMax();
    getDateMin();
  });

  return (
    <div className="time-picker">
      <h3>Select time range to be viewed</h3>
      <Row>
        <Col>
          <p>Pick a starting date</p>
          <input id="datemin" type="date" min={dateMin} max={rangeMax || dateMax} onChange={e => onMinChange(e)} />
        </Col>
        <Col>
          <p>Pick a ending date</p>
          <input id="datemax" type="date" min={rangeMin || dateMin} max={dateMax} onChange={e => onMaxChange(e)} />
        </Col>
      </Row>
      <Button variant="success" className="time-picker-button" disabled={!rangeMin || !rangeMax} onClick={validateDates}>
        Pick New Time Range
      </Button>
    </div>
  );
};

TimeRangePicker.propTypes = {
  data: PropTypes.array.isRequired,
  setMin: PropTypes.func.isRequired,
  setMax: PropTypes.func.isRequired,
};

export default TimeRangePicker;
