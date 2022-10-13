import Weather from "./Weather";
import "./Weathers.css";
const Weathers = ({ weathers }) => {
  return (
    <>
      <div className="cards">

        {weathers.map((weather) => (
          <Weather key={weather.id} weather={weather} />
        ))}
      </div>
    </>
  );
};

export default Weathers;
