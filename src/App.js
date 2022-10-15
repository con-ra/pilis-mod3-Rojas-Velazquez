import './App.css';
import { Routes, Route } from 'react-router-dom';
//import Weathers from "./component/Weather/Weathers";
import WeatherCreation from './route/Weather/WeatherCreation';
import Navigation from './route/Navigation/Navigation';
import Home from './route/Home/Home';
import Login from './route/Login/Login';
import WeatherDisplay from './route/Weather/WeatherDisplay';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="weather/create" element={<WeatherCreation />} />
          <Route path="weather/:id" element={<WeatherDisplay />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
