import axios from 'axios'

const baseURL = "http://localhost:5000"
const fetchAllData = async ()=>{
    const result = await axios.get(`${baseURL}/api/query`);
    return result
}

export default {fetchAllData}