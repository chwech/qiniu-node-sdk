const express = require('express')
const cors = require('cors')
const mysql = require('mysql');
const { getBucketsList } = require('./bucket')

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
app.get('/buckets', async (req, res) =>{
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

app.delete('/buckets', (req, res) => {

})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))