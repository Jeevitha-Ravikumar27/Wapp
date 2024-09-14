
//<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css" integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg==" crossorigin="anonymous" referrerpolicy="no-referrer" />import {useState} from 'react';
import { useState } from "react";
import "./Wappe.css";
/*import sunny from "./assests/sunny.jpeg";
import snow from "./assets/snow.jpeg";
import sunrain from "./assests/sunrain.jpeg";
import cloudsun from "./assests/cloudsun.jpeg";*/

const WeatherDetails = ({icon,temp,city,country,lat,long,humidity,wind }) => {
    return (
        <>
     <div className="image"> <img src={icon}  /></div>
        <div className="temp">{temp}°C </div>
        <div className="location">{city}</div>
        <div className="country">{country}</div>
        <div className="cord">
            <div>
                <span className="lat">latitude</span>
                <span className="A">{lat}</span>
            </div>  
            <div>  
                <span className="long">longitude</span>
                <span className="A">{long}</span>
            </div>
        </div>
        <div className="data-container">
            <div className="element">
                <img src="OIP.jpeg" className="icon" />
                <div className="data">
                 <div className="humipercent">{humidity}%</div>
                 <div className="text1">Humidity</div>

                </div>
            </div>
            <div className="element">
                <img src="hand-drawn-wind-air-flow-260nw-2223708413.webp" className="icon1" />
                <div className="data">
                 <div className="windpercent">{wind} km/h </div>
                 <div className="text2">Wind Speed</div>

                </div>
            </div>

        </div>
        </>
    );
};



export const Wapp = () => {
   const[icon,setIcon] = useState("sunny.jpeg");
   const[temp,setTemp] = useState(0);
   const[city,setCity] = useState("Chennai");
   const[country,setCountry] = useState("India");
   const[lat,setLat] = useState(0);
   const[long,setLong] = useState(0);
   const[humidity,setHumidity] = useState(0);
   const[wind,setWind] = useState(0);
   const[text,setText] = useState("Chennai");
   const[loading,setLoading] = useState(false);
   const[cityNotFound,setCityNotFound] = useState(false);

   const weatherIconMap ={
    "01d" : "/sunny.jpeg",
    "01n" : "/sunny.jpeg",
    "02d" : "/cloudsun.jpeg",
    "02n" : "/cloudsun.jpeg",
    "03d" : "/sunrain.jpeg",
    "03n" : "/sunrain.jpeg",
    "04d" : "/sunrain.jpeg",
    "04n" : "/sunrain.jpeg",
    "09d" : "/rain.jpeg",
    "09n" : "/rain.jpeg",
    "10d" : "/rain.jpeg",
    "10n" : "/rain.jpeg",
    "13d" : "/snow.jpeg",
    "13n" : "/snow.jpeg",
   };


   

   const search = async () =>{
    setLoading(true);
    
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=bf140554c41826f0b148d3472d1b40d3&units=Metric`;
    try{
        let res = await fetch(url);
        let data = await res.json();
        if(data.cod ==="404"){
            console.log("City not Found");
            setCityNotFound(true);
            setLoading(false);
            return;
        }
        setHumidity(data.main.humidity);
        setWind(data.wind.speed);
        setTemp(Math.floor(data.main.temp));
        setCity(data.name);
        setCountry(data.sys.country);
        setLat(data.coord.lat);
        setLong(data.coord.lon);
       const weatherIconCode = data.weather[0].icon;
        setIcon(weatherIconMap[weatherIconCode] || clearIcon);
       setCityNotFound(false);
    }catch(error){
console.log("An error Occured");
    }finally{
        setLoading(false);

    }
};
const handleCity = (e)=> {
    setText(e.target.value);

};
const handleKeyDown =(e) =>{
    if(e.key === "Enter"){
        search();
    }
}
   
  return (
    <div className='container'>
        <div className="input-con">
            <input type="text"  className='cityinput' placeholder='Search City' onChange={handleCity}
            value={text} onKeyDown={handleKeyDown}/>
            <div className="searchicon">
                <img src="seach-icon-22.jpg" onClick={ ()=> search()}/>
            </div>
           
            

        </div>
        <WeatherDetails icon={icon} temp={temp} city={city} country={country} lat={lat} long={long}  humidity={humidity}
         wind ={wind} />
         <p className="copy"> Designed By <span>Jeevitha Ravikumar</span></p>
    </div>
  )
}

    
