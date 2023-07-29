import axios from 'axios'
import Cookies from 'js-cookie'
import { toast } from 'vue3-toastify'

const client = axios.create({
  baseURL: import.meta.env.VITE_API__BASE_URL,
  timeout: 20000
})

client.interceptors.request.use(
  async (config: any) => {
    if (config.method == 'get') {
      // const currentTime = new Date().getTime();
      const oldUrl: any = config.url
      let newUrl = config.url
      if (oldUrl.includes('?')) {
        newUrl = `${oldUrl}`
      } else {
        newUrl = `${oldUrl}`
      }
      config.url = newUrl
    }

    const accessToken = Cookies.get('token')
    const cloneConfig = { ...config }
    if (accessToken) {
      cloneConfig.headers.authorization = `Bearer ${accessToken}`
    }

    cloneConfig['mode'] = 'cors'
    cloneConfig.headers['Access-Control-Allow-Origin'] = '*'
    cloneConfig.headers['Access-Control-Allow-Headers'] =
      'Origin, X-Requested-With, Content-Type, Accept'

    return cloneConfig
  },
  (error: any) => {
    Promise.reject(error)
  }
)

client.interceptors.response.use(
  (response: any) => response,
  (error: any) => responseErrorHandler(error)
)

const responseErrorHandler = async (error: any) => {
  if (error?.response?.status === 401 && !error?.response?.config?.url.includes('login')) {
    toast.info('Phiên làm việc của bạn đã kết thúc, đề nghị đăng nhập lại')
    localStorage.clear()
    window.sessionStorage.clear()
    Cookies.remove('token')
    setTimeout(() => {
      location.href = 'login'
    }, 1500)
  } else if (error?.code === 'ECONNABORTED') {
    // alertError(ERROR_TIMEOUT);
  } else {
    // alertError(error?.response?.data?.message || ERROR_TIMEOUT);
  }
  return Promise.reject(error?.response?.data || '')
}

export default client
