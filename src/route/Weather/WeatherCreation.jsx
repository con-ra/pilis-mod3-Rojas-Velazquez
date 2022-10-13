import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getWeather } from "../../service";
import { useNavigate } from "react-router-dom";
import "./WeatherCreation.css";
import { WeathersContext } from "../../context/WeathersContext";

const WeatherCreation = () => {
  const { weathers, setWeathers } = useContext(WeathersContext);
  const [dataParsed, setDataParsed] = useState({});

  let dataStored;

  const navigate = useNavigate();

  useEffect(() => {
    dataStored = localStorage.getItem("data");
    if (dataStored) {
      setDataParsed(JSON.parse(dataStored));
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    getWeather(data)
      .then((res) => {
        console.log("res=>", res);
        const { temperature, weathercode, windspeed, time } =
          res.current_weather;
        const date = new Date(time);
        const WeatherNew = {
          id: crypto.randomUUID(),
          name: data.name,
          latitude: data.latitude,
          longitude: data.longitude,
          temperature,
          weathercode,
          windspeed,
          time: date.toLocaleString("es-AR"),
        };

        const WeatherSimpleInfo = {
          id: WeatherNew.id,
          name: WeatherNew.name,
          latitude: WeatherNew.latitude,
          longitude: WeatherNew.longitude,
        };

        setWeathers([...weathers, WeatherNew]);

        localStorage.setItem(
          "data",
          JSON.stringify({
            user: dataParsed.user,
            weathers: [...dataParsed.weathers, WeatherSimpleInfo],
          })
        );

        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="weather-new-container">
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <form className="weather-form" onSubmit={handleSubmit(onSubmit)}>
        <h3 className="form-welcome">
          Add new weather!
          <span className="form-subtitule">
            Just complete this information.
          </span>
        </h3>
        <label>Enter City</label>
        <input
          className="input-weather-name-form"
          type="text"
          placeholder="Nombre de la ciudad"
          {...register("name", {
            required: "You must enter a name",
          })}
        />
        <p>{errors.timezone?.message}</p>
        <label>Enter Latitude</label>
        <input
          className="input-weather-name-form"
          type="text"
          placeholder="por ej. -23423"
          {...register("latitude", {
            required: "You must enter a latitude",
          })}
        />
        <label>Enter Longitude</label>
        <input
          className="input-weather-name-form"
          type="text"
          placeholder="por ej 234234"
          {...register("longitude", {
            required: "You must enter a longitude",
          })}
        />
        <p>{errors.tag?.message}</p>
        <button className="btn-form" type="submit">
          Crear Weather
        </button>
      </form>
    </div>
  );
};

export default WeatherCreation;
