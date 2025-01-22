import axios from "axios";

const instance = axios.create({
  baseURL: 'http://localhost:1488'
})

export default instance
