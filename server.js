const path = require('path')
const express = require('express')
const exphbs = require('express-handlebars')
const fs = require('fs');


const app = express()

app.use(express.static('public'));

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname + '/views/layouts/main.html'))
})

const port = 3000

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})

app.get('/', (request, response) => {
  response.render('main', {
  })
})

const users = []
app.post('/users', function (req, res){
  const user = req.body
  users.push({
    name: user.name,
    age: user.age
  })
  res.send('successfully registered')
})


app.get('/json/:tagId', function(req, res){
  res.send(req.params.tagId)
  /*fs.readFile('src/test.json', function(err, data){
    res.send(data);
  })*/
});