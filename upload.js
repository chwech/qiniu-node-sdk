const qiniu = require('qiniu')
const path = require('path')
const token = require('./uploadToken')
const appConfig = require('./config')

// 服务端直传
// 文件上传
function uploadFile(params) {
  var config = new qiniu.conf.Config();
  // 空间对应的机房
  // config.zone = qiniu.zone.Zone_z0;
  config.zone = appConfig.zone.HUA_NAN; // 华南
  // 是否使用https域名
  //config.useHttpsDomain = true;
  // 上传是否使用cdn加速
  //config.useCdnDomain = true;
  var localFile = path.resolve('test.txt');
  var formUploader = new qiniu.form_up.FormUploader(config);
  var putExtra = new qiniu.form_up.PutExtra();
  var key='test.text';
  var uploadToken = token.overwriteUploadToken({
    bucket: appConfig.bucket,
    keyToOverwrite: key
  })
  formUploader.putFile(uploadToken, key, localFile, putExtra, function(respErr,
    respBody, respInfo) {
    if (respErr) {
      throw respErr;
    }
  
    if (respInfo.statusCode == 200) {
      console.log(respBody);
    } else {
      console.log(respInfo.statusCode);
      console.log(respBody);
    }
  });
}

module.exports = {
  uploadFile
}
