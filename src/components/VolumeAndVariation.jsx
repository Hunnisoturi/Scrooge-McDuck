import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';

const VolumeAndVariation = ({ data }) => {
  const [topList, setTopList] = useState([]);

  // TODO: if same volume, pick the one with higher price fluctuation
  const sortByVolume = (a, b) => parseInt(a[2], 10) - parseInt(b[2], 10);

  const calculatePriceDiff = (a) => {
    const high = parseFloat(a[4].replace('$', ''), 10);
    const low = parseFloat(a[5].replace('$', ''), 10);
    return Math.abs(high - low).toFixed(2);
  };

  useEffect(() => {
    const sortData = [];
    data.forEach(row => sortData.push(row));
    const sorted = sortData.sort(sortByVolume).reverse();
    for (let i = 0; i < 5; i += 1) {
      topList.push({
        Date: sorted[i][0],
        Volume: sorted[i][2],
        PriceDiff: calculatePriceDiff(sorted[i]),
      });
    }
  }, [data]);

  return (
    <>
      <h4>Trading days by volume</h4>
      <Table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Volume ($)</th>
            <th>Fluctuation ($)</th>
          </tr>
        </thead>
        <tbody>
          {topList.map(row => (
            <tr key={row.PriceDiff}>
              <td>{ row.Date }</td>
              <td>{ row.Volume }</td>
              <td>{ row.PriceDiff }</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

VolumeAndVariation.propTypes = {
  data: PropTypes.array.isRequired,
};

export default VolumeAndVariation;
