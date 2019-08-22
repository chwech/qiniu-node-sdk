const qiniu = require('qiniu')
const config = require('./config')

// 生成客户端上传所需要的上传凭证
// 1. 简单的上传凭证
//自定义凭证有效期（示例2小时，expires单位为秒，为上传凭证的有效时间）
function generateSimpleUploadToken(opts = {
  bucket: config.bucket, expires: 7200
}) {
  const options = {
    scope: opts.bucket,
    expires: opts.expires
  };
  const putPolicy = new qiniu.rs.PutPolicy(options);
  const uploadToken = putPolicy.uploadToken(config.mac);
  console.log('uploadToken', uploadToken);
  console.log('===================================');
  return uploadToken
}
// 2. 覆盖上传的凭证
function overwriteUploadToken(opts) {
  const options = {
    scope: opts.bucket + ":" + opts.keyToOverwrite
  }
  const putPolicy = new qiniu.rs.PutPolicy(options);
  const uploadToken = putPolicy.uploadToken(config.mac);
  console.log('uploadToken', uploadToken);
  console.log('===================================');
  return uploadToken
}

module.exports = {
  generateSimpleUploadToken,
  overwriteUploadToken
}