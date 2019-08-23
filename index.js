// const upload = require('./upload')
const crypto = require('crypto');
const keys = require('./ak-sk')
const { URL } = require('url');

function base64EncodeForUrlSafe(base64) {
  encoded = base64.replace(/\+/g, '-').replace(/\//g, '_')
  return encoded
}
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
  encodedSign = base64EncodeForUrlSafe(sign)
  console.log('encodedSign', encodedSign);
  console.log('=============================================');
  // 和ak拼接
  const accessToken = `${keys.ak}:${encodedSign}`
  accessTokenAcache[path] = accessToken
  console.log('accessToken', accessToken)
  console.log('=====================================');
  return accessToken
}

// upload.uploadFile()

module.exports = {
  getAccessToken,
  base64EncodeForUrlSafe
}
