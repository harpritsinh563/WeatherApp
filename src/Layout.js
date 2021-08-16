import React from 'react'
import './styles.css'
import { useState,useEffect} from 'react';

const Layout = () => {
    const [time,settime]=useState(new Date().toLocaleTimeString());
    const style1 = {color: "orange",marginTop: "5%"};
    const [searchVal,setSearchVal]=useState("Vadodara");
    const [tempinfo,settempinfo]=useState({});
    const [weatherState,setWeatherstate]=useState("");

    setInterval(() => {
        settime(new Date().toLocaleTimeString());
    }, 1000);
    const getWeather = async() =>
    {
        try{
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchVal}&units=metric&appid=60f9c1610fd5525f2d43520444d6b16d`;
            const res = await fetch(url);
            const data = await res.json();
            console.log(data)
            const{temp} = data.main;
            const {main:weathertype}=data.weather[0];
            const {name}=data;
            const myinfo={
                temp,weathertype,name
            }
            settempinfo(myinfo);
        }
        catch(error)
        {
            console.log(error);
        }
    }
    useEffect(() => {
        getWeather();
    },[])

    useEffect(() => {
        if(tempinfo.weathertype)
        {
            
            switch (tempinfo.weathertype) {
                case "Clouds":
                    setWeatherstate("wi-day-cloudy")
                    break;
                case "Haze":
                    setWeatherstate("wi-fog");
                    break;
                case "Clear":
                    setWeatherstate("wi-day-sunny");
                    break;
                case "Rain":
                    setWeatherstate("wi-day-rain")
                    break;
                default:
                    setWeatherstate("wi-day-sunny");
                    break;
            }
        }
    }, [tempinfo.weathertype])
    return (
            <div className="container">
                <div className="title">WEATHER</div>
                <div className="SearchBox">
                    <input type="search" value={searchVal} onChange={(e)=>setSearchVal(e.target.value)} className="SearchBar" autoFocus placeholder="Search City"/>
                    <button className="SearchButton" onClick={getWeather}>Search</button>
                </div>
                <div className="box">
                    <div className="weathercond"><i className={`wi ${weatherState}`} style={style1}></i></div>
                    <div className="location">{tempinfo.name}</div>
                    <div className="datetime">
                        
                    <div className="date">{new Date().toLocaleDateString()}</div>
                    <div className="time">{time}</div>
                    </div>
                    <div className="temperature">
                        <span>{tempinfo.temp}&deg;</span>
                    </div>
                    <div className="WeatherType">
                        {tempinfo.weathertype}
                    </div>
                </div>
                <div className="footer">
                    CREATED WITH <i className="fas fa-heart" style={{color:"red"}}></i> BY HARPRIT
                </div>
            </div>
    )
}

export default Layout
