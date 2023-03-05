const userTab = document.querySelector('[data-userWeather]')
const searchTab = document.querySelector('[data-searchWeather]')
const userContainer = document.querySelector('.weather-container')
const grantAccessContainer = document.querySelector(".grant-location-container")
const searchForm = document.querySelector("[data-searchForm]")
const loadingScreen = document.querySelector(".loading-container")
const userInfoContainer = document.querySelector(".user-info-container")
// initials
let currentTab = userTab;
const API_key = "e3e73a74d64244b1c53a47af2b00b5bb"
currentTab.classList.add('current-Tab');

getfromSessionStorage();

function switchTab(clickedTab) {
    if (currentTab != clickedTab) {
        currentTab.classList.remove('current-Tab');
        currentTab = clickedTab;
        currentTab.classList.add('current-Tab');

        if (!searchForm.classList.contains("active")) {
            userInfoContainer.classList.remove('active');
            grantAccessContainer.classList.remove('active')
            searchForm.classList.add("active");
        }
        else {
            searchForm.classList.remove('active');
            userInfoContainer.classList.remove('active');
            getfromSessionStorage();

        }
    }
}

userTab.addEventListener('click', () => {
    switchTab(userTab);
});
searchTab.addEventListener('click', () => {
    switchTab(searchTab);
});

// checkcoods//
function getfromSessionStorage() {
    const localCoordinates = sessionStorage.getItem("user-coordinates");

    if (!localCoordinates) {
        grantAccessContainer.classList.add('active')

    }
    else {
        const coordinates = JSON.parse(localCoordinates);
        fetchUserWeatherInfo(coordinates);
    }
}

async function fetchUserWeatherInfo(coordinates) {
    const { lat, lon } = coordinates;
    grantAccessContainer.classList.remove("active");
    loadingScreen.classList.add("active");

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}&units=metric`);
        const data = await response.json();

        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        rendorWeatherInfo(data);
    }
    catch (err) {
        loadingScreen.classList.remove("active");
        // console.log(err);
    }


}

function rendorWeatherInfo(weatherInfo) {
    //fistly, we have to fetch the elements 


    const cityName = document.querySelector("[data-cityName]");
    const countryIcon = document.querySelector("[data-countryIcon]")
    const desc = document.querySelector("[data-weatherDesc]")
    const weatherIcon = document.querySelector("[data-weatherIcon]")
    const temp = document.querySelector("[data-temp");
    const windspeed = document.querySelector("[data-windspeed");
    const humidity = document.querySelector("[data-humidity");
    const cloudy = document.querySelector("[data-cloudy");

    cityName.innerText = weatherInfo?.name;
    countryIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
    desc.innerText = weatherInfo?.weather?.[0]?.description;
    weatherIcon.src = `http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
    temp.innerText = `${weatherInfo?.main?.temp} °C`;
    windspeed.innerText = `${weatherInfo?.wind?.speed} m/s`;
    humidity.innerText = `${weatherInfo?.main?.humidity} %`;
    cloudy.innerText = `${weatherInfo?.clouds?.all} %`;

}

function getlocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showposition);
    } else {
        alert("not found")
        console.log("e")
    }
}

function showposition(position) {

    const userCoordinates = {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
    }

    sessionStorage.setItem("user-coordinates", JSON.stringify(userCoordinates));
    fetchUserWeatherInfo(userCoordinates);
}



const grantAcess = document.querySelector("[data-grantAcess]")

grantAcess.addEventListener('click', getlocation);

const searchInput = document.querySelector("[data-searchInput]");

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let cityName = searchInput.value;

    if (cityName === "")
        return;
    else
        fetchSearchWeatherInfo(cityName);

})


async function fetchSearchWeatherInfo(city) {
    loadingScreen.classList.add("active");
    userInfoContainer.classList.remove("active");
    grantAccessContainer.classList.remove("active");

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}&units=metric`
        );

        const data = await response.json();
        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        rendorWeatherInfo(data);
    }
    catch (err) {
        // console.log(err);
    }

}









































// async function showWeather() {

//     try {
//         let City = "gwalior";

//         const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${City}&appid=${API_key}&units=metric`);

//         const data = await response.json();
//         console.log(data);

//         let para = document.createElement('p');
//         para.innerText = `${data?.main?.temp.toFixed(2)} C`
//         document.body.appendChild(para);
//     }
//     catch (err) {//

//     }

// }
// showWeather();

// https://api.openweathermap.org/data/2.5/weather?lat=57&lon=-2.15&appid={API key}&units=metric


// async function wed()
// {
//    try
//    {
//     let lat =26.2124;
//     let lon = 78.1772;
//     const k= await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}&units=metric`);
//     let data = await k.json()
//     console.log(data);
//    }
//    catch(err)
// //    {
// //     console.log("error found",err)
// //    }
// // }

// // wed();

// function getlocation() {
//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(showposition)
//     }
//     else {
//         console.log("no support");
//     }
// }

// function showposition(position) {
//     let lat = position.coords.latitude;
//     let lon = position.coords.longitude;
//     wed()
//     async function wed() {
//         try {
//             let lat = 26.2124;
//             let lon = 78.1772;
//             const k = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}&units=metric`);
//             let data = await k.json()
//             // console.log(data);
//             console.log(`${data?.main?.temp.toFixed(2)} C`)

//         }
//         catch (err) {
//             console.log("error found", err)
//         }
//     }

//     //   console.log(lat)
//     //   console.log(lon)
