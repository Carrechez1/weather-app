import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "./Loadind";

const Card = ({ lat, lon, weather, setWeather }) => {
  /******************Estados****************/
  const [temperture, setTemperture] = useState();
  const [isCelsius, setIsCelsius] = useState(true);
  const [load, setLoad] = useState(true);
  let date = new Date().toLocaleDateString("en-US");
  let hour = new Date().toLocaleTimeString("en-US");
  const [today, setToday] = useState(date);
  const [now, setNow] = useState(date);
  const [now1, setNow1] = useState(hour);
  /**********************************/
  useEffect(() => {
    /*********al existir la latitud renderiza el componente****************/
    if (lat) {
      const APIKey = `bc3e3de8ce57e86cb29342a39ead56b1`;
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKey}`;
      /************Peticion asincronica para asignarle la informacion a weather*************/
      axios.get(url).then((res) => {
        setWeather(res.data);
        /******Cambio de °F a °C y viceversa********/
        const temp = {
          celsius: `${Math.round(res.data.main.temp - 273.15)} °C`,
          farenheit: `${Math.round(
            (res.data.main.temp - 273.15) * (9 / 5) + 32
          )} °F`,
        };
        setTemperture(temp);
        // setNow();
        // setNow1();
        setTimeout(() => {
          setLoad(false);
        }, 2500);
      });
    }
  }, [lat, lon]);
  /*************Cambio de true a false y viceversa al estado********************/
  const handleClick = () => {
    setIsCelsius(!isCelsius);
  };
  const updateTime = () => {
    let time = new Date().toLocaleTimeString("en-US");
    setNow1(time);
  };
  setInterval(updateTime, 1000);
  // obtener la fecha y la hora

  console.log(weather);
  if (load) {
    return <Loading />;
  } else {
    return (
      <div className="card">
        <h1 className="loc">{`${weather?.name}, ${weather?.sys.country}`}</h1>
        <div className="temp">
          <div className="img">
            <img
              className="pin"
              src={
                weather &&
                `http://openweathermap.org/img/wn/${weather?.weather[0].icon}@4x.png`
              }
              alt=""
            />
          </div>
        </div>
        <div className="temp2">
          <span className="calc">
            <p className="calc1">
              {isCelsius ? temperture?.celsius : temperture?.farenheit}
            </p>
          </span>

          <button className="but" onClick={handleClick}>
            {isCelsius ? `change to °F` : `change to °C`}
          </button>
        </div>

        <div className="inf">
          <span className="windSpeed">
            <p className="windd">
              <strong>Wind speed: </strong>
              {`${weather?.wind.speed}m/s`}
            </p>
            <img className="wind" src="/viento.gif" alt="" />
          </span>
          <span className="clouds">
            <p className="cloudsp">
              <strong>Clouds: </strong>
              {`${weather?.clouds.all}%`}
            </p>
            <img className="cloudsimg" src="/clouds.gif" alt="" />
          </span>
        </div>

        <div className="date">
          <h2 className="desc">{`${weather?.weather[0].description}`}</h2>
          <span>
            <p className="dt">{`${now}`}</p>
          </span>

          <span>
            <p className="dt">{`${now1}`}</p>
          </span>
        </div>
      </div>
    );
  }
};

export default Card;
