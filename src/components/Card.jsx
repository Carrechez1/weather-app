import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "./Loadind";

const Card = ({ lat, lon }) => {
  const [weather, setWeather] = useState();
  const [temperture, setTemperture] = useState();
  const [isCelsius, setIsCelsius] = useState(true);
  const [load, setLoad] = useState(true);
  useEffect(() => {
    if (lat) {
      const APIKey = `bc3e3de8ce57e86cb29342a39ead56b1`;
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKey}`;
      axios.get(url).then((res) => {
        setWeather(res.data);

        const temp = {
          celsius: `${Math.round(res.data.main.temp - 273.15)}°C`,
          farenheit: `${Math.round(
            (res.data.main.temp - 273.15) * (9 / 5) + 32
          )}°F`,
        };
        setTemperture(temp);
        setLoad(false);
      });
    }
  }, [lat, lon]);
  console.log(weather);
  const handleClick = () => {
    setIsCelsius(!isCelsius);
  };
  if (load) {
    return <Loading />;
  } else {
    return (
      <div>
        <div className="card">
          <h1>Weather app</h1>
          <h2 className="loc">{`${weather?.name}, ${weather?.sys.country}`}</h2>
          <div className="tot">
            <div className="img">
              <img
                src={`http://openweathermap.org/img/wn/${weather?.weather[0].icon}@4x.png`}
                alt=""
              />
              <span className="calc">
                <p>{isCelsius ? temperture?.celsius : temperture?.farenheit}</p>
              </span>
            </div>
            <div className="inf">
              <h2>{`${weather?.weather[0].description}`}</h2>
              <span>
                <p>
                  <strong>Wind speed: </strong>
                  {`${weather?.wind.speed}m/s`}
                </p>
              </span>
              <span>
                <p>
                  <strong>Clouds: </strong>
                  {`${weather?.clouds.all}%`}
                </p>
              </span>
              <span>
                <p>
                  <strong>Pressure: </strong>
                  {`${weather?.main.pressure}hPa`}
                </p>
              </span>
            </div>
          </div>
          <button className="but" onClick={handleClick}>
            {isCelsius ? `change to °F` : `change to °C`}
          </button>
        </div>
      </div>
    );
  }
};

export default Card;
