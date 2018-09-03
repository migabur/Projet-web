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


app.get('/changepage/:cat/:name', function(req, res){

  console.log("name "+req.params.name)

  console.log("cat " +req.params.cat)
  fs.readFile('src/test.json', function(err, data){
    if(err){
      return console.log(('error ', err))
    }

    var js = JSON.parse(data);
    console.log(js)
    console.log(js[req.params.cat][req.params.name])
    res.send(js[req.params.cat][req.params.name]);
  })
});

app.get('/editpage', function(req, res){
  //addElementJSON('Good Guys', 'Luigi', 'This is Luigi', 'source');
  removeNameJSON('Good Guys', 'Mario')
})

function addEditNameJSON(cat, name, mainText, mainImage){
  fs.readFile('src/test.json', function(err, data){
    var content = {}
    content[name] = {Text:mainText,image:mainImage};
    var content = JSON.stringify(content);
    console.log('parsed '+content)
    var js = JSON.parse(data)
    js[cat]=JSON.parse(JSON.stringify(js[cat]).substring(0, JSON.stringify(js[cat]).length - 1)+','+content.substring(1));
    console.log('after  '+js[cat])

    console.log('after '+ JSON.stringify(js))
    fs.writeFileSync('src/test.json', JSON.stringify(js));

  })
}

function removeNameJSON(cat, name){
  fs.readFile('src/test.json', function(err, data){
    console.log("ça marche")
    var js = JSON.parse(data)
    delete js[cat][name]
    fs.writeFileSync('src/test.json', JSON.stringify(js));
  }) 
}