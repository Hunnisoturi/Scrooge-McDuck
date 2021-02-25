import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import PropTypes from 'prop-types';

// TODO: Calculation starts from the 5th day, fix with picking date range accordingly

const MovingAverage = ({ data }) => {
  const [topList, setTopList] = useState([]);

  const getPercentageDiff = (a, b) => {
    if (a > b) {
      return Math.abs(((a - b) / a) * 100);
    }
    return -Math.abs(((a - b) / a) * 100);
  };

  const sortByDiff = (a, b) => parseFloat(b.Diff) - parseFloat(a.Diff);

  const calculateMovingAverages = () => {
    const newData = [];
    data.forEach(row => newData.push(row));
    const movingAverages = [];
    for (let i = 5; i < newData.length; i += 1) {
      const mean = (parseFloat(newData[i - 1][1].replace('$', ''))
        + parseFloat(newData[i - 2][1].replace('$', ''))
        + parseFloat(newData[i - 3][1].replace('$', ''))
        + parseFloat(newData[i - 4][1].replace('$', ''))
        + parseFloat(newData[i - 5][1].replace('$', ''))
      ) / 5;
      const diff = getPercentageDiff(parseFloat(newData[i][3].replace('$', '')), mean);
      movingAverages.push({ Date: newData[i][0], Diff: diff.toFixed(2) });
    }

    movingAverages.sort(sortByDiff);
    setTopList(movingAverages.slice(0, 5));
  };

  useEffect(() => {
    calculateMovingAverages();
  }, [data]);

  return (
    <>
      <h4>MovingAverage</h4>
      <Table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Diffence over 5 day Moving Average (%)</th>
          </tr>
        </thead>
        <tbody>
          {topList.map(row => (
            <tr key={row.Date}>
              <td>{ row.Date }</td>
              <td>{ row.Diff }</td>
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
