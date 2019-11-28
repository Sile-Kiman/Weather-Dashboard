//Function to append all the cities search for on under the search input  
function displayHistory(cities) {
    if (cities === null) {
        return;

    } else {
        cities.forEach(function (city) {
            var tableRow = $("<tr>");
            tableRow.addClass("cityRow");
            var tableTd = $("<td>");
            tableTd.addClass("savedCity")
            var tableContent = tableTd.text(city);
            tableTd.append(tableContent);
            tableRow.append(tableTd);
            $(".table").append(tableRow);

        })

    }
}
 
//var cityHistory = "";

//Jquery to call the displaySearch function when each one of the city name is clicked.
$(document).on("click", ".savedCity", function (event) {
    event.preventDefault();
    cityHistory = this.textContent;
    displaySearch(cityHistory);
     
});

//This function will redisplay the CityHistory search 
function displaySearch(cityHistory) {

    var date = new Date();
    date = moment().format('L');
    var currentTime = moment().format("H");
    // This is my API key
    var APIKey = "eeab2a767f4b39347cacd521da7d158c";

    // Here I'm building the URL we need to query the database
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
        "q=" + cityHistory + "&appid=" + APIKey;

    // Here I'm running   AJAX call to the OpenWeatherMap API
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        // Im storing all of the retrieved data inside of an object called "response"
        .then(function (response) {

            //set weather condition variable
            var weatherCondition = response.weather[0].main;
            //create an image element to append the icons
            var image = $("<img>");

            var imageUrl = "http://openweathermap.org/img/wn/13d@2x.png";

            //Set conditional statement to display the weather icon during snow time 
            if (weatherCondition !== "Snow") {

                //Set conditional statement to display the weather icon during day time 
                if (currentTime <= 17) {
                    switch (weatherCondition) {
                        case "Clouds":
                            imageUrl = "http://openweathermap.org/img/wn/02d@2x.png";
                            break;
                        case "Rain":
                            imageUrl = "http://openweathermap.org/img/wn/10d@2x.png";
                            break;
                        case "Clear":
                            imageUrl = "http://openweathermap.org/img/wn/01d@2x.png";
                            break;
                        case "Mist":
                            imageUrl = "http://openweathermap.org/img/wn/50d@2x.png";
                            break;
                        case "Thunderstorm":
                            imageUrl = "http://openweathermap.org/img/wn/11d@2x.png";
                            break;

                    }
                } else if (currentTime >= 18) {
                    switch (weatherCondition) {
                        case "Clouds":
                            imageUrl = "http://openweathermap.org/img/wn/02n@2x.png";
                            break;
                        case "Rain":
                            imageUrl = "http://openweathermap.org/img/wn/10n@2x.png";
                            break;
                        case "Clear":
                            imageUrl = "http://openweathermap.org/img/wn/01n@2x.png";
                            break;
                        case "Mist":
                            imageUrl = "http://openweathermap.org/img/wn/50n@2x.png";
                            break;
                        case "Thunderstorm":
                            imageUrl = "http://openweathermap.org/img/wn/11n@2x.png";
                            break;

                    }

                }
                image.attr("src", imageUrl);
            }


            //Convert the temparature into F
            var tempF = (response.main.temp - 273.15) * 1.80 + 32;
            //truncate it to 2 digits
            var temparature = tempF.toFixed(2);
            //Set humidity variable and content
            var humidity = response.main.humidity
            //Set wind variable and content
            var wind = response.wind.speed
            //Create a new Div and set its attribute to append all the weather items   
            var weather = $("<div>");
            weather.addClass(".displayCity")
            weather.css("border", "0.5px solid gray ");
            weather.css("margin", "5px");
            weather.css("padding", "5px");
            weather.css("border-radius", "5px");

            //display the City and date in h4 tag appended to the div container
            var cityEl = $("<h4>");
            cityEl.addClass("city");
            cityEl.attr("margin:10px")
            cityEl.text(cityHistory + "(" + date + ")");
            cityEl.append(image)
            weather.append(cityEl);

            //display the Temparature in a li  tag appended to the div container
            var temp = $("<p>");
            temp.addClass("tempature");
            temp.text("Temparature: " + temparature + " °F");
            weather.append(temp);

            //display the Humidity in an li tag appended to the div container
            var Humidity = $("<p>");
            Humidity.addClass("humidity");
            Humidity.text("Humidity: " + humidity + " %")
            weather.append(Humidity);

            //display the Wind in an li tag appended to the div container
            var Wind = $("<p>");
            Wind.addClass("humidity");
            Wind.text("Wind-Speed:  " + wind + " mph")
            weather.append(Wind);

            //prepend all the city weather information to the div main container
            $(".col-sm-8").prepend(weather);

        })
        day1Forecast(cityHistory);
        day2Forecast(cityHistory);
        day3Forecast(cityHistory);
        day4Forecast(cityHistory);
        day5Forecast(cityHistory);

}
//displaySearch(cityHistory)
 