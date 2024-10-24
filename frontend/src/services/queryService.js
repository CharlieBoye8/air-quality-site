import axios from 'axios';
const baseURL = 'http://localhost:5000/';

const fetchAllData = async () => {
    const result = await axios.get(`${baseURL}api/query/allData`);
    return result;
}

const sendData = async (data) => {
    const result = await axios.post(`${baseURL}api/query/sendData`)
}
export default { fetchAllData, sendData };
