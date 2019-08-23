const axios = require('axios')
const { getAccessToken } = require('../index')

const qboxAxios = axios.create({
  baseURL: 'http://rs.qbox.me'
})
const qiniuAxios = axios.create({
  baseURL: 'http://rs.qiniu.com'
})
qboxAxios.interceptors.request.use(function (config) {
  config.headers.Authorization = `QBox ${getAccessToken(config.baseURL + config.url)}`
  return config
}, function (error) {
  return Promise.reject(error)
});
qiniuAxios.interceptors.request.use(function (config) {
  config.headers.Authorization = `QBox ${getAccessToken(config.baseURL + config.url)}`
  return config
}, function (error) {
  return Promise.reject(error)
});

module.exports = {
  qboxAxios,
  qiniuAxios
}