const qiniu = require('qiniu')
const config = require('./config')

function getPublicUrl(key = 'test.text') {
  var conf = new qiniu.conf.Config();
  var bucketManager = new qiniu.rs.BucketManager(config.mac, conf);
  
  // 公开空间访问链接
  var publicDownloadUrl = bucketManager.publicDownloadUrl(config.bucketDomain, key);
  console.log('publicDownloadUrl', publicDownloadUrl);
  console.log('=============================================')
  return publicDownloadUrl
}

function getPrivateUrl(key, expires = 3600) {
  var conf = new qiniu.conf.Config();
  var bucketManager = new qiniu.rs.BucketManager(config.mac, conf);
  var deadline = parseInt(Date.now() / 1000) + expires; // 1小时过期

  var privateDownloadUrl = bucketManager.privateDownloadUrl(config.bucketDomain, key, deadline);
  return privateDownloadUrl
}
module.exports = {
  getPublicUrl,
  getPrivateUrl
}