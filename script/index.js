// Function to get the current date and time
// function getCurrentDateAndTime() {
//     const dateTime = new Date();
//     return dateTime.toLocaleString();
//   }
  
//   // Target an HTML element to display the current date and time
//   const dateDisplay = document.getElementById("date-container");
  
//   // Set the innerHTML of the element to the current date and time returned by the function
//   dateDisplay.innerHTML = getCurrentDateAndTime();

//   `use strict`;
function refreshTime() {
  const dateDisplay = document.getElementById("date-container");
  const timeDisplay = document.getElementById("live-time");
  const dayDisplay = document.getElementById("live-day");
  // const dateString = new Date().toLocaleDateString();
  const timeString = new Date().toLocaleTimeString();
  const dayString = new Date().getDay();
  const monthString = new Date().getMonth();
  const dateString = new Date().getDate();
  const yearString = new Date().getFullYear();
  // console.log(monthString+"  "+dateString+"  "+yearString)
  const monthArray =["January","February","March","April","May","June","July","August","September","October","November","December"];
  const fullDate = dateString+" - "+monthArray[monthString]+" - "+yearString;
  const dayArray =["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  dayDisplay.innerHTML = dayArray[dayString];
  dateDisplay.textContent = fullDate;
  timeDisplay.innerHTML = timeString;
}
  setInterval(refreshTime, 1000);





let themeImg =document.getElementById("theme-mode-img");
let modeSelector=0;


lightModeChanger();

function lightModeChanger(){
  themeImg.addEventListener("click",()=>{
    if(modeSelector%2==0){
      console.log("lightmodechanged")
      themeImg.src="assets/icons/brightness.png"; 
      modeSelector++;
      themeChanger();
    }else{
      themeImg.src="assets/icons/night-mode.png";
      modeSelector++;
      themeChanger();
    }
    
    
  })
}

let currentLocation = document.getElementById("current-location");
let divAirCondition = document.getElementById("div-aircondition");
let div3dayForecast = document.getElementById("div-3dayforecast");
let divPreviousWeather = document.getElementById("div-previous-weather");
let divPastdataHead = document.getElementById("day7-pastdata-heading");
let liveTime = document.getElementById("live-time-p");


function themeChanger(){
  if(modeSelector%2==0){
    document.body.style.backgroundImage = "url('assets/lightmode.jpg')";
    // document.body.style.color= "#000";
    liveTime.style.color = "#000";
    currentLocation.style.backgroundColor = "#34495e";
    divAirCondition.style.backgroundColor = "rgba(30, 20, 20, 0.4)";
    div3dayForecast.style.backgroundColor = "rgba(30, 20, 20, 0.4)";
    divPreviousWeather.style.backgroundColor = "rgba(30, 20, 20, 0.4)";
    divPastdataHead.style.backgroundColor = "rgba(38, 10, 10, 0.499)";
  }else{
    document.body.style.backgroundImage = "url('assets/darkmode.jpg')";
    liveTime.style.color = "#fff";
    currentLocation.style.backgroundColor = "rgba(2, 6, 37, 0.452)";
    divAirCondition.style.backgroundColor = "rgba(217, 217, 217, 0.18)";
    div3dayForecast.style.backgroundColor = "rgba(217, 217, 217, 0.18)";
    divPreviousWeather.style.backgroundColor = "rgba(17, 16, 16, 0.249)";
    divPastdataHead.style.backgroundColor = "rgba(217, 217, 217, 0.3)";
  }
}



