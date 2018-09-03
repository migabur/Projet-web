var app = new Vue({
	el:'#app',

	data:{
		mainText:'Mensarum enim voragines et vari'
	},
	methods: {

		dostuff:function(id){
			var xhr = new XMLHttpRequest();
			xhr.open('GET', '/editpage', true);
			xhr.send(null);
			xhr.onreadystatechange = function(){

			}},
			/*console.log(id)
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

    				_this.mainText=js["Text"];//JSON.parse(this.responseText).EmployeeId;
    			} else {
    				console.log("Status de la réponse: %d (%s)", this.status, this.statusText);
    			}
    		}


}


},*/
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