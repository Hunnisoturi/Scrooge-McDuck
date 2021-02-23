import axios from 'axios';

const fetchStockData = () => (
  axios.get('https://www.nasdaq.com/api/v1/historical/AAPL/stocks/2020-01-20/2021-01-20')
);

export default {
  fetchStockData,
};