const qiniu = require('qiniu')
const keys = require('./ak-sk')

const config = {
  bucket: 'www-chwech-com',
  bucketDomain: 'http://cdn.chwech.com',
  accessKey: keys.ak,
  secretKey: keys.sk,
  // 机房
  zone: {
    HUA_DONG: qiniu.zone.Zone_z0, // 华东
    HUA_BEI: qiniu.zone.Zone_z1, // 华北
    HUA_NAN: qiniu.zone.Zone_z2, // 华南
    NORTH_AMERICA: qiniu.zone.Zone_na0 // 北美
  }
}

const mac = new qiniu.auth.digest.Mac(config.accessKey, config.secretKey)
config.mac = mac
console.log('mac', mac)
console.log('============================');

module.exports = config
