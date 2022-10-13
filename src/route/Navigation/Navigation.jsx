import { useContext, useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import "./Navigation.css";
import logo from "../../assets/logo.png";
const Navigation = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const csst = document.querySelector("#styles");
  const item = document.querySelectorAll(".nav-link");
  function Indicator(e) {
    csst.style.left = e.offsetLeft + "px";
    csst.style.width = e.offsetWidth + "px";
  }
  item.forEach((link) => {
    link.addEventListener("mousemove", (e) => {
      Indicator(e.target);
    });
  });

  useEffect(() => {
    const data = localStorage.getItem("data");
    console.log(data);
    if (data) {
      const dataStored = JSON.parse(data);
      setCurrentUser(dataStored);
    }
  }, []);

  console.log("current", currentUser);
  const handleSignOut = () => {
    setCurrentUser(null);
  };

  return (
    <>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <img src={logo} alt="Logo" className="logo" />
        </Link>
        <div className="nav-links-container">
          <div className="nav-links-st">
            <Link className="nav-link" to="/">
              Home
            </Link>
            {currentUser ? (
              <Link className="nav-link" to="/weather/create">
                New Weather
              </Link>
            ) : (
              <Link className="nav-link">New weather</Link>
            )}
            {currentUser ? (
              <Link className="nav-link" onClick={handleSignOut}>
                Log out
              </Link>
            ) : (
              <Link className="nav-link" to="/login">
                Log In
              </Link>
            )}
            <div id="styles"></div>
            <span className="nav-link"> Welcome</span>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Navigation;
