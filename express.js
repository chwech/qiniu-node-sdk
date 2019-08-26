const express = require('express')
const cors = require('cors')
const mysql = require('mysql');
const { getBucketsList, addBucket, deleteBucket } = require('./http/bucket')
const bodyParser = require('body-parser')
const { base64EncodeForUrlSafe } = require('./index')

const pool  = mysql.createPool({
  connectionLimit : 10,
  host            : 'localhost',
  user            : 'root',
  password        : 'root',
  database        : 'qiniu'
});

pool.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});

const corsOptions = {
  origin: 'http://localhost:8080',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

const app = express()
const port = 3000
app.use(express.static('public'))
app.use(cors(corsOptions))
// parse application/json
app.use(bodyParser.json())

app.get('/bucket', async (req, res) =>{
  let data = await getBucketsList()
  data = data.map(item => {
    return {
      bucket: item
    }
  })
  res.send(data)
  // pool.query(`SELECT * FROM qn_buckets`, function (error, results, fields) {
  //   if (error) throw error;
  //   console.log(results);
  //   res.send(results)
  // })
})

app.delete('/bucket/:bucketName', async (req, res) => {
  const bucketName = req.params.bucketName
  const status = await deleteBucket(bucketName)
  console.log('status', status)
  if (status === 200) {
    res.send({
      code: 20000,
      msg: '删除存储空间成功',
      data: null
    })
  } else {
    res.send({
      code: 50000,
      msg: '删除存储空间失败',
      data: null
    })
  }
})

app.post(`/bucket`, async (req, res) => {
  let { name, zone } =  req.body
  name = Buffer.from(name).toString('base64')
  name = base64EncodeForUrlSafe(name)
  const status = await addBucket(name, zone)
  if (status === 200) {
    res.send({
      code: 200,
      msg: '新增存储空间成功',
      data: null
    })
  } else if (status === 614) {
    res.send({
      code: 20001,
      msg: '存储空间已存在',
      data: null
    })
  } else if (status === 401) {
    res.send({
      code: 40001,
      msg: '未授权，请发送accessToken',
      data: null
    })
  } else if (status === 400) {
    res.send({
      code: 40000,
      msg: '参数错误，name不符合命名规则',
      data: null
    })
  } else if (status === 630) {
    res.send({
      code: 60000,
      msg: '创建失败，最多只能创建20个存储空间',
      data: null
    })
  } else {
    res.send({
      code: 50000,
      msg: '未知错误',
      data: null
    })
  }
})

app.get('/options/zone', (req, res) => {
  pool.query('SELECT * FROM qn_zone', function (error, results, fields) {
    if (error) throw error;
    res.send(results)
  });
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))