import { FaHeart, FaRegHeart, FaRegTimesCircle } from 'react-icons/fa';
import { useContext, useEffect, useState } from 'react';
import './Weather.css';
import { Link } from 'react-router-dom';
import { WeathersContext } from '../../context/WeathersContext';
import { FavoritesContext } from '../../context/FavoritesContext';
import getWeather from '../../service';

const Weather = ({ weather }) => {
  const { id, latitude, longitude, name } = weather;
  const { weathers, setWeathers } = useContext(WeathersContext);
  const { favorites, setFavorites } = useContext(FavoritesContext);
  const [isFavorite, setIsFavorite] = useState(false);
  const [dataParsed] = useState({});
  const [weatherInformation, setWeatherInformation] = useState(weather);

  useEffect(() => {
    const [weather] = weathers.filter((weather) => weather.id === id);
    if (!weather) {
      const dataStored = localStorage.getItem('data');
      const dataParsed = JSON.parse(dataStored);
      console.log('dataParsed => ', dataParsed);
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

    if (!weather.time) {
      getWeather(weather)
        .then((data) => {
          console.log('sin contexto solo ls => ', data);
          
          const dd = data.current_weather.time;
          const date = new Date(dd);
          console.log("date => ", date.toLocaleString("es-AR"))
          setWeatherInformation({current_weather : {time : date.toLocaleString("es-AR")}} );

          

        })
        .catch((error) => console.log(error));
    }
  }, []);

  const handleEliminate = () => {
    const filteredData = weathers.filter((weather) => weather.id !== id);
    setWeathers(filteredData);
    localStorage.setItem(
      'data',
      JSON.stringify({ user: dataParsed.user, weathers: [...filteredData] })
    );
  };
  const handleFavorite = () => {
    setIsFavorite((isFavorite) => !isFavorite);

    const foundIndex = favorites.findIndex((fav) => fav.id === id);

    if (foundIndex === -1) {
      setFavorites([...favorites, weather]);
      return;
    }

    setFavorites(
      favorites.filter((fav) => fav.id !== id) //!==
    );
  };

  return (
    <div className="weather-container">
      <div className="weather">
        <h4 className="weather-titule">Weather Location</h4>
        <h6 className="weather-zone">{name}</h6>
        <h1 className="weather-time">
          {weatherInformation?.current_weather &&
            weatherInformation?.current_weather.time}
          {weatherInformation?.time && weatherInformation?.time}
        </h1>
        <div className="weather-lon-lati">
          <div className="details">
            <p>latitude</p>
            <span className="weather-latt-lot">{latitude}</span>
          </div>
          <div className="details">
            <p>longitude</p>
            <span className="weather-lat-lot">{longitude}</span>
          </div>
        </div>
      </div>
      <div className="weather-actions">
        <div className="delete" onClick={handleEliminate}>
          <FaRegTimesCircle />
        </div>
        <div className="fav" onClick={handleFavorite}>
          {isFavorite ? <FaHeart className="heart" /> : <FaRegHeart />}
        </div>
        <Link className="btn-see-more" to={`/weather/${id}`}>
        See more
        </Link>
      </div>
    </div>
  );
};
export default Weather;
