
let imageArray = []  // global variable to hold stack of images for animation 
let count = 0;          // global var
let elements = [];


function addToArray(newImage) {
	if (count < 10) {
		newImage.id = "doppler_"+count;
		newImage.style.display = "none";
		imageArray.push(newImage);
		count = count+1;

		if (count >= 10) {
			console.log("Got 10 doppler images");
		}
	}
}


function tryToGetImage(dateObj) {
	let dateStr = dateObj.getUTCFullYear();
	dateStr += String(dateObj.getUTCMonth() + 1).padStart(2, '0'); //January is 0!
	dateStr += String(dateObj.getUTCDate()).padStart(2, '0');

	let timeStr = String(dateObj.getUTCHours()).padStart(2,'0')
	timeStr += String(dateObj.getUTCMinutes()).padStart(2,'0');

	let filename = "DAX_"+dateStr+"_"+timeStr+"_N0R.gif";
	let newImage = new Image();
	newImage.onload = function () {
		// console.log("got image "+filename);
		addToArray(newImage);
	}
	newImage.onerror = function() {
		// console.log("failed to load "+filename);
	}
	newImage.src = "http://radar.weather.gov/ridge/RadarImg/N0R/DAX/"+filename;


}


function getTenImages() {
	let dateObj = new Date();  // defaults to current date and time
	elements = document.getElementsByClassName("animate-map");

	// if we try 150 images, and get one out of every 10, we should get enough
	for (let i = 0; i < 150; i++) {
		newImage = tryToGetImage(dateObj);
		dateObj.setMinutes( dateObj.getMinutes()-1 ); // back in time one minute
	}

	// var elem = document.getElementById("animate");   
  	let j = 0;
	let id = setInterval(frame, 500);
	function frame() {
		// if(elements[j].src == "" || typeof(elements[j].src) == undefined)
		// {
		// 	console.log("IF");
			
		// 	j++;
		// 	return;
		// }
		elements[j].src = imageArray[j].src;
		if (j == 0){
			elements[9].style.display = "none";
		}
		else{
			elements[j-1].style.display = "none";
		}
		elements[j].style.display = "inline";

		// Reset the animation to the beginning
		if (j == 9){
			j = 0;
		}
		else{
			j++;
		}
  	}
}

getTenImages();



