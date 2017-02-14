angular.module('WeatherApp')
.controller('WeatherController',['$scope', '$http', function($scope, $http){

	//Location API
	$http({
		method: "GET",
		url: "http://ip-api.com/json"
	}).then(function(response){
		var pos = response.data;
		var lat = pos.lat;
		var lon = pos.lon;
		var key = 'a4fcb2af4c3e8404740fe72b07552771';
		$scope.country = pos.country;
		$scope.city = pos.city;
		$scope.state = pos.regionName;


//Weather API
		$http({
			method: "GET",
			url: "http://api.openweathermap.org/data/2.5/weather?&units=imperial&lat="+ lat +"&lon="+ lon +"&appid=" +key
		}).then(function(response){
			var data = response.data;
			$scope.normTemp = data.main.temp;
			$scope.temp = "F";
			$scope.celcius = (($scope.normTemp - 32) * 5/9).toFixed(2);
			$scope.kelvin = (($scope.normTemp - 32) * 5/9 + 273.15).toFixed(2);
			$scope.fH = ($scope.celcius * 1.8 + 32).toFixed(2);
			$scope.pressure = data.main.pressure;
			$scope.humidity = data.main.humidity;
			$scope.wind = data.wind.speed;
			$scope.skys = data.weather[0].main
			$scope.des = data.weather[0].description;


//Change Temperatures C K F
			$scope.changeToC = function(){
				if($scope.normTemp !== true){
					$scope.normTemp = $scope.celcius;
					$scope.temp = "C";
				}
			}

			$scope.changeToK = function(){
				if($scope.normTemp !== true){
					$scope.normTemp = $scope.kelvin;
					$scope.temp = "K";
				}
			}

			$scope.changeToF = function(){
				if($scope.normTemp !== true){
					$scope.normTemp = $scope.fH;
					$scope.temp = "F"
				}
			}

//Changes in Icons according to weather
			var icons = [{
				icon: "pictures/rain.png"
			}, {
				icon: "pictures/sun.png"
			}, {
				icon: "pictures/lightning.png"
			}, {
				icon: "pictures/cloudy.png"
			}, {
				icon: "pictures/snow.png"
			}];

			switch ($scope.des) {
				case "scattered clouds":
				case "few clouds":
				case "broken clouds":
					$scope.des = icons[3].icon;
					break;
				case "clear sky":
					$scope.des = icons[1].icon;
					break;
				case "shower rain":
				case "rain":
				case "light rain":
					$scope.des = icons[0].icon;
					break;
				case "thunderstorm":
					$scope.des = icons[2].icon;
					break;
				case "snow":
					$scope.des = icons[4].icon;
				default:
					$scope.des = "Housten We Got A Problem"
			}
		});
	});
}])
