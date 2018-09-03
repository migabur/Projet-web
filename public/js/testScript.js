var app = new Vue({
	el:'#app',

	data:{
		mainText:'Mensarum enim voragines et vari'
	},
	methods: {

		dostuff:function(){

			var _this = this;
			var xhr = new XMLHttpRequest();

			xhr.open('GET', '/json', true);
												console.log("1")

			xhr.send(null)
			xhr.onreadystatechange = function() {
    		// XMLHttpRequest.DONE === 4
    		    			console.log(this.readyState)

    				if (this.readyState === XMLHttpRequest.DONE) {
    			console.log(this.status)
    			if (this.status === 200) {
    				console.log(xhr.getResponseHeader('Content-Type'))
    				_this.mainText=JSON.parse(this.responseText).EmployeeId;
    			} else {
    				console.log("Status de la réponse: %d (%s)", this.status, this.statusText);
    			}
    		}


}


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

 getJsonObject: function(cb){
 	var request = new XMLHttpRequest();

 	request.open('GET', 'js/test.json', true);
 	request.send(null);
 	request.onreadystatechange = function () {
 		console.log(request.status)
 		if (request.readyState === 4 && request.status === 200) {
 			var type = request.getResponseHeader('Content-Type');

 			try {

 				cb(JSON.parse(request.responseText));
 			}catch(err) {
 				cb(err);
 			}
 		}
 	}

 }

}

})