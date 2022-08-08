import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import Card from "./components/Card";

function App() {
  const [coords, setCoords] = useState();
  const [weather, setWeather] = useState();
  useEffect(() => {
    const success = (pos) => {
      const latlon = {
        lat: pos.coords.latitude,
        lon: pos.coords.longitude,
      };
      setCoords(latlon);
    };
    navigator.geolocation.getCurrentPosition(success);
    if (coords?.lat) {
      const APIKey = `bc3e3de8ce57e86cb29342a39ead56b1`;
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords?.lat}&lon=${coords?.lon}&appid=${APIKey}`;
      axios.get(url).then((res) => {
        setWeather(res.data);
      });
    }
  }, [coords?.lat, coords?.lon]);
  let bgImg = weather?.weather[0].main;
  let arta;
  if (bgImg == "Clouds") {
    arta = {
      backgroundImage: `url("/img/65807.jpg")`,
    };
  } else if (bgImg == "Clear") {
    arta = {
      backgroundImage: `url("/img/Clear.jpg")`,
    };
  } else if (bgImg == "Snow") {
    arta = {
      backgroundImage: `url("/img/Snow.jpg")`,
    };
  } else if (bgImg == "Rain" || bgImg == "Drizzle") {
    arta = {
      backgroundImage: `url("/img/Rain.jpg")`,
    };
  } else if (bgImg == "Thunderstorm") {
    arta = {
      backgroundImage: `url("/img/Thunderstorm.jpg")`,
    };
  } else {
    arta = {
      backgroundImage: `url("/img/Sun.jpg")`,
    };
  }

  console.log(bgImg);
  return (
    <div className="App" style={arta}>
      <Card lon={coords?.lon} lat={coords?.lat} />
    </div>
  );
}

export default App;
