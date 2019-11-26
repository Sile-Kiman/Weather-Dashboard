//day 4============================================================
//Function to append  day4 forecast
function day4Forecast(history) {
    var history = localStorage.getItem("City Name");

    if (history === null) {
        return;

    } else {

       // $(".history").prepend("<h5>" + history + "</h5>" + "<br />")
    }
    //Set the date 
    var date = new Date();
    date = moment().format('L');
    var currentTime = moment().format("H");
    console.log(currentTime)
    // This is my API key
    var APIKey = "eeab2a767f4b39347cacd521da7d158c";

    // Here I'm building the URL we need to query the database
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + history + ",us" + "&appid=" + APIKey;

    // Here I'm running   AJAX call to the OpenWeatherMap API
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        // Im storing all of the retrieved data inside of an object called "response"
        .then(function (response) {
            console.log("5 day", response)

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
            var weatherCondition = response.list[25].weather[0].main;
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
            var tempF = (response.list[25].main.temp - 273.15) * 1.80 + 32;
            //truncate it to 2 digits
            var temparature = tempF.toFixed(2);
            //Set humidity variable and content
            var humidity = response.list[25].main.humidity;

            //Set date variable and content 
            var Date1 = response.list[25].dt_txt
            date1 = moment(Date1).format('L');

            //create another div to hold all the 5 days forcast
            var daysEl = $("#day4");
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

            // //display the icon in an li tag appended to the div container
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
day4Forecast(history) 