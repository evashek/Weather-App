$(function() {
	$('#report').hide();

	$('#submit').click(function() {
		$('#weather').hide();
		$('#bg').fadeOut("fast");
		$.getJSON("http://api.openweathermap.org/data/2.5/weather?zip=" + $('#zcode').val() + ",us").done(function(data) {
			if(data.cod == 200) { // query to OpenWeatherMap was successful
				$('#zcode').removeClass("has-error").popover("destroy");
				$('#weather td[id]').empty(); // empty the results of a previous search if any
				$('#report').show();

				var icon = data.weather[0].icon;
				$('#name').append(data.name);
				$('#icon').append("<img src='http://openweathermap.org/img/w/" + icon + ".png' style='float:right'>")
				$('#desc').append(data.weather[0].description);
				$('#temp').append(convertToF(data.main.temp) + "F");
				$('#humid').append(data.main.humidity + "%");
				$('#maxTemp').append(convertToF(data.main.temp_max) + " F");
				$('#minTemp').append(convertToF(data.main.temp_min) + " F");
				$('#condition').append(data.weather[0].main);

				// Originally would have used data.weather[0].main to change the background, but OWM doesn't give a list of possible results.
				// Instead, will use the icons to determine what is the weather condition and update the background.
				// Source: http://bugs.openweathermap.org/projects/api/wiki/Weather_Condition_Codes
				var bg;
				switch(icon) {
					case '01d':
						bg = "clear-day";
						break;
					case '01n':
						bg = "clear-night";
						break;
					case '02d':
					case '03d':
					case '04d':
						bg = "clouds-day";
						break;
					case '02n':
					case '03n':
					case '04n':
						bg = "clouds-night";
						break;
					case '09d':
					case '10d':
						bg = "rain-day";
						break;
					case '09n':
					case '10n':
						bg = "rain-night";
						break;
					case '11d':
					case '11n':
						bg = "thunderstorm";
						break;
					case '13d':
					case '13n':
						bg = "snow";
						break;
					case '50d':
					case '50n':
						bg = "mist";
						break;
					default:
						bg = "above_the_clouds";
						break;
				}

				$('#weather').fadeIn("slow");

				$('#bg').fadeIn("slow").css({"background":"url(./resources/images/" + bg + ".jpg) no-repeat center center fixed", "-webkit-background-size":"cover", "-moz-background-size":"cover", "-o-background-size":"cover", "background-size":"cover"});
			}
			else {
				$('#report').hide();
				$('#bg').fadeIn("slow").css({"background":"url(./resources/images/above_the_clouds.jpg) no-repeat center center fixed", "-webkit-background-size":"cover", "-moz-background-size":"cover", "-o-background-size":"cover", "background-size":"cover"});
				$('#zcode').addClass("has-error").popover("show");
			}
		});
	});

	function convertToF(kelvin) {
		var fah = (9/5) * (kelvin - 273) + 32;
		return fah.toFixed(0);
	}
});