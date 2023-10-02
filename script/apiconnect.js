const cityName = $("#lbl-city");
const countryName = $("#lbl-country");
const curentTemp = $("#current-temp");
const curentImg = $("#condition-img");
const realfeel = $("#real-feel");
const windspeed = $("#wind-speed");
const humidity = $("#humidity");
const precipitation = $("#precipitation");
// const conditionImg = $("#condition-img");
const uv = $("#uv");
const currentcondition = $("#current-weather-condition");
const searchName = document.getElementById("search-field");

const forecastDay1day = $("#forecast-day1-day");
const forecastDay2day = $("#forecast-day2-day");
const forecastDay3day = $("#forecast-day3-day");
const forecastDay1date = $("#forecast-day1-date");
const forecastDay2date = $("#forecast-day2-date");
const forecastDay3date = $("#forecast-day3-date");

const forecastDay1 = $("#forecast-day1-condition");
const forecastDay2 = $("#forecast-day2-condition");
const forecastDay3 = $("#forecast-day3-condition");
const forecastDay1Img = $("#forecast-day1-image");
const forecastDay2Img = $("#forecast-day2-image");
const forecastDay3Img = $("#forecast-day3-image");

const dayString = new Date().getDay();
const dayArray =["Sun","Mon","Tue","Wed","Thu","Fri","Sat","Sun","Mon","Tue"];
const dayArrayReverse =["Sun","Sat","Fri","Thu","Wed","Tue","Mon","Sun","Sat","Fri","Thu","Wed","Tue"];

var last7history = Last7Days();
console.log(last7history);


const abc= $("#abcdefg");



// const countryName = document.getElementById("lbl-country");
searchBtnOnClick();

function searchBtnOnClick(){
    $.ajax({
        method : "GET",
        url : `https://api.weatherapi.com/v1/current.json?key=58b3a31e66174a62ac525133232609&q=${searchName.value}`,
        success : (resp) => {
            // console.log(resp);
            const city= resp.location.name;
            //console.log(city);
            cityName.text(resp.location.name);
            countryName.text(resp.location.country);
            currentcondition.text(resp.current.condition.text)
            curentTemp.text(resp.current.temp_c+"℃")
            // curentImg.text(resp.current.condition.icon)
            //console.log(resp.current.condition.icon);
            searchName.value="";
            realfeel.text(resp.current.feelslike_c+"℃")
            windspeed.text(resp.current.wind_kph+" kph")
            humidity.text(resp.current.humidity+"%")
            uv.text(resp.current.uv)
            precipitation.text(resp.current.precip_mm+" mm")
            curentImg.attr("src",resp.current.condition.icon) 
            myMap(resp);
        }
    });
    

    $.ajax({
        method : "GET",
        url : `https://api.weatherapi.com/v1/forecast.json?key=58b3a31e66174a62ac525133232609&q=${searchName.value}&days=4`,
        success : (resp) => {
            // console.log(resp);
            
            forecastDay1date.text(resp.forecast.forecastday[1].date)
            forecastDay2date.text(resp.forecast.forecastday[2].date)
            forecastDay3date.text(resp.forecast.forecastday[3].date)

            forecastDay1day.text(dayArray[dayString+1])
            forecastDay2day.text(dayArray[dayString+2])
            forecastDay3day.text(dayArray[dayString+3])

            forecastDay1.text(resp.forecast.forecastday[1].day.condition.text);
            forecastDay2.text(resp.forecast.forecastday[2].day.condition.text);
            forecastDay3.text(resp.forecast.forecastday[3].day.condition.text);

            forecastDay1Img.attr("src",resp.forecast.forecastday[1].day.condition.icon)
            forecastDay2Img.attr("src",resp.forecast.forecastday[2].day.condition.icon)
            forecastDay3Img.attr("src",resp.forecast.forecastday[3].day.condition.icon)
        }
    })

    for (let i = 1; i < 8; i++) {
        $.ajax({
            method : "GET",
            url : `https://api.weatherapi.com/v1/history.json?key=58b3a31e66174a62ac525133232609&q=${searchName.value}&dt=${last7history[i]}`,
            success : (resp) => {
                // console.log(resp);
                $("#pastdata-day"+i).text(resp.forecast.forecastday[0].date)
                $("#pastdata-day"+i+"-day").text(dayArrayReverse[dayString+(i+5)])
                // console.log(dayArrayReverse[dayString+(i+1)]);
                // console.log(last7history);
                $("#patadata-day"+i+"-img").attr("src",resp.forecast.forecastday[0].day.condition.icon)
                $("#pastdata-day"+i+"-condition").text(resp.forecast.forecastday[0].day.condition.text)
                $("#pastdata-day"+i+"-temp").text(resp.forecast.forecastday[0].day.avgtemp_c+"℃")
            }
        })
    }

}

function Last7Days () {

    var today = new Date();
    var oneDayAgo = new Date(today);
    var twoDaysAgo = new Date(today);
    var threeDaysAgo = new Date(today);
    var fourDaysAgo = new Date(today);
    var fiveDaysAgo = new Date(today);
    var sixDaysAgo = new Date(today);
    var sevenDaysAgo = new Date(today);

    oneDayAgo.setDate(today.getDate() - 1);
    twoDaysAgo.setDate(today.getDate() - 2);
    threeDaysAgo.setDate(today.getDate() - 3);
    fourDaysAgo.setDate(today.getDate() - 4); 
    fiveDaysAgo.setDate(today.getDate() - 5);
    sixDaysAgo.setDate(today.getDate() - 6);
    sevenDaysAgo.setDate(today.getDate() - 7);

    var result = [formatDate(today),formatDate(oneDayAgo),formatDate(twoDaysAgo),formatDate(threeDaysAgo),formatDate(fourDaysAgo),formatDate(fiveDaysAgo),formatDate(sixDaysAgo),formatDate(sevenDaysAgo)];
    // var result = result0+","+result1+","+result2+","+result3+","+result4+","+result5+","+result6+","+result7;
    // console.log(result);
    return(result);
}

function formatDate(date){

    // var dd = date.getDate();
    var dd = date.getDate();
    var mm = date.getMonth()+1;
    var yyyy = date.getFullYear();
    if(dd<10) {dd='0'+dd}
    if(mm<10) {mm='0'+mm}
    // date = mm+'/'+dd+'/'+yyyy;
    date = yyyy+'-'+mm+'-'+dd;
    return date
 }


function myMap(data) {
    // console.log(data);
    let lati = data.location.lat;
    let lon = data.location.lon;
    // console.log(data.location.lon);
    // console.log(data.location.lat);
    let mapProp = {
      center: new google.maps.LatLng(lati, lon),
      zoom: 10,
    };
  
    let map = new google.maps.Map(document.getElementById("map"), mapProp);
    let marker = new google.maps.Marker({
      position: new google.maps.LatLng(lati, lon),
      map: map,
      title: data.location.name,
    });
}