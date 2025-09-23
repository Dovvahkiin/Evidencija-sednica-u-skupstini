import React from "react";
import { Link } from "react-router-dom";

function NavigacioniBar() {
  return (
    <nav className="navigacijaKontejner">
      <ul>
        <div className="opcijeNavigacije">
          <li>
            <Link to="/">POČETNA</Link>
          </li>
          <li>
            <Link to="/">ADMIN</Link>
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
      {/* <ul>
        <li>
          <div className="navigacijaKontejner prijavaBar">
            <Link to="/prijava">PRIJAVA</Link>
          </div>
        </li>
      </ul> */}
    </nav>
  );
}

export default NavigacioniBar;
