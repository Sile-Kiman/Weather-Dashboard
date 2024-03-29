// var searchbtn = document.querySelector("button")
  
// var searchVal;

// searchbtn.addEventListener("click", function (event) {
//     event.preventDefault();
//     var parentEl = this.parentElement;
//     searchVal = parentEl.querySelector("#city").value;

//     //This if condition will display an error  message if the search field is empty and save the city to the local storage
//     if (searchVal === "") {
//         $('#errorMsg').attr("style", "color:red")
//         $('#errorMsg').text("Please enter a valid City name");
        
//     } else {
//         $('#errorMsg').empty();
          
//     }
     
// });

 
//Function to append  day5 forecast
function day5Forecast(cityHistory) {

    //Set the date 
    var date = new Date();
    date = moment().format('L');
    var currentTime = moment().format("H");
    console.log(currentTime)
    // This is my API key
    var APIKey = "eeab2a767f4b39347cacd521da7d158c";

    // Here I'm building the URL we need to query the database
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityHistory + ",us" + "&appid=" + APIKey;

    // Here I'm running   AJAX call to the OpenWeatherMap API
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        // Im storing all of the retrieved data inside of an object called "response"
        .then(function (response) {
            console.log("day5 " ,response)

            //set icon URL day time
            var sunnyDayURL = "http://openweathermap.org/img/wn/01d.png";
            var rainyDayURL = "http://openweathermap.org/img/wn/10d.png";
            var cloudDayURL = "http://openweathermap.org/img/wn/02d.png";

            //set icon URL night time
            var rainyNightURL = "http://openweathermap.org/img/wn/10n.png";
            var nightURL = "http://openweathermap.org/img/wn/01n.png";
            var cloudNightURL = "http://openweathermap.org/img/wn/02n.png";
            var snowURL = "http://openweathermap.org/img/wn/13d.png";

            //set weather condition variable
            var weatherCondition = response.list[33].weather[0].main;
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

            // //Convert the temparature into F
            var tempF = (response.list[33].main.temp - 273.15) * 1.80 + 32;
            //truncate it to 2 digits
            var temparature = tempF.toFixed(2);
            //Set humidity variable and content
            var humidity = response.list[33].main.humidity;

            //Set date variable and content 
            var Date1 = response.list[33].dt_txt
            date1 = moment(Date1).format('L');

            //create another div to hold all the 5 days forcast
            var daysEl = $("#day5");
            daysEl.attr("style", "color:white")
            daysEl.attr("style", "background: royalblue")
            daysEl.css("border", "0.5px solid gray ");
            daysEl.css("margin", "5px");
            daysEl.css("padding", "5px");
            daysEl.css("border-radius", "5px")

            // //display the day 1 in a h6  tag appended to the div col-2
            var d1El = $("<h6>");
            d1El.text(date1);
            daysEl.append(d1El);

            // //display the icon in an p tag appended to the div container
            var icon = $("<p>");
            icon.append(image);
            daysEl.append(icon);

            //display the Temparature in a p  tag appended to the div col-2
            var temp = $("<p>");
            temp.text("Temp: " + temparature + " °F");
            daysEl.append(temp);

            //display the Humidity in an li tag appended to the div container
            var Humidity = $("<p>");
            Humidity.text("Humidity: " + humidity + " %")
            daysEl.append(Humidity);


        })

}
//day5Forecast(cityHistory) 