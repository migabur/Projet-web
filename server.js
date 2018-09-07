const path = require('path')
const express = require('express')
const bodyparser = require('body-parser')
const exphbs = require('express-handlebars')
const fs = require('fs')
const swal = require('sweetalert2');
const jsdom = require('jsdom');
const $ = require('jquery');
var userList = JSON.parse(fs.readFileSync('users.json', 'utf8'));
var isUserLoggedIn = false;

const app = express()

app.use(bodyparser.urlencoded({ extended: true }));

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
console.log(userList.users[0].login);

/*app.get('/', (request, response) => {
  response.render('main', {
  })        
})                 a quoi ca sert ca?*/ 



/*const users = []
app.post('/users', function (req, res){
  const user = req.body
  users.push({
    name: user.name,
    age: user.age
  })
  res.send('successfully registered')
})*/

app.post('/users.html', function(req,res){
  var login = req.body.login;
  var password = req.body.password;
  var password2 = req.body.password2;
  if (password == password2) {
    existingUser=false;
    for (var i = userList.users.length - 1; i >= 0; i--) {
      if(userList.users[i].login==login){
        existingUser=true;
      }
    }
    if(existingUser){console.log("login already taken, pick another one")}
    else{
      var newUser = {
        "login":login,
        "password":password
      }
      userList.users.push(newUser);
    }
  } else {console.log("passwords do not match, try again")}
  console.log(userList);
})

app.post('/login.html', function(req,res){
  var login = req.body.login;
  var password = req.body.password;
  logMatch=false;
  for (var i = userList.users.length - 1; i >= 0; i--) {
    if(userList.users[i].login==login && userList.users[i].password==password){
      logMatch=true;
    }
  }
  if(logMatch){
    console.log("login successful")
    //$(".btn-lg").hide();                      ca c'est le jquery pour cacher les boutons et la fenetre mais ca marche pas
    //$(".modal").hide();                       jquery a besoin d'un document j'arrive pas le faire
  }
  else{console.log("login and password do not match, try again")}
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

app.put('/editpage', function(req, res){
  addEditNameJSON('Good Guys', 'Luigi', 'This is Luigi', 'source');
  //removeNameJSON('Good Guys', 'Mario')
})

app.post('/AddName',function(res, res){

})


app.get('/getJSON', function(req, res){
    fs.readFile('src/test.json', function(err, data){
    if(err){
      return console.log(('error ', err))
    }
    var json =JSON.parse(data)
    console.log(json)
    //res.setHeader('Content-Type', 'application/json')

    res.send(json);
  })
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