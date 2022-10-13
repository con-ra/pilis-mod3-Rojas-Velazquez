import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { WeathersContext } from "../../context/WeathersContext";
import "./WeatherDisplay.css";
import icon from "../../assets/icon.png";
import getWeather from "../../service";

const WeatherDisplay = () => {
  const { id } = useParams();
  const { weathers } = useContext(WeathersContext);
  const [weather] = weathers.filter((weather) => weather.id === id);
  const [weatherInformation, setWeatherInformation] = useState(weather);

  console.log("weather => ", weather);

  useEffect(() => {
    if (!weather) {
      const dataStored = localStorage.getItem("data");
      const dataParsed = JSON.parse(dataStored);
      const [weather] = dataParsed.weathers.filter(
        (weather) => weather.id === id
      );

      getWeather(weather)
        .then((data) => {
          setWeatherInformation(data);
        })
        .catch((error) => console.log(error));
      return;
    }

    if (!weather.temperature) {
      getWeather(weather)
        .then((data) => {
          setWeatherInformation(data);
        })
        .catch((error) => console.log(error));
    }
  }, []);
  return (
    <div className="weather-display-container">
      <div className="weather-display-card">
        <h4 className="weather-display-titule">Infomation Weather</h4>
        <h6 className="weather-display-zone">{weather.name}</h6>
        <img className="weather-display-img" src={icon} alt="icon" />
        <div className="weather-temp-windspeed">
          <div className="details">
            <p>temperature</p>
            <span className="weather-wind-temp">
              {weatherInformation?.current_weather &&
                weatherInformation?.current_weather.temperature}

              {weatherInformation?.temperature &&
                weatherInformation?.temperature}
              <sup>&deg;</sup>
            </span>
          </div>
          <div className="details">
            <p>windspeed</p>
            <span className="weather-wind-temp">
              {weatherInformation?.current_weather &&
                weatherInformation?.current_weather.windspeed}
              {weatherInformation?.windspeed && weatherInformation.windspeed}
            </span>
          </div>
        </div>
      </div>
      <Link className="btn-back" to="/">
        Back to home
      </Link>
    </div>
  );
};

export default WeatherDisplay;
