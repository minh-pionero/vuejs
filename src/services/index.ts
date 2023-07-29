import axios from 'axios'

const clientAPI = () => {
  const API_URL = ''

  return axios.create({
    baseURL: API_URL,
    withCredentials: false,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
}

export default clientAPI
