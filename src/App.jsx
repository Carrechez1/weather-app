import { useEffect, useState } from "react";
import "./css/App.css";
import Card from "./components/Card";

function App() {
  /******************Estados****************/
  const [coords, setCoords] = useState();
  const [weather, setWeather] = useState();
  /**********************************/
  useEffect(() => {
    /******Funcion Succes que se usara para conseguir la posicion********/
    const success = (pos) => {
      const latlon = {
        lat: pos.coords.latitude,
        lon: pos.coords.longitude,
      };
      /*********se asigna la latitud y longitud al estado de las coordenadas*****/
      setCoords(latlon);
    };
    /******************Metodo para conseguir la posicion****************/
    navigator.geolocation.getCurrentPosition(success);
  }, [coords?.lat, coords?.lon]);
  /************************************************/
  /************************************************/
  let bgImg = weather?.weather[0].main;
  bgImg = "Clear";
  let arta;
  if (bgImg == "Clouds") {
    arta = {
      backgroundImage: `url("/img/65807.jpg")`,
    };
  } else if (bgImg == "Clear") {
    arta = {
      backgroundImage: `url("/img/day.jpg")`,
    };
  } else if (bgImg == "Snow") {
    arta = {
      backgroundImage: `url("/img/nieve.jpg")`,
    };
  } else if (bgImg == "Rain" || bgImg == "Drizzle") {
    arta = {
      backgroundImage: `url("/img/llu.jpg")`,
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

  return (
    <div className="App" style={arta}>
      <Card
        weather={weather}
        setWeather={setWeather}
        lon={coords?.lon}
        lat={coords?.lat}
      />
    </div>
  );
}

export default App;
