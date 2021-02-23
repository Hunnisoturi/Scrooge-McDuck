import axios from 'axios';

export default axios.create({
  baseUrl: 'https://www.nasdaq.com/api/v1/historical/AAPL/stocks/2020-01-20/2021-01-20',
  headers: {
    'Accept-Encoding': 'deflate',
    'Connection': 'keep-alive',
    'User-Agent': 'Script',
  },
});