import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const BullTrend = ({ data }) => {
  const [longest, setLongest] = useState('');
  const calculateBullishTrend = () => {
    let closePrices = [];
    data.forEach(row => {
      const item = row[1].replace('$', '');
      closePrices.push(parseFloat(item));
    });
    closePrices = closePrices.reverse();

    // console.log(closePrices);

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
    setLongest(`Longest bullish streak lasted for ${longestStreak} days`);
  };

  useEffect(() => {
    calculateBullishTrend();
  }, [data]);

  return (
    <>
      <h4>Longes bullish streak</h4>
      <div>
        {longest}
      </div>
    </>
  );
};

BullTrend.propTypes = {
  data: PropTypes.array.isRequired,
};

export default BullTrend;
