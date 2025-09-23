import React from "react";
import { Link } from "react-router-dom";

const NavigacijaPrijavljenAdmin = () => {
  return (
    <nav className="navigacijaKontejner">
      <ul>
        <div className="opcijeNavigacije">
          <li>
            <Link to="/">POČETNA</Link>
          </li>
          <li>
            <Link to="/">ADMIN OPCIJE</Link>
          </li>
          <li>
            <Link to="/profil">PROFIL</Link>
          </li>
        </div>
        <div className="opcijeNavigacije">
          <li>
            <Link to="/">ODJAVA</Link>
          </li>
        </div>
      </ul>
    </nav>
  );
};
const NavigacijaPrijavljenKorisnik = () => {
  return (
    <nav className="navigacijaKontejner">
      <ul>
        <div className="opcijeNavigacije">
          <li>
            <Link to="/">POČETNA</Link>
          </li>
          <li>
            <Link to="/profil">PROFIL</Link>
          </li>
        </div>
        <div className="opcijeNavigacije">
          <li>
            <Link to="/">ODJAVA</Link>
          </li>
        </div>
      </ul>
    </nav>
  );
};

const NavigacijaNijePrijavljen = () => {
  return (
    <nav className="navigacijaKontejner">
      <ul>
        <li>
          <div className="navigacijaKontejner prijavaBar">
            <Link to="/prijava">PRIJAVA</Link>
          </div>
        </li>
      </ul>
    </nav>
  );
};

function NavigacioniBar() {
  return NavigacijaPrijavljenKorisnik();
}

export default NavigacioniBar;
