const upload = require('./upload')

// 校验七牛上传回调的Authorization
// @param mac           AK&SK对象
// @param requestURI   回调的URL中的requestURI
// @param reqBody      请求Body，仅当请求的ContentType为
//                     application/x-www-form-urlencoded时才需要传入该参数
// @param callbackAuth 回调时请求的Authorization头部值
// exports.isQiniuCallback = function(mac, requestURI, reqBody, callbackAuth) {
//   var auth = exports.generateAccessToken(mac, requestURI, reqBody);
//   return auth === callbackAuth;
// }

upload.uploadFile()


