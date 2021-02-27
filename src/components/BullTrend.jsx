import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/BullTrend.scss';

const BullTrend = ({ data }) => {
  const [bullData, setBullData] = useState(data);
  const [longest, setLongest] = useState('');

  const calculateBullishTrend = () => {
    let closePrices = [];
    bullData.forEach(row => {
      closePrices.push(row.Close);
    });
    closePrices = closePrices.reverse();

    let streak = 0;
    let longestStreak = 0;

    for (let i = 1; i < closePrices.length; i += 1) {
      if (closePrices[i] > closePrices[i - 1]) {
        streak += 1;
      }
      if (streak > longestStreak) {
        longestStreak = streak;
        streak = 0;
      }
    }
    setLongest(longestStreak);
  };

  useEffect(() => {
    setBullData(data);
  }, [data]);

  useEffect(() => {
    calculateBullishTrend();
  }, [bullData]);

  return (
    <>
      <h4>Longest bullish streak</h4>
      <hr />
      <div className="bull-div">
        <h5>Longest bullish streak was</h5>
        <span className="big-text">{longest}</span>
        <h5>days long</h5>
      </div>
    </>
  );
};

BullTrend.propTypes = {
  data: PropTypes.array.isRequired,
};

export default BullTrend;
