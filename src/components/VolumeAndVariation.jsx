import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import PropTypes from 'prop-types';

const VolumeAndVariation = ({ data }) => {
  const [volumeData, setVolumeData] = useState(data);
  const [topList, setTopList] = useState([]);

  const sortByVolumeAndPriceDiff = (a, b) => a.Volume === b.Volume
    ? b.calculatePriceDiff() - a.calculatePriceDiff() : b.Volume - a.Volume;

  const calculatePriceDiff = a => Math.abs(a.High - a.Low).toFixed(2);

  const populateTopList = () => {
    const sortData = [];
    volumeData.forEach(row => sortData.push(row));
    const sorted = sortData.sort(sortByVolumeAndPriceDiff);
    const temp = [];
    for (let i = 0; i < 5; i += 1) {
      temp.push({
        id: sorted[i].id,
        Date: sorted[i].Date,
        Volume: sorted[i].Volume,
        PriceDiff: calculatePriceDiff(sorted[i]),
      });
    }
    return temp;
  };

  useEffect(() => {
    setVolumeData(data);
  }, [data]);

  useEffect(() => {
    setTopList(populateTopList());
  }, [volumeData]);

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
          {topList.map(({ id, Date, Volume, PriceDiff }) => (
            <tr key={id}>
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
