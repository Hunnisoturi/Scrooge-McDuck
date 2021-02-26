import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import PropTypes from 'prop-types';

const VolumeAndVariation = ({ data }) => {
  const [volumeData, setVolumeData] = useState(data);
  const [topList, setTopList] = useState([]);

  // TODO: if same volume, pick the one with higher price fluctuation
  const sortByVolume = (a, b) => b.Volume - a.Volume;

  const calculatePriceDiff = a => {
    const high = a.High;
    const low = a.Low;
    return Math.abs(high - low).toFixed(2);
  };

  const populateTopList = () => {
    const sortData = [];
    volumeData.forEach(row => sortData.push(row));
    const sorted = sortData.sort(sortByVolume);
    const temp = [];
    for (let i = 0; i < 5; i += 1) {
      temp.push({
        Date: sorted[i].Date,
        Volume: sorted[i].Volume,
        PriceDiff: calculatePriceDiff(sorted[i]),
      });
    }
    setTopList(temp);
  };

  useEffect(() => {
    setVolumeData(data);
    console.log('Volume updated');
    populateTopList();
  }, [data]);

  return (
    <>
      <h4>Trading days by volume</h4>
      <Table striped hover>
        <thead>
          <tr>
            <th>Date</th>
            <th>Volume ($)</th>
            <th>Fluctuation ($)</th>
          </tr>
        </thead>
        <tbody>
          {topList.map(({ Date, Volume, PriceDiff }) => (
            <tr key={PriceDiff}>
              <td>{ `${Date.getDate()}/${Date.getMonth() + 1}/${Date.getFullYear()}` }</td>
              <td>{ Volume }</td>
              <td>{ PriceDiff }</td>
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
