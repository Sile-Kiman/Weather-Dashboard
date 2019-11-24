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
    //This fuction also performs the function that dispalay all the weather conditions
    displayHistory(history)
     
});

 