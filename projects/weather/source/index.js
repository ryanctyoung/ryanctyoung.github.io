// Do a CORS request to get Davis weather hourly forecast
let apiKey = "18bf3b090acab64995eab99b53e65f83";


// Create the XHR object.
function createCORSRequest(method, url) {
	let xhr = new XMLHttpRequest();
	xhr.open(method, url, true);  // call its open method
	return xhr;
}


// Make the actual CORS request.
function makeCorsRequest() {
	// Default case is davis
	let url = "http://api.openweathermap.org/data/2.5/weather?q=Davis,CA,US&units=imperial&APPID=" + apiKey;

	// Parse user input
	var location = "";
	location = document.getElementById("textbox-location").value;
	console.log(location);

	// Request after getting user input
	if (location != ""){
		console.log("not empty");
		url = "http://api.openweathermap.org/data/2.5/weather?q=" + location + ",US&units=imperial&APPID=" + apiKey;
	}

	let xhr = createCORSRequest('GET', url);

	// checking if browser does CORS
	if (!xhr) {
		alert('CORS not supported');
		return;
	}

	let errorFlag = 0;
	// Load some functions into response handlers.
	xhr.onload = function() {
		let responseStr = xhr.responseText;  // get the JSON string 
		let object = JSON.parse(responseStr);  // turn it into an object

		if (object.cod == "404"){
			errorFlag = 1;
			alert("Not found");
		}
		console.log(object);

		if (errorFlag != 1){
			getCurrentTemp(object);
		}
		//console.log(JSON.stringify(object, undefined, 2));  // print it out as a string, nicely formatted
	};

	xhr.onerror = function() {
		alert('Woops, there was an error making the request.');
	};

	// Actually send request to server
	xhr.send();

	forecastRequest();
}


// Gets the current temperature
function getCurrentTemp(object) {
	let currentTemp = Math.trunc(object.main.temp);
	console.log(currentTemp);

	// To get the current time
	let currentTime = new Date();
	currentTime = currentTime.getHours();

	// Midnight case
	if (currentTime == 0){
		currentTime = "12AM";
	}
	// PM case
	else if (currentTime > 12){
		currentTime = currentTime - 12;
		currentTime = currentTime + "PM";
	}
	// AM case
	else{
		currentTime = currentTime + "AM";
	}
	// Put into HTML
	console.log(currentTime);
	document.getElementById("current-time-para").innerHTML = currentTime;

	// Call weather
	getWeatherImage(object.weather, "current-image");
	document.getElementById("current-temp").innerHTML = currentTemp + "&deg";
}


function getWeatherImage(weather, weatherID) {
 	let currentIcon = weather[0].icon;
 	console.log("Icon " + currentIcon);

 	// Map the description to an image
 	const picID = weatherID + "-picture";
 	switch (currentIcon){
 		case "01d":
 			document.getElementById(weatherID).innerHTML = "<img id='" + picID +  "' src='../assets/clearsky.svg' alt='clear sky day'>";
			break;
		case "01n":
 			document.getElementById(weatherID).innerHTML = "<img id='" + picID +  "' src='../assets/clear-night.svg' alt='clear sky night'>";
			break;
		case "02d":
 			document.getElementById(weatherID).innerHTML = "<img id='" + picID +  "' src='../assets/fewclouds-day.svg' alt='few clouds day'>";
			break;
		case "02n":
 			document.getElementById(weatherID).innerHTML = "<img id='" + picID +  "' src='../assets/fewclouds-night.svg' alt='few clouds night'>";
			break;
		case "03d":
 			document.getElementById(weatherID).innerHTML = "<img id='" + picID +  "' src='../assets/scatteredclouds.svg' alt='scattered clouds day'>";
			break;
		case "03n":
 			document.getElementById(weatherID).innerHTML = "<img id='" + picID +  "' src='../assets/scatteredclouds.svg' alt='scattered clouds night'>";
			break;
		case "04d":
 			document.getElementById(weatherID).innerHTML = "<img id='" + picID +  "' src='../assets/brokencloud.svg' alt='broken clouds day'>";
			break;
		case "04n":
 			document.getElementById(weatherID).innerHTML = "<img id='" + picID +  "' src='../assets/brokencloud.svg' alt='broken clouds night'>";
			break;
		case "09d":
 			document.getElementById(weatherID).innerHTML = "<img id='" + picID +  "' src='../assets/showerrain.svg' alt='shower rain day'>";
			break;
		case "09n":
 			document.getElementById(weatherID).innerHTML = "<img id='" + picID +  "' src='../assets/showerrain.svg' alt='shower rain night'>";
			break;
		case "10d":
 			document.getElementById(weatherID).innerHTML = "<img id='" + picID +  "' src='../assets/rain-day.svg' alt='rain day'>";
			break;
		case "10n":
 			document.getElementById(weatherID).innerHTML = "<img id='" + picID +  "' src='../assets/rain-night.svg' alt='rain night'>";
			break;
		case "11d":
 			document.getElementById(weatherID).innerHTML = "<img id='" + picID +  "' src='../assets/thunderstorms.svg' alt='thunderstorm day'>";
			break;
		case "11n":
 			document.getElementById(weatherID).innerHTML = "<img id='" + picID +  "' src='../assets/thunderstorms.svg' alt='thunderstorm night'>";
			break;
		case "13d":
 			document.getElementById(weatherID).innerHTML = "<img id='" + picID +  "' src='../assets/snow.svg' alt='snow day'>";
			break;
		case "13n":
 			document.getElementById(weatherID).innerHTML = "<img id='" + picID +  "' src='../assets/snow.svg' alt='snow night'>";
			break;
		case "50d":
 			document.getElementById(weatherID).innerHTML = "<img id='" + picID +  "' src='../assets/mist.svg' alt='mist day'>";
			break;
		case "50n":
 			document.getElementById(weatherID).innerHTML = "<img id='" + picID +  "' src='../assets/mist.svg' alt='mist night'>";
			break;
 	}
}

function forecastRequest() {
	// Default case is davis
	let urlForecast = "http://api.openweathermap.org/data/2.5/forecast/hourly?q=Davis,CA,US&units=imperial&APPID=" + apiKey;

	// Parse user input
	var location2 = "";
	location2 = document.getElementById("textbox-location").value;
	console.log(location2);

	// Request after getting user input
	if (location2 != ""){
		console.log("not empty");
		urlForecast = "http://api.openweathermap.org/data/2.5/forecast/hourly?q=" + location2 + ",US&units=imperial&APPID=" + apiKey;
	}

	let xhr2 = createCORSRequest('GET', urlForecast);

	// checking if browser does CORS
	if (!xhr2) {
		alert('CORS not supported');
		return;
	}

	let errorFlagForecast = 0;
	// Load some functions into response handlers.
	xhr2.onload = function() {
		let responseStr2 = xhr2.responseText;  // get the JSON string 
		let object2 = JSON.parse(responseStr2);  // turn it into an object

		console.log(object2);

		if (errorFlagForecast != 1){
			//getCurrentTemp(object2);
			getForecast(object2);
		}
	};

	xhr2.onerror = function() {
		alert('Woops, there was an error making the request.');
	};

	// Actually send request to server
	xhr2.send();
}


function getForecast(object2) {
	for (let i=0; i<5; i++) {
		let time = object2.list[i].dt_txt + " UTC";
		time = new Date(time).getHours();

		// Midnight case
		if (time == 0){
			time = "12:00 am";
		}
		// PM case
		else if (time > 12) {
			time = time - 12;
			time = time + ":00 pm";
		}
		// AM case
		else {
			time = time + ":00 am";
		}

		console.log("time " + time);

		let temp = object2.list[i].main.temp;
		temp = Math.trunc(temp);
		temp = temp + "&deg"
		console.log("temp " + temp);


		let hourID = "hour" + (i+1);
		document.getElementById(hourID).innerHTML = `
			<div class="forecast-time" id="${hourID}-time">${time}
			</div>
			<div class="forecast-img" id="${hourID}-img">
			</div>
			<div class="forecast-temp" id="${hourID}-temp">${temp}
			</div>
		`;

		getWeatherImage(object2.list[i].weather, `${hourID}-img`);
	}
}

var transBool = false;
function do_transition()
{
	element = document.getElementById("bottom");
	element.style.animation = "none";
	element.offsetHeight;
	element.style.animation = null;
	if(!transBool)
	{
		element.classList.remove("trans-down");
		element.classList.add("trans-up");
		// element.style.animationDirection = "normal";
		// element.style.animationPlayState = "running";
	}
	else
	{
		element.classList.remove("trans-up");
		element.classList.add("trans-down");
		// element.classList.remove("bottom-class");
		// element.style.animationDirection = "reverse";
		// element.style.animationPlayState = "running";
	}

	// Opposite of what it currently is
	transBool = !transBool;
}

// run this code to make request when this script file gets executed 
makeCorsRequest();



