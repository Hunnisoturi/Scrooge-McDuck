import Danxios from './danxios';

const uploadCSVData = (data) => (
  Danxios.post('/upload', data)
);

export default {
  uploadCSVData,
}
