const axios = require('axios')
const crypto = require('crypto');
const keys = require('./ak-sk')
const { URL } = require('url');

const accessTokenAcache = {}
function getAccessToken(url) {
  url = new URL(url)
  let path = url.pathname
  if (url.search) {
    path += url.search
  }
  if (accessTokenAcache[path]) {
    return accessTokenAcache[path]
  }
  // 签名内容
  const signingStr = `${path}\n`
  // 使用sk进行HMAC-SHA1签名：
  const hmac = crypto.createHmac('sha1', keys.sk);
  hmac.update(signingStr);
  let sign = hmac.digest('base64');
  console.log('sign', sign);
  console.log('=============================================');
  // URL安全的Base64编码
  encodedSign = sign.replace(/\+/g, '-').replace(/\//g, '_')
  console.log('encodedSign', encodedSign);
  console.log('=============================================');
  // 和ak拼接
  const accessToken = `${keys.ak}:${encodedSign}`
  accessTokenAcache[path] = accessToken
  console.log('accessToken', accessToken)
  console.log('=====================================');
  return accessToken
}
async function getBucketsList(params) {
  const url = 'http://rs.qbox.me/buckets'
  try {
    const { data, status } = await axios.get(url, {
      headers: {
        'Authorization': `QBox ${getAccessToken(url)}`
      }
    })
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

async function addBucket(params) {
  const url = `/mkbucketv2/<EncodedBucketName>/region/<Region>`
}

module.exports = {
  getBucketsList,
  addBucket
}