const { qboxAxios, qiniuAxios, apiQiniuAxios } = require('./index')

/**
 * 获取存储空间列表
 * @date 2019-08-23
 * @returns 
 */
async function getBucketsList() {
  const url = '/buckets'
  try {
    const { data, status } = await qboxAxios.get(url)
    if (status === 200) {
      // data.forEach(item => {
      //   pool.query(`INSERT INTO qn_buckets (bucket) values ('${item}')`, function (error, results, fields) {
      //     if (error) throw error;
      //     console.log(results);
      //   })
      // })
      return data
    } else {
      return Promise.reject('获取buckets列表失败')
    }
  } catch (error) {
    console.log('get buckets error', error)
  }
}

/**
 * 新增存储空间
 * @date 2019-08-23
 * @param {string} bucketName 存储空间名称，需要url安全的base64编码
 * @param {string} region 存储区域，默认华东
 * @returns 
 */
async function addBucket(bucketName, region) {
  let url = `/mkbucketv2/${bucketName}`
  if (region) {
    url += `/region/${region}`
  }
  try {
    const { status } = await qiniuAxios.post(url)
    return status
  } catch (error) {
    if (error.response) {
      // 请求已发出，但服务器响应的状态码不在 2xx 范围内
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
      return error.response.status
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
  }
}

/**
 * 删除存储空间
 * @date 2019-08-26
 * @param {string} bucketName
 * @returns 
 */
async function deleteBucket(bucketName) {
  try {
    let { status } = await qiniuAxios.post(`/drop/${bucketName}`)
    return status
  } catch (error) {
    console.log('deleteBucket error', error)
  }
}

/**
 * 获取存储空间域名列表
 * @date 2019-08-27
 * @param {string} bucketName
 * @returns 
 */
async function getDomain(bucketName) {
  try {
    const data = await apiQiniuAxios.get(`/v6/domain/list?tbl=${encodeURIComponent(bucketName)}`)
    return data
  } catch (error) {
    console.log('get domain error', error)
  }
}

module.exports = {
  getBucketsList,
  addBucket,
  deleteBucket,
  getDomain
}