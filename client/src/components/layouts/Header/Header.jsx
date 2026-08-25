import "@/styles/header/header.css";
import NavBar from "./NavBar";
import { useState } from "react";
const Header = () => {
  const [menu, setMenu] = useState(false);

  const clickHandler = () => {
    setMenu((prev) => !prev); //check state and onclick change it to opposite
  };
  return (
    <header>
      <div className="headingLayout">
        <div className="topHeading">
          <h1 className="mainHeading">
            <a href="">MEETING RECORDS APP</a>
          </h1>
          <button
            className={`hamburger ${menu ? "open" : ""} `}
            onClick={clickHandler}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
        <NavBar isOpen={menu} />
      </div>
    </header>
  );
};

export default Header;
