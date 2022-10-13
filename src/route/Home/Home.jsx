import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Favorites from "../../component/Favorite/Favorites";
import Weathers from "../../component/Weather/Weathers";
import { UserContext } from "../../context/UserContext";
import { WeathersContext } from "../../context/WeathersContext";
import "./Home.css";

const Home = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const { weathers, setWeathers } = useContext(WeathersContext);
  const [search, setSearch] = useState("");

  let dataStored;
  let dataParsed;
  useEffect(() => {
    const data = localStorage.getItem("data");

    if (data) {
      const dataStored = JSON.parse(data);
      setCurrentUser(dataStored.user);
    }

    dataStored = localStorage.getItem("data");
    if (weathers.length === 0 && dataStored) {
      dataParsed = JSON.parse(dataStored);

      console.log(" weathers ", weathers);
      setWeathers([...weathers, ...dataParsed.weathers]);
      console.log("dt", dataParsed);
    }
    console.log(" weathers ", weathers.length);
  }, []);
  console.log("weathers => ", weathers);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const result = !search
    ? weathers
    : weathers.filter((weather) =>
        weather.name.toLowerCase().includes(search.toLowerCase())
      );

  return (
    <>
      <div className="background-home">
        <div className="shape-home"></div>
        <div className="shape-home"></div>
      </div>
      <div className="search">
        <input
          className="input-search"
          type="text"
          placeholder="Search by city"
          value={search}
          onChange={handleSearch}
        />
        <div className="results-">
          {console.log("result => ", result)}

          {!result.length > 0 && search && (
            <div>
              <h1 className="weather-not-conc">No hay coincidencias</h1>
            </div>
          )}
          {!result.length > 0 && !search && (
            <div className="adding-weather">
              <h1 className="titule-add">No weather cards</h1>
              <p className="question-add">Do you want to add a new card?</p>
              {currentUser ? (
                <Link className="btn-add" to="weather/create">
                  Create weather
                </Link>
              ) : (
                <Link className="btn-add" to="login">
                  log in to create a card
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="main-container">
        {weathers.length !== 0 ? (
          <>
            <Weathers weathers={result} />
            <Favorites />
          </>
        ) : (
          <>
            <Weathers weathers={result} />
          </>
        )}
      </div>
    </>
  );
};

export default Home;
