var app = new Vue({
	el:'#app',

	data:{
		titlePage:'',
		mainText:'Mensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et variMensarum enim voragines et vari',
		GoodGuys:[],
		cat:'',
		userName:'',
		image:'',
		alertMessage:'default message',
		displayAlert:false,
		displayLogin:true,
		category:[]
	},
	mounted:function(){
		this.getJSONAll()

		/*.then(function(data){
			this.GoodGuys=data["Good Guys"]
			console.log(GoodGuys)
		})*/

	},
	methods: {

		getJSONAll: function(){

			var _this = this
			var jsonFile = new Promise((resolve)=>{getJSONAsString(resolve)}).then(function(value){
			var js = JSON.parse(value)
			for  (var cat in js)
			{
				if(js.hasOwnProperty(cat)){
					console.log(cat)
					_this.category.push(cat)
				}
			}
			console.log(js)
			for  (var gG in js["Good Guys"])
			{
				if(js["Good Guys"].hasOwnProperty(gG)){
					console.log(gG)
					_this.GoodGuys.push(gG)
				}
			}
			console.log(_this.GoodGuys)
		})
		},


		createPage:function(submitEvent){
			var cate=submitEvent.target.elements.cat.value
			var name=submitEvent.target.elements.pageName.value
			var text=submitEvent.target.elements.pageText.value
			var image=submitEvent.target.elements.image.value
			console.log('cat   ' +cate+text)
			this.$http.post('/createPage', {cat: cate, titlePage: name, textEdit:text,image:image}).then(function(response){
				 this.GoodGuys=[]
 		this.getJSONAll();
				 										this.alertMessage=response.body;
				this.displayAlert=true;
			});
		},
		
		changePage:function(id){
			/*var xhr = new XMLHttpRequest();
			xhr.open('GET', '/editpage', true);
			xhr.send(null);
			xhr.onreadystatechange = function(){

			}},*/

			console.log(id)
			var _this = this;
			var xhr = new XMLHttpRequest();
			console.log('/changepage/'+id)

			xhr.open('GET', '/changepage/'+id, true);

			xhr.send(null)
			xhr.onreadystatechange = function() {
    		// XMLHttpRequest.DONE === 4

    		if (this.readyState === XMLHttpRequest.DONE) {
    			if (this.status === 200) {
    				console.log(xhr.getResponseHeader('Content-Type'))
    				var js = JSON.parse(this.responseText)
    				  console.log(js)
    				  var tempString = id.split('/')
    				  console.log("temp string "+id)
    				  tempString=tempString[1]
    				  _this.cat = id.substring(0,id.indexOf('/'))
    				  console.log("cat     "+_this.cat)
    				_this.titlePage=tempString
    				_this.mainText=js["Text"];//JSON.parse(this.responseText).EmployeeId;
    			} else {
    				console.log("Status de la réponse: %d (%s)", this.status, this.statusText);
    			}
    		}


}


},

		createAccount:function(submitEvent){
			var userName=submitEvent.target.elements.login.value
			var password=submitEvent.target.elements.password.value
			var password2=submitEvent.target.elements.password2.value
			this.$http.post('/createUser', {usr:userName, pwd1:password,pwd2:password2}).then(function(response){
								this.alertMessage=response.body;
				this.displayAlert=true;

			})
		},
		login:function(submitEvent){
			var usr = submitEvent.target.elements.user.value
			var pwd = submitEvent.target.elements.password.value
			this.$http.post('/login', {password: pwd, login: usr}).then(function(response) {
				this.alertMessage=response.body;
				this.displayAlert=true;
				if(response.bodyText==="Logged in"){
					this.userName=usr
					this.displayLogin=!(this.displayLogin)
					console.log('LOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOG INNNNNNNNNNNNN')
				}
				else{console.log('NOTTTTTTTTTTTTTTTT LOGGGGGGGGGGG INNNNNNNNNNNN')}

			});
		},

		editPage:function(){
			console.log('cat   ' +this.cat+this.mainText)
			this.$http.post('/editPage', {cat: this.cat, titlePage: this.titlePage, textEdit:this.mainText,image:this.image}).then(function(response){
				 										this.alertMessage=response.body;
				this.displayAlert=true;
			});
		},
		/*dostuff:function(){
		var _this = this;
		this.getJsonObject(function(object){
     	//Do what you want with the object here

     	console.log(object.EmployeeId)
     	_this.mainText=object.EmployeeId
		console.log(_this.mainText)
     	console.log(object);
     });

 },*/
 deletePage:function(){
 	this.$http.post('/deletePage', {cat : this.cat, titlePage:this.titlePage}).then(function(response){
 		this.GoodGuys=[]
 		this.getJSONAll();
 										this.alertMessage=response.body;
				this.displayAlert=true;
 	})
 },

 getJsonObject: function(cb){
 	var request = new XMLHttpRequest();

 	request.open('GET', 'js/test.json', true);
 	request.send(null);
 	request.onreadystatechange = function () {
 		console.log(request.status)
 		if (request.readyState === 4 && request.status === 200) {
 			var type = request.getResponseHeader('Content-Type');

 			try {

 				cb(request.responseText);
 			}catch(err) {
 				cb(err);
 			}
 		}
 	}

 }

}

})



async function getJSONAsString(resolve){
	var xhr = new XMLHttpRequest();

	xhr.onreadystatechange = function(){
	if (this.readyState === XMLHttpRequest.DONE) {
    			if (this.status === 200) {
    				console.log('type '+xhr.getResponseHeader('Content-Type'))
    				console.log('this.responseText  '+this.responseText)
    				console.log(typeof(this.responseText))
    				setTimeout(() => resolve (this.responseText), 1)
    				resolve(this.responseText);
    			} else {
    				console.log("Status de la réponse: %d (%s)", this.status, this.statusText);
    			}
    		}
	}
		xhr.open('GET', '/getJSON', true);
	xhr.send(null)
}
