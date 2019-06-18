import axios from 'axios'
import config from '../config/config'
import store from '../store/store'
export default () => {
  let Axios = axios.create({
    baseURL: config.backendPort
  })
  Axios.interceptors.request.use(
    config => {
      // Do something before request is sent
      config.headers['Authorization'] = 'bearer ' + store.state.token
      return config
    },
    error => {
      console.log('Reject' +
        'Token: ' +
        store.state.token)
      Promise.reject(error)
    }
  )
  return Axios
}
