// API KEY
const KEY = "962061f844fea6a1cc1966a7b91540e4";
//const token_weatherbit = 'a0bbb381ad584f17bc66a81ec2b31ee0';
const WEEK_DAYS = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

let bg, url, new_location, active;
// Mettre en maj la premiere lettre  
function upperCaseFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.substring(1);
}

// Formater la date
let date = new Date();
let options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
};

let toDay = date.toLocaleDateString('fr-FR', options);

let ordred_week_days = WEEK_DAYS.slice(WEEK_DAYS.indexOf(toDay)).concat(WEEK_DAYS.slice(0, WEEK_DAYS.indexOf(toDay)));

let formatDate = toDay.split(' ');
let day = upperCaseFirstLetter(formatDate[0]);
let dayInMonth = formatDate[1]
let month = upperCaseFirstLetter(formatDate[2]);
let year = formatDate[3];


// DOM objects


 const dayName = document.querySelector(".date-container h2");
 const date_day = document.querySelector(".date-day");
 const city = document.querySelector(".location");
 const icon_weather = document.querySelector("#icon-weather");
 const temp = document.querySelector(".weather-temp");
 const desc = document.querySelector(".weather-container h3");
 const temp_max_min = document.querySelector(".precipitation .value");
 const humidity = document.querySelector(".humidity .value");
 const wind = document.querySelector(".wind .value")
 const day_name_list = document.querySelectorAll(".day-name");
 const img_week_list = document.querySelectorAll(".week-list img");
 const week_list = document.querySelector(".week-list");
 const cityName = document.getElementById("input");
 

// vider l'input lors du click
function CleanSearch() {
        cityName.value = "";
}


async function meteo() {
    // Reuperation de la localisation saisie par l'utilisateur, Sinon localisation = Paris
    new_location = cityName.value; 
    if (new_location !== "Changer la localisation") {
        url = `https://api.openweathermap.org/data/2.5/weather?q=${new_location}&appid=${KEY}&units=metric&lang=fr`;
    } else{
        url = `https://api.openweathermap.org/data/2.5/weather?q=paris&appid=${KEY}&units=metric&lang=fr`;
    } 
    
    let response = await fetch(url);
    let data = await response.json();
    if (data.cod !== 200) {

       // weather_side.innerHTML = `<div><p>${data.message}</p></div>`;
    } 
    else {

           //Changer la couleur d'arriere plan selon la meteo
            // switch (data.weather[0].main) {
            // case "clouds":
            //     bg = "#CCCCCC";
            //     break;
            // case "Rain":
            //     bg = "#353636";
            //     break;
            // case "Snow":
            //     bg = "#e2dede";
            //     break;
            // default:
            //     bg = "#72EDF2";
            // }

            // Recuperation des coordonnées de la localisation
            let coord_lat = data.coord.lat;
            let coord_lon = data.coord.lon;

            // Integration des données, recuperées de l'API, dans notre HTML
            dayName.textContent = day;
            date_day.textContent = dayInMonth + " " + month + " " +year;
            city.textContent = data.name+ ", " + data.sys.country;
            icon_weather.src= `./img/${data.weather[0].icon}.svg`;
            temp.textContent = Math.round(data.main.temp) + " °C";
            desc.textContent = upperCaseFirstLetter(data.weather[0].description);
            temp_max_min.textContent = Math.round(data.main.temp_max)+" - "+Math.round(data.main.temp_min)+ " °C";
            humidity.textContent = data.main.humidity+ " %";
            wind.textContent = data.wind.speed+ " km/h";

            // 2eme requette pour recuperer les informations pour les 7 prochains jours (on utlise le lan et le lon)
            let url_week = `https://api.openweathermap.org/data/2.5/onecall?lat=${coord_lat}&lon=${coord_lon}&exclude=minutely,hourly,current&appid=${KEY}&units=metric&lang=fr`
            let week_response = await fetch(url_week);
            let week_data = await week_response.json();
            
            let week_list_days=""
            for(let i=0; i<7; i++){
                if (i == 0){ active = "active"}
                else active = "";


                week_list_days  += `
                <li class="${active}">
                    <img src="./img/${week_data.daily[i].weather[0].icon}.svg" alt="" width="40px" height="40px">
                    <span class="day-name"> ${ordred_week_days[i].substring(0, 3)}</span>
                    <span class="day-temp">${Math.round(week_data.daily[i].temp.day)}°C</span>
                </li>
                `;
            }
            week_list.innerHTML = week_list_days+ '<div class="clear"></div>';
        }
    
  


}
meteo();
