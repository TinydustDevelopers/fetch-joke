var request = require('request')
var restify = require('restify')

const API_URL = 'http://api.laifudao.com/open/xiaohua.json'

var app = restify.createServer({
  name: 'jokes'
})

app.get('/joke', (req, res) => {
  request(API_URL, (err, response, body) => {
    if (err) {
      console.error(err)
      return res.send({
        type: 'Error',
        data: [{
          code: 102,
          message: err.toString()
        }]
      })
    }

    if (response.statusCode === 200) {
      var jokes = JSON.parse(body)
      var joke = jokes[ Math.floor(Math.random() * jokes.length) ]

      return res.send({
        type: 'Text',
        data: [ joke.content.trim().replace(/"/g, '\"').replace(/<br\/>/g, '') ]
      })
    } else {
      return res.send({
        type: 'Error',
        data: [{
          code: 601,
          message: body
        }]
      })
    }
  })
})

app.listen(3000, () => {
  console.log('listening at 3000')
})
