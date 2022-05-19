var API_KEY = "40117cde44b243b7f2302adcff5b7b50";

$(function () {



    $.getJSON('https://ipinfo.io/json?token=771d57b569006f', function (d) {

        loc = d.loc.split(",");
        console.log(loc)

        $.getJSON('https://api.openweathermap.org/data/2.5/weather?lat=' + loc[0] + '&lon=' + loc[1] + '&units=metric&exclude=hourly,minutely&appid=' + API_KEY, function (wd) {
            console.log("weather data: ", wd);
            var currentLocation = wd.name;
            var currentCondition = wd.weather[0].description;
            var currentTemp = wd.main.temp;
            var icon = wd.weather[0].icon;
            var iconSrc = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            var currentPressure = wd.main.pressure;
            var feelsLike = wd.main.feels_like;
            var currentHumidity = wd.main.humidity;


            $('#currentLocation').html(currentLocation + " Weather");
            $('#currentTemp').html(Math.round(currentTemp) + "°C");
            $('#feelsLike').html("<strong>Feels like:</strong> " + Math.round(feelsLike) + "°C");
            $('#currentCondition').html("<strong>Condition:</strong> " + currentCondition);
            $('#currentPressure').html("<strong>Pressure:</strong> " + currentPressure / 10 + " kPa");
            $('#roundedTemps').html("<strong>Rounded:</strong> " + "Current: " + currentTemp.toFixed(1) + "°C" + " / " + "Feels like: " + feelsLike.toFixed(1) + "°C");
            $('#currentHumidity').html("<strong>Humidity:</strong> " + currentHumidity + "%");

            $('#currentTemp').prepend('<img src="' + iconSrc + '" class="imageSize"><br>');

        })

        $.getJSON('https://api.openweathermap.org/data/2.5/onecall?lat=' + loc[0] + '&lon=' + loc[1] + '&units=metric&exclude=hourly,minutely&appid=' + API_KEY, function (ocd) {
            console.log("one call data: ", ocd);
            var dewPoint = ocd.current.dew_point;
            var windSpeed = ocd.current.wind_speed;
            var windDeg = ocd.current.wind_deg;
            var windDir;
            if (windDeg > 337.5) windDir = 'N';
            if (windDeg > 292.5) windDir = 'NW';
            if (windDeg > 247.5) windDir = 'W';
            if (windDeg > 202.5) windDir = 'SW';
            if (windDeg > 157.5) windDir = 'S';
            if (windDeg > 122.5) windDir = 'SE';
            if (windDeg > 22.5) windDir = 'NE';
            var uvIndex = ocd.current.uvi;
            var currentVisibility = ocd.current.visibility;
            var currentDateTime = new Date($.now());
            var csr = new Date(ocd.current.sunrise * 1000).toLocaleTimeString();
            var css = new Date(ocd.current.sunset * 1000).toLocaleTimeString();
            var threeDay = ocd.daily.map((day, idx) => {
                if (idx <= 2) {
                    let dt = new Date(day.dt * 1000);
                    let sr = new Date(day.sunrise * 1000).toLocaleTimeString();
                    let ss = new Date(day.sunset * 1000).toLocaleTimeString();
                    return `<div class="col">

                    <h5 style="text-decoration: underline" class="content-title center-text">${dt.toDateString()}</h5>
                    <img class="dayImage" src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" />
                    <div class="content-body">
                        
                    <p class="center-text"><strong>High: </strong>${day.temp.max}&deg;C</p>
                    <p class="center-text"><strong>Low: </strong>${day.temp.min}&deg;C</p>
                    <p class="center-text"><strong>Condition: </strong>${day.weather[0].description}</p>
                    <p class="center-text"><strong>Sunrise: </strong>${sr}</p>
                    <p class="center-text"><strong>Sunset: </strong>${ss}</p>
    
                    </div>
                </div>`;
                }
            }).join(' ');


            $('#dewPoint').html("<strong>Dew Point:</strong> " + dewPoint.toFixed(1) + "°C");
            $('#windSpeed').html("<strong>Wind: </strong>" + windSpeed + " m/s " + windDir)
            $('#uvIndex').html("<strong>UV Index: </strong>" + uvIndex)
            $('#currentVisibility').html("<strong>Visibility: </strong>" + currentVisibility * 0.001 + "km");
            $('#currentDateTime').html("<strong>Date: </strong>" + currentDateTime);
            $('.threeDay').html(threeDay);
            $('#currentSun').html("<strong>Sunrise: </strong>" + csr + "  <strong>Sunset: </strong>" + css)

        })


    })


})
