const apiKey = "6ed25db2e4a8b05480870ba0daa1cf71";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather_icon");
const dynbg = "dynamicBackground"; // Assuming this is the ID of your background element

async function checkweather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    const data = await response.json();
    console.log(data.weather[0].main);

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

    let bgImageUrl = "./defbag.jpg"; // Variable to hold the background image URL

    if (data.weather[0].main == "Clouds") {
        weatherIcon.src = "images/clouds.png";
        bgImageUrl = "./images/cloudpic.jpg";
        console.log("Clouds");
    } else if (data.weather[0].main == "Clear") {
        weatherIcon.src = "images/clear.png";
        bgImageUrl = "./images/sunny.jfif"; // Change this to your clear sky image
        console.log("Clear");
    } else if (data.weather[0].main == "Rain") {
        weatherIcon.src = "images/rain.png";
        console.log("Rain");
        bgImageUrl = "./images/rain3.jpg";
    } else if (data.weather[0].main == "Drizzle") {
        weatherIcon.src = "images/drizzle.png";
        console.log("Drizzle");
        bgImageUrl = "./images/drizzle2.jpg"; // Change this to your drizzle image
    } else if (data.weather[0].main == "Mist") {
        console.log("mist");
        weatherIcon.src = "images/mist.png";
        bgImageUrl = "./images/mist.jpg"; // Change this to your mist image
    }else if (data.weather[0].main == "Haze") {
        weatherIcon.src = "images/clear.png";
        bgImageUrl = "./images/haze.jpg"; // Change this to your clear sky image
        console.log("Clear");
    }

    changeBg(bgImageUrl); // Call the function to change the background
}

function changeBg(bgimage) {
    //document.getElementById(dynbg).style.backgroundImage = `url('${bgimage}')`;
    document.querySelector("#dynbg").style.backgroundImage  = `url('${bgimage}')`;
    document.querySelector("#dynbg").style.width = '100%';
    document.querySelector("#dynbg").style.backgroundSize = '100%';
    document.querySelector('#dynbg').style.backgroundRepeat = 'none';
    
}

searchBtn.addEventListener("click", () => {
    var hasNumber = /\d/;   
    if(hasNumber.test(searchBox.value))  //true
        print_forecast(searchBox.value)
    else
        checkweather(searchBox.value);

});

searchBox.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        var hasNumber = /\d/;   
        if(hasNumber.test(searchBox.value))  //true
            print_forecast(searchBox.value)
        else
            checkweather(searchBox.value);
    }
});
