const path = require('path')
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')

const fs = require('fs')

const app = express()
app.use(bodyParser.json())
 app.use(bodyParser.urlencoded({extended: true}));
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

app.post('/createUser', function(req, res) {
            fs.readFile('src/identification.json', function(err, data) {
                var file = JSON.parse(data)
                if (req.body.pwd1 != req.body.pwd2) {
                    res.send("Password not matching")
                    return

                } else if (checkUserInJSONFile(file, req.body.usr)) {
                    res.send("User already exist")
                    return
                } else {

                    var login = req.body.usr;

                  console.log('LOGIN'+login)
                                      var password = req.body.pwd1;
                    var newUser = {
                        "user": login,
                        "password": password
                    }
                    file.push(newUser)

                    fs.writeFileSync('src/identification.json', JSON.stringify(file));
                    res.send("Account successfully created")
                }
            })
        }
        )

function checkUserInJSONFile(file, userName){
  for (user in file){
    if (user.user===userName){
      return false
    }
  }
  return true
}




app.post('/login', function(req,res){
  fs.readFile('src/identification.json', function(err, data){
  var userList = JSON.parse(data)
  var login = req.body.login;
  var password = req.body.password;

  for (var i = userList.length - 1; i >= 0; i--) {
    console.log(req.body.login)
    console.log(req.body.password)
    if(userList[i].user===login && userList[i].password===password){
      res.send("Logged in")
      return
    }
  }
  res.send("Invalid creditential")
})
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
  console.log('body'+req.body)
   editNameJSON(req.body.cat, req.body.titlePage, req.body.textEdit, req.body.image);
   res.send("Edited page")
  //removeNameJSON('Good Guys', 'Mario')
})

app.post('/createPage',function(req, res){
  var message = addPageJSON(req.body.cat, req.body.titlePage, req.body.textEdit, req.body.image);
  res.send("Created page")

})

app.post('/deletepage', function(req, res){
  removePageJSON(req.body.cat, req.body.titlePage)
  res.send("Page deleted")
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

function editNameJSON(cat, name, mainText, mainImage){
              console.log('cat' +cat)

  fs.readFile('src/test.json', function(err, data){
    var js = JSON.parse(data)
        console.log('js   '+js)
            console.log('cat' +cat)
    console.log('name'+name)
    js[cat][name].Text=mainText;
    js[cat][name].image=mainImage
    console.log('after  '+js[cat])

   console.log('after '+ JSON.stringify(js))
    fs.writeFileSync('src/test.json', JSON.stringify(js));

  })
}

function addPageJSON(cat, name, mainText, mainImage){
  fs.readFile('src/test.json', function(err, data){
        var js = JSON.parse(data)
    var content  = {Text:mainText,image:mainImage};

    console.log('parsed '+content)

        console.log('js   '+js)
    console.log('cat' +cat)
   console.log('name'+name)
    js[cat][name]=content;
    console.log('after  '+js[cat])

    console.log('after '+ JSON.stringify(js))
    fs.writeFileSync('src/test.json', JSON.stringify(js));

  })
}

function removePageJSON(cat, name){
  fs.readFile('src/test.json', function(err, data){
    console.log("ça marche")
    var js = JSON.parse(data)
    delete js[cat][name]
    fs.writeFileSync('src/test.json', JSON.stringify(js));
  }) 
}