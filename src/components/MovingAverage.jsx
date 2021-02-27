import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import PropTypes from 'prop-types';

// TODO: Calculation starts from the 5th day, fix with picking date range accordingly

const MovingAverage = ({ data }) => {
  const [movingData, setMovingData] = useState(data);
  const [topList, setTopList] = useState([]);

  const getPercentageDiff = (a, b) => a > b ? Math.abs(((a - b) / a) * 100)
    : -Math.abs(((a - b) / a) * 100);

  const sortByDiff = (a, b) => parseFloat(b.Diff) - parseFloat(a.Diff);

  const calculateMovingAverages = () => {
    const newData = [];
    movingData.forEach(row => newData.push(row));
    const movingAverages = [];
    for (let i = 5; i < newData.length; i += 1) {
      const mean = (newData[i - 1].Close
        + newData[i - 2].Close
        + newData[i - 3].Close
        + newData[i - 4].Close
        + newData[i - 5].Close
      ) / 5;
      const diff = getPercentageDiff(newData[i].Open, mean);
      movingAverages.push({ id: i - 5, Date: newData[i].Date, Diff: diff.toFixed(2) });
    }

    movingAverages.sort(sortByDiff);
    setTopList(movingAverages.slice(0, 5));
  };

  useEffect(() => {
    setMovingData(data);
    // console.log('Moving average updated');
  }, [data]);

  useEffect(() => {
    calculateMovingAverages();
  }, [movingData]);

  return (
    <>
      <h4>Moving Average</h4>
      <Table striped hover>
        <thead>
          <tr>
            <th>Date</th>
            <th>Diffence over 5 day Moving Average (%)</th>
          </tr>
        </thead>
        <tbody>
          {topList.map(({ id, Date, Diff }) => (
            <tr key={id}>
              <td>{ `${Date.getDate()}/${Date.getMonth() + 1}/${Date.getFullYear()}` }</td>
              <td>{ Diff }</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

MovingAverage.propTypes = {
  data: PropTypes.array.isRequired,
};

export default MovingAverage;
