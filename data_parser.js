const API_Key = "6ed25db2e4a8b05480870ba0daa1cf71";
//const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const imd_url = 'https://city.imd.gov.in/yogi/php/chart_min_max.php';
//mail id hawaapi@rfcdrive.com
//pass Hawa_api.iic24
// INDEX_NUMBER=43003&DATE1=2024-09-23&DATE2=2024-09-29
//const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
//const data = await response.json();

var lat=0;
var lon = 0;
var cc='IN';// stands fore country code default is Indian
async function get_polution_index(zip){
    response = await fetch('http://api.openweathermap.org/geo/1.0/zip?zip='+zip+','+cc+'&appid='+API_Key);
    data = await response.json();
    pol_url = 'http://api.openweathermap.org/data/2.5/air_pollution?lat='+data.lat+'&lon='+data.lon+'&appid='+API_Key;
    //console.log(data);
    response = await fetch(pol_url).then(console.log(aqi));
    pol_obj = response.json();
    var aqi = pol_obj.list
    aqi = aqi[0].main.aqi
    console.log(aqi)
    switch(aqi){
        case 1: 
            document.querySelector("#poll").innerHTML="<div class=\"card-body\"><p>PM2.5: 0 µg/m³</p><p>PM10: 0 µg/m³</p><p>Ozone: 0 µg/m³</p></div>";
            break;
        default:
            document.querySelector("#poll").innerHTML="<div class=\"card-body\"><p>PM2.5: 0 µg/m³</p><p>PM10: 0 µg/m³</p><p>Ozone: 0 µg/m³</p></div>";
            break;
    }
}
Geocode_url = {zip:'http://api.openweathermap.org/geo/1.0/zip?zip=700121,IN&appid=6ed25db2e4a8b05480870ba0daa1cf71',
    name:'http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}',    
};
function changeBg(bgimage) {
    //document.getElementById(dynbg).style.backgroundImage = `url('${bgimage}')`;
    document.querySelector("#dynbg").style.backgroundImage  = `url('${bgimage}')`;
    document.querySelector("#dynbg").style.width = '100%';
    document.querySelector("#dynbg").style.backgroundSize = '100%';
    document.querySelector('#dynbg').style.backgroundRepeat = 'none';
    
}

async function print_forecast(zip){
    get_polution_index(zip);
    response = await fetch('http://api.openweathermap.org/geo/1.0/zip?zip='+zip+','+cc+'&appid='+API_Key);
    data = await response.json();
    forcst = await fetch('http://api.openweathermap.org/data/2.5/forecast?lat='+data.lat+'&lon='+data.lon+'&appid='+API_Key);
    //console.log(forcst);
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(forcst.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = forcst.main.humidity + "%";
    document.querySelector(".wind").innerHTML = forcst.wind.speed + "km/h";
    let bgImageUrl = "./defbag.jpg"; // Variable to hold the background image URL
    data = forcst;
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


