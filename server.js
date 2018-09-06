const path = require('path')
const express = require('express')
const exphbs = require('express-handlebars')
const fs = require('fs');


const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.json())
const port = 3000
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));


app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname + '/views/layouts/main.html'))
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

app.post('/editPage', function(req, res){
  console.log('body'+req.body.cat)
  editNameJSON(req.body.cat, req.body.titlePage, req.body.textEdit, req.body.image);
  //removeNameJSON('Good Guys', 'Mario')
})

app.post('/addPage',function(req, res){
  addNameJSON(req.body.cat, req.body.titlePage, req.body.textEdit, req.body.image);
})


app.get('/getJSON', function(req, res){
    fs.readFile('src/test.json', function(err, data){
    if(err){
      return console.log(('error ', err))
    }

    res.send(data);
  })
})

function addNameJSON(cat, name, mainText, mainImage){
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

function editNameJSON(cat, name, mainText, mainImage){
  fs.readFile('src/test.json', function(err, data){
    var js = JSON.parse(data)
    console.log('js   '+js)
    console.log('cat' +cat)
    console.log('name'+name)
    js[cat][name].Text=mainText;
    js[cat][name].image=mainImage;
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