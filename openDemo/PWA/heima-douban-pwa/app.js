const express = require('express')
const app = express()
const fs = require('fs')
const path = require('path')
app.use(express.static('public'))

// 获取电影的接口，随机返回5条数据
app.get('/api/getMovie', async (req, res) => {
  console.log('接受的请求')
  // 读取data.json文件中的数据
  try {
    const data = await getData()
    const movies = random(data.subjects)
    res.send(movies)
  } catch (e) {
    console.log(e)
    res.end('404')
  }
})

app.listen(8080, () => {
  console.log('服务器启动成功了，访问地址：http://localhost:8080/')
})

function getData() {
  return new Promise((resolve, reject) => {
    const filePath = path.join(__dirname, 'data.json')
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(JSON.parse(data))
      }
    })
  })
}

function random(movies) {
  // 随机5条数据
  return movies.sort(() => Math.random() - 0.5).slice(0, 12)
}
