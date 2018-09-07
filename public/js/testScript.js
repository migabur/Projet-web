var app = new Vue({
    el: '#app',

    data: {
        titlePage: 'Mario Wiki',
        mainText: 'Welcome to the website MarioWiki. This wiki aims for the community to share it\'s tips and tricks between them.',
        GoodGuys: [],
        BadGuys: [],
        Items: [],
        Maps: [],
        cat: '',
        userName: '',
        image: 'assets/cover_mario.jpg',
        imagealt: 'assets/cover_mario.jpg',
        alertMessage: 'default message',
        displayAlert: false,
        displayLogin: true,
        category: [],
        loggedin: false,
        onHome: true,
        carousel: false,


        Tips: [],

        homeText: 'Welcome to the website MarioWiki. This wiki aims for the community to share it\'s tips and tricks between them.',
        homeImage: 'assets/cover_mario.jpg',
        homeTitle: 'Mario Wiki'
    },
    mounted: function() {
        this.getJSONAll()

    },
    methods: {

        getJSONAll: function() {

            var _this = this
            var jsonFile = new Promise((resolve) => { getJSONAsString(resolve) }).then(function(value) {
                var js = JSON.parse(value)
                for (var cat in js) {
                    if (js.hasOwnProperty(cat)) {
                        _this.category.push(cat)
                    }
                }
                for (var gG in js["Good Guys"]) {
                    if (js["Good Guys"].hasOwnProperty(gG)) {
                        _this.GoodGuys.push(gG)
                    }
                }
                for (var bG in js["Bad Guys"]) {

                    _this.BadGuys.push(bG)

                }
                for (var i in js["Items"]) {

                    _this.Items.push(i)

                }
                for (var map in js["Maps"]) {

                    _this.Maps.push(map)

                }
            })
        },


        createPage: function(submitEvent) {
            var cate = submitEvent.target.elements.cat.value
            var name = submitEvent.target.elements.pageName.value
            var text = submitEvent.target.elements.pageText.value
            var image = submitEvent.target.elements.image.value

            this.$http.post('/createPage', { cat: cate, titlePage: name, textEdit: text, image: image }).then(function(response) {
                this.GoodGuys = []
                this.BadGuys = []
                this.category = []
                this.Items = []
                this.Maps = []
                this.getJSONAll();
                this.alertMessage = response.body;
                this.displayAlert = true;
            });
        },

        changePage: function(id) {
            /*var xhr = new XMLHttpRequest();
            xhr.open('GET', '/editpage', true);
            xhr.send(null);
            xhr.onreadystatechange = function(){

            }},*/
            this.onHome = false
            var _this = this;
            var xhr = new XMLHttpRequest();

            xhr.open('GET', '/changepage/' + id, true);

            xhr.send(null)
            xhr.onreadystatechange = function() {
                // XMLHttpRequest.DONE === 4

                if (this.readyState === XMLHttpRequest.DONE) {
                    if (this.status === 200) {
                        var js = JSON.parse(this.responseText)
                        var tempString = id.split('/')
                        tempString = tempString[1]
                        _this.cat = id.substring(0, id.indexOf('/'))
                        _this.titlePage = tempString
                        _this.image = js.image
                        _this.mainText = js["Text"]; //JSON.parse(this.responseText).EmployeeId;
                        _this.imageTips = [];
                        _this.carousel = false
                        for (var tip in js.tips) {
                            var obj = { image: js.tips[tip].image, text: js.tips[tip].text }
                            _this.Tips.push(obj)
                            _this.carousel = true
                        }

                    } else {
                        console.log("Status de la réponse: %d (%s)", this.status, this.statusText);
                    }
                }


            }


        },

        createAccount: function(submitEvent) {
            var userName = submitEvent.target.elements.login.value
            var password = submitEvent.target.elements.password.value
            var password2 = submitEvent.target.elements.password2.value
            this.$http.post('/createUser', { usr: userName, pwd1: password, pwd2: password2 }).then(function(response) {
                this.alertMessage = response.body;
                this.displayAlert = true;

            })
        },

        logout: function() {
            this.displayLogin = !(this.displayLogin)
            this.$http.post('/logout', { usr: this.userName }).then(function(response) {
                this.alertMessage = response.body;
                this.displayAlert = true;
                this.userName = ""
                this.loggedin = false

            })
        },

        login: function(submitEvent) {
            var usr = submitEvent.target.elements.user.value
            var pwd = submitEvent.target.elements.password.value
            this.$http.post('/login', { password: pwd, login: usr }).then(function(response) {
                this.alertMessage = response.body;
                this.displayAlert = true;
                if (response.bodyText === "Logged in") {
                    this.userName = usr
                    this.displayLogin = !(this.displayLogin)
                    console.log('LOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOG INNNNNNNNNNNNN')
                    this.loggedin = true

                } else { console.log('NOTTTTTTTTTTTTTTTT LOGGGGGGGGGGG INNNNNNNNNNNN') }

            });
        },

        editPage: function() {
            console.log('cat   ' + this.cat + this.mainText)
            this.$http.post('/editPage', { cat: this.cat, titlePage: this.titlePage, textEdit: this.mainText, image: this.image }).then(function(response) {
                this.alertMessage = response.body;
                this.displayAlert = true;
            });
        },

        deletePage: function() {
            this.$http.post('/deletePage', { cat: this.cat, titlePage: this.titlePage }).then(function(response) {
                this.GoodGuys = []
                this.BadGuys = []
                this.category = []
                this.Items = []
                this.Maps = []

                this.getJSONAll();
                this.alertMessage = response.body;
                this.displayAlert = true;
            })
        },

        getJsonObject: function(cb) {
            var request = new XMLHttpRequest();

            request.open('GET', 'js/test.json', true);
            request.send(null);
            request.onreadystatechange = function() {
                if (request.readyState === 4 && request.status === 200) {
                    var type = request.getResponseHeader('Content-Type');

                    try {

                        cb(request.responseText);
                    } catch (err) {
                        cb(err);
                    }
                }
            }

        }

    }

})



async function getJSONAsString(resolve) {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (this.readyState === XMLHttpRequest.DONE) {
            if (this.status === 200) {
                console.log('type ' + xhr.getResponseHeader('Content-Type'))

                setTimeout(() => resolve(this.responseText), 1)
                resolve(this.responseText);
            } else {
                console.log("Status de la réponse: %d (%s)", this.status, this.statusText);
            }
        }
    }
    xhr.open('GET', '/getJSON', true);
    xhr.send(null)
}