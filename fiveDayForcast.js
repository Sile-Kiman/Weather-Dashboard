
var dailyHeader;
//Function to append all the cities search for on under the search input
function dailyForcast(history) {
    var history = localStorage.getItem("City Name");

    if (history === null) {
        return;

    } else {

        $(".history").prepend("<h5>" + history + "</h5>" + "<br />")
    }
    //Set the date 
    var date = new Date();
    date = moment().format('L');
    var currentTime = moment().format("H");
    console.log(currentTime)
    // This is my API key
    var APIKey = "eeab2a767f4b39347cacd521da7d158c";
    var APIKey1 = "5a93859a735d2b17f8c5291a808229e4"
    var days = 5;
    var country = "us";
    // Here I'm building the URL we need to query the database
    //var queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
    // "q=" + history +"&cnt=" +days +  "&appid=" + APIKey;


    //var queryURLhttps://api.openweathermap.org/data/2.5/forecast/daily?q=charlotte,us&cnt=5&appid=eeab2a767f4b39347cacd521da7d158c 
    //var queryURL = "https://api.openweathermap.org/data/2.5/forecast/daily"?q="charlotte"&//appid=" eeab2a767f4b39347cacd521da7d158c";

    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + history + ",us" + "&appid=" + APIKey;
    //var queryURL1="http://api.openweathermap.org/data/2.5/forecast?q=charlotte,us" + "&appid=" + APIKey1;

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
                var weatherCondition = response.list[3].weather[0].main;
                var weatherCondition = response.list[10].weather[0].main;
                //var date1Icon = response.list[3].weather[0].icon;
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
                var tempF = (response.list[3].main.temp - 273.15) * 1.80 + 32;
                //truncate it to 2 digits
                var temparature = tempF.toFixed(2);
                //Set humidity variable and content
                var humidity = response.list[3].main.humidity;
                // //Set wind variable and content
                // var wind = response.wind.speed
                //Set date variable and content 
                var Date1 = response.list[3].dt_txt
                    date1=moment(Date1).format('L');
                    console.log(date1)
                //Set date1 variable for icon  
                //var date1Icon = response.list[3].weather[0].icon;

            //Create a new Div and set its attribute to append all the weather items   
            var dailyHeader = $("<div>");
            dailyHeader.addClass("row")
            //weather.css("border", "0.5px solid gray ");
            dailyHeader.css("margin", "5px");
            dailyHeader.css("padding", "5px");
                //.css("border-radius", "5px");

            //create another div to hold all the 5 days forcast
            var daysEl = $("<div>"); 
            daysEl.addClass("col-2")
            daysEl.css("border", "0.5px solid gray ");
            daysEl.css("margin", "5px");
            daysEl.css("padding", "5px");
            daysEl.css("border-radius", "5px")

            //append col-2 to the row
            dailyHeader.append(daysEl);




            //display the City and date in h4 tag appended to the div container
            var h5El = $("<h5>");
            h5El.addClass("days");
            h5El.attr("margin", "10px")
            h5El.text("5 Days Forcast: "  );
            //cityEl.append(image)
            //daysEl.append(h5El)
            console.log(h5El);
            $(".col-sm-8").append(h5El );
             
            //$(".col-sm-8").append(h5El);

            // //display the day 1 in a h6  tag appended to the div col-2
            var d1El = $("<h6>");
            d1El.text(date1);
            daysEl.append(d1El);
            dailyHeader.append(daysEl)
            $(".col-sm-8").append(dailyHeader);

            // //display the icon in an li tag appended to the div container
            var icon = $("<p>");
            icon.append(image);
            daysEl.append(icon);
            dailyHeader.append(daysEl)
            $(".col-sm-8").append(dailyHeader);
            //$(".col-sm-8").append(daysEl);

            //display the Temparature in a p  tag appended to the div col-2
            var temp = $("<p>");
            //temp.addClass("tempature");
            temp.text("Temp: " + temparature + " °F");
            //weather.append(temp);
            daysEl.append(temp);
            dailyHeader.append(daysEl)
            $(".col-sm-8").append(dailyHeader);
            //$(".col-sm-8").append(daysEl);

             //display the Humidity in an li tag appended to the div container
             var Humidity = $("<p>");
             //Humidity.addClass("humidity");
             Humidity.text("Humidity: " + humidity + " %")
             //weather.append(Humidity);
             daysEl.append(Humidity);
             dailyHeader.append(daysEl)
            $(".col-sm-8").append(dailyHeader);
            //$(".col-sm-8").append(daysEl);
            
            //append col-2 to the row
            //dailyHeader.append(daysEl);
            //$(".col-sm-8").append(daysEl);
           
            //Date 2 bolock 
           






            // //prepend all the city weather information to the div main container
             //$(".col-sm-8").prepend(weather);

        })
        day2Forcast(history) 

}
//displayHistory(history);
//dailyForcast(history)


// day 2============================================================

//Function to append all the cities search for on under the search input
function day2Forcast(history) {
    var history = localStorage.getItem("City Name");

    if (history === null) {
        return;

    } else {

        $(".history").prepend("<h5>" + history + "</h5>" + "<br />")
    }
    //Set the date 
    var date = new Date();
    date = moment().format('L');
    var currentTime = moment().format("H");
    console.log(currentTime)
    // This is my API key
    var APIKey = "eeab2a767f4b39347cacd521da7d158c";
    var APIKey1 = "5a93859a735d2b17f8c5291a808229e4"
     
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
                var weatherCondition = response.list[10].weather[0].main;
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
                var tempF = (response.list[10].main.temp - 273.15) * 1.80 + 32;
                //truncate it to 2 digits
                var temparature = tempF.toFixed(2);
                //Set humidity variable and content
                var humidity = response.list[10].main.humidity;
                 
                //Set date variable and content 
                var Date1 = response.list[10].dt_txt
                    date1=moment(Date1).format('L');
                    console.log(date1)
                
            // //Create a new Div and set its attribute to append all the weather items   
            var dailyHeader = $("<div>");
            dailyHeader.addClass("row")
            //weather.css("border", "0.5px solid gray ");
            dailyHeader.css("margin", "5px");
            dailyHeader.css("padding", "5px");
                //.css("border-radius", "5px");

            //create another div to hold all the 5 days forcast
            var daysEl = $("<div>"); 
            daysEl.addClass("col-2")
            daysEl.css("border", "0.5px solid gray ");
            daysEl.css("margin", "5px");
            daysEl.css("padding", "5px");
            daysEl.css("border-radius", "5px")

            // //display the City and date in h4 tag appended to the div container
            // var daysFEl = $("<h5>");
            // daysFEl.addClass("days");
            // daysFEl.attr("margin", "10px")
            // daysFEl.text("5 Days Forcast: "  );
            // //cityEl.append(image)
            // console.log(daysFEl);
            //dailyHeader.append(daysFEl)
            //$(".col-sm-8").append(daysFEl);

            // //display the day 1 in a h6  tag appended to the div col-2
            var d1El = $("<h6>");
            d1El.text(date1);
            daysEl.append(d1El);
            dailyHeader.append(daysEl)
            $(".col-sm-8").append(dailyHeader);
            //dailyHeader.append(daysEl)
            //$(".col-sm-8").append(dailyHeader);

            // //display the icon in an li tag appended to the div container
            var icon = $("<p>");
            icon.append(image);
            daysEl.append(icon);
            //$(".col-sm-8").append(daysEl);
            dailyHeader.append(daysEl)
            $(".col-sm-8").append(dailyHeader);

            //display the Temparature in a p  tag appended to the div col-2
            var temp = $("<p>");
            //temp.addClass("tempature");
            temp.text("Temp: " + temparature + " °F");
            //weather.append(temp);
            daysEl.append(temp);
            dailyHeader.append(daysEl)
            $(".col-sm-8").append(dailyHeader);
            //$(".col-sm-8").append(daysEl);

             //display the Humidity in an li tag appended to the div container
             var Humidity = $("<p>");
             //Humidity.addClass("humidity");
             Humidity.text("Humidity: " + humidity + " %")
             //weather.append(Humidity);
             daysEl.append(Humidity);
             dailyHeader.append(daysEl)
            $(".col-sm-8").append(dailyHeader);
            //$(".col-sm-8").append(daysEl);
            
           
            //
        })

}






function day2DailyForecast(){

    var weatherCondition = response.list[10].weather[0].main;
     
                // //Convert the temparature into F
                var tempF2 = (response.list[10].main.temp - 273.15) * 1.80 + 32;
                //truncate it to 2 digits
                var temparature2 = tempF2.toFixed(2);
                //Set humidity variable and content
                var humidity2 = response.list[10].main.humidity;
                // //Set wind variable and content
                // var wind = response.wind.speed
                //Set date variable and content 
                var Date2 = response.list[10].dt_txt
                    date2=moment(Date2).format('L');
                    console.log(date2)
                //Set date1 variable for icon  
                //var date1Icon = response.list[3].weather[0].icon;

            //Create a new Div and set its attribute to append all the weather items   
            var dailyHeader = $("<div>");
            dailyHeader.addClass("row daily")
            //weather.css("border", "0.5px solid gray ");
            dailyHeader.css("margin", "5px");
            dailyHeader.css("padding", "5px");
                //.css("border-radius", "5px");

            //create another div to hold all the 5 days forcast
            var daysEl = $("<div>"); 
            daysEl.addClass("col-2")
            daysEl.css("border", "0.5px solid gray ");
            daysEl.css("margin", "5px");
            daysEl.css("padding", "5px");
            daysEl.css("border-radius", "5px")

            // //display the day 1 in a h6  tag appended to the div col-2
            var d1El = $("<h6>");
            d1El.text(date2);
            daysEl.append(d1El);
            dailyHeader.append(daysEl)
            $(".col-sm-8").append(dailyHeader);

            // //display the icon in an li tag appended to the div container
            var icon = $("<p>");
            icon.append(image);
            daysEl.append(icon);
            $(".col-sm-8").append(daysEl);

            //display the Temparature in a p  tag appended to the div col-2
            var temp = $("<p>");
            //temp.addClass("tempature");
            temp.text("Temp: " + temparature2 + " °F");
            //weather.append(temp);
            daysEl.append(temp);
            $(".col-sm-8").append(daysEl);

             //display the Humidity in an li tag appended to the div container
             var Humidity = $("<p>");
             //Humidity.addClass("humidity");
             Humidity.text("Humidity: " + humidity2 + " %")
             //weather.append(Humidity);
             daysEl.append(Humidity);
            $(".col-sm-8").append(daysEl);
            
           
            //Date 2 bolock 
           






            // //prepend all the city weather information to the div main container
             //$(".col-sm-8").prepend(weather);

        //})

}