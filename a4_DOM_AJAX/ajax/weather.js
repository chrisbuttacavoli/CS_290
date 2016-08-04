var API_key = '67ef4274fb880294e67af728d18e2b4f';

document.addEventListener('DOMContentLoaded', bindButtons);

function bindButtons()
{
	document.getElementById('submit').addEventListener('click', function(e) {
		
		if (document.getElementById('city').value || document.getElementById('zip').value) {
			var req = new XMLHttpRequest();
			var API_Call = '';
			
			if (document.getElementById('city').value)
				API_Call = 'http://api.openweathermap.org/data/2.5/weather?q=' + document.getElementById('city').value;
			else if (document.getElementById('zip').value)
				API_Call = 'http://api.openweathermap.org/data/2.5/weather?zip=' + document.getElementById('zip').value + ',us';
			
			API_Call += '&appid=' + API_key;
			
			console.log(API_Call);
			req.open("POST", API_Call, true);
			req.addEventListener('load',function(){
				if(req.status >= 200 && req.status < 400){
					var response = JSON.parse(req.responseText);
					
					DisplayWeather(JSON.parse(req.responseText));
				} else {
					console.log("Error in network request: " + request.statusText);
			}});
			req.send(null);
		}
		
		e.preventDefault();
	});
}

function DisplayWeather(obj)
{	
	console.log(obj);
	document.getElementById('infoList').style.display = "block";
	document.getElementById('displayCity').textContent = obj.name;
	document.getElementById('temp').textContent = 'Temperature: ' + obj.main.temp + ' K';
	document.getElementById('hum').textContent = 'Humidity: ' + obj.main.humidity + '%';
	document.getElementById('press').textContent = 'Pressure: ' + obj.main.pressure + ' hPa';
}