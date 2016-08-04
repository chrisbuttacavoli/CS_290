document.addEventListener('DOMContentLoaded', bindButtons);

function bindButtons()
{
	document.getElementById('submit').addEventListener('click', function(e) {
		var req = new XMLHttpRequest();
		var payload;
		
		req.open('POST', "http://httpbin.org/post", true);
		req.setRequestHeader('Content-Type', 'application/json');
		req.addEventListener('load',function(){
		if(req.status >= 200 && req.status < 400){
			var response = JSON.parse(req.responseText);
			
			DisplayInfo(response)
        } else {
			console.log("Error in network request: " + request.statusText);
        }});
        
		req.send(JSON.stringify(payload));
		
		e.preventDefault();
	});
}


function DisplayInfo(obj)
{	
	console.log(obj);
	document.getElementById('info').style.display = "block";
	document.getElementById('json').textContent = JSON.stringify(obj);
}