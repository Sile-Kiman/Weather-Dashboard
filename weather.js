

var searchbtn = document.querySelector("button")

var searchEL;

searchbtn.addEventListener("click", function (event) {
    event.preventDefault();
    var parentEl = this.parentElement;
    searchVal = parentEl.querySelector("#city").value;

    //This if condition will display an error  message if the search field is empty and save the city to the local storage
    if (searchVal === "") {
        $('#errorMsg').attr("style", "color:red")
        $('#errorMsg').text("Please enter a valid City name");
    } else {
        $('#errorMsg').empty();
        localStorage.setItem("City Name", searchVal)
    }
    //call the function the last item from local storage
    displayHistory()
    //call the function that perform the function that dispalay all the weather conditions
    retrieveAPI(searchVal);
});

//displayHistory()
//retrieveAPI(searchVal);

//Function to append all the cities search for on under the search input
function displayHistory() {
    var history = localStorage.getItem("City Name");
     

    if (history !== "") {
        $(".history").prepend("<h5>" + history + "</h5>" +"<br />")

    }
}
//displayHistory()


//function retrieve data from the weather API and populate the Temp and wheather conditions on the page.  
function retrieveAPI(searchVal) {
    //Set the date 
    var date = new Date();
    date = moment().format('L');
    var currentTime = moment().format("H");
    console.log(currentTime)
    // This is my API key
    var APIKey = "eeab2a767f4b39347cacd521da7d158c";

    // Here I'm building the URL we need to query the database
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
        "q=" + searchVal + "&appid=" + APIKey;

    // Here I'm running   AJAX call to the OpenWeatherMap API
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        // Im storing all of the retrieved data inside of an object called "response"
        .then(function (response) {
 
            //set icon URL day time
            var sunnyDayURL = "http://openweathermap.org/img/wn/01d@2x.png";
            var rainyDayURL = "http://openweathermap.org/img/wn/10d@2x.png";
            var cloudDayURL = "http://openweathermap.org/img/wn/02d@2x.png";

            //set icon URL night time
            var rainyNightURL = "http://openweathermap.org/img/wn/10n@2x.png";
            var nightURL = "http://openweathermap.org/img/wn/01n@2x.png";
            var cloudNightURL = "http://openweathermap.org/img/wn/02n@2x.png";
            var snowURL = "http://openweathermap.org/img/wn/13d@2x.png";

            //set weather condition variable
            var weatherCondition = response.weather[0].main;
            //create an image element to append the icons
            var image = $("<img>");


            //Set conditional statement to display the weather icon during snow time 
            if (weatherCondition === "Snow") {
                image.attr("src", snowURL);


            } else {


                //Set conditional statement to display the weather icon during day time  
                if (currentTime <= 17 && weatherCondition === "Clouds") {
                    image.attr("src", cloudDayURL);

                } else if (currentTime <= 17 && weatherCondition === "Rain") {
                    image.attr("src", rainyDayURL);

                } else if (currentTime <= 17 && weatherCondition === "Clear") {
                    image.attr("src", sunnyDayURL);
                }
                //This is night time condition statement
                if (currentTime >= 18 && weatherCondition === "Clouds") {
                    image.attr("src", cloudNightURL);

                } else if (currentTime >= 18 && weatherCondition === "Rain") {
                    image.attr("src", rainyNightURL);

                } else if (currentTime >= 18 && weatherCondition === "Clear") {
                    image.attr("src", nightURL);
                }
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
            cityEl.text(searchVal + "(" + date + ")");
            cityEl.append(image)
            weather.append(cityEl);

            //display the Temparature in a li  tag appended to the div container
            var temp = $("<li>");
            temp.addClass("tempature");
            temp.text("Temparature: " + temparature + " °F");
            weather.append(temp);

            //display the Humidity in an li tag appended to the div container
            var Humidity = $("<li>");
            Humidity.addClass("humidity");
            Humidity.text("Humidity: " + humidity + " %")
            weather.append(Humidity);

            //display the Wind in an li tag appended to the div container
            var Wind = $("<li>");
            Wind.addClass("humidity");
            Wind.text("Wind-Speed:  " + wind + " mph")
            weather.append(Wind);

            //prepend all the city weather information to the div main container
            $(".col-sm-8").prepend(weather);

        })
}


