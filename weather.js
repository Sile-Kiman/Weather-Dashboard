

var searchbtn = document.querySelector("button")
//let queryURL="http://api.openweathermap.org/data/2.5/weather?q={searchEL}"

//var parentEl= this.parentElement;
var searchEL;
searchbtn.addEventListener("click", function (event) {
    var parentEl = this.parentElement;
    searchVal = parentEl.querySelector("#city").value;
    console.log("Parent el:", parentEl)
    console.log("first child el:", searchVal)
    if (searchVal !== "") {
        //console.log("input value", searchEL)
        localStorage.setItem("City Name", searchVal)
    }
    retrieveAPI(searchVal);
});

function retrieveAPI(searchVal) {
    //Set the date 
    var date = new Date();
    date = moment().format('L');
    var currentTime = moment().format("H");
    // This is my API key
    var APIKey = "eeab2a767f4b39347cacd521da7d158c";

    // Here I'm building the URL we need to query the database

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
        "q=" + searchVal + "&appid=" + APIKey;

    // Here we run our AJAX call to the OpenWeatherMap API
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        // Im store all of the retrieved data inside of an object called "response"
        .then(function (response) {
            console.log(response)
            var sunMoon;
            //<img src="./assets/images/33-sunset.png">
            //<img src="./assets/images/sunrise.png"></img>

            if (currentTime <= 12) {
                sunMoon=response.sys.sunrise
                   
                 
            }
            if(currentTime >12){
                sunMoon=response.sys.sunset
                
            }
            //Convert the temparature into F
            var tempF = (response.main.temp - 273.15) * 1.80 + 32;
            //truncate it to 2 digits
            var temparature= tempF.toFixed(2);
            //Set humidity variable and content
            var humidity=response.main.humidity
            //Set wind variable and content
            var wind=response.wind.speed
            //var weather =$(".displayCity");
            var weather =$("<div>");
            weather.addClass(".displayCity")
            weather.css("border", "0.5px solid gray ");
            weather.css("margin", "10px", "padding", "10px");
            weather.css("padding", "10px");
            weather.css("border-radius", "5px");
            
             

            //display the City and date in h3 tag appended to the div container
            var cityEl = $("<h4>"); 
            cityEl.addClass("city");
            cityEl.attr("margin:10px")
            cityEl.text(searchVal + "(" + date + ") " + sunMoon);
            weather.append(cityEl);

            //display the Temparature in a li  tag appended to the div container
            var temp=$("<li>");
            temp.addClass("tempature");
            temp.text("Temparature: " +temparature + " °F");
            weather.append(temp);

             //display the Humidity in an li tag appended to the div container
             var Humidity=$("<li>");
             Humidity.addClass("humidity");
             Humidity.text("Humidity: " +humidity + " %")
             weather.append(Humidity);

             //display the Wind in an li tag appended to the div container
             var Wind=$("<li>");
             Wind.addClass("humidity");
             Wind.text("Wind-Speed:  " +wind + " mph")
             weather.append(Wind);

             //prepend all the city weather information to the div main container
             $(".col-sm-8").prepend(weather);




        })
}


