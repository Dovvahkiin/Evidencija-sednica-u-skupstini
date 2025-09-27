import React from "react";
import { Link } from "react-router-dom";
import { PrijavaOdjavaHookvoi } from "../../../hookovi/AutentikacioniHook";

const NavigacijaPrijavljenAdmin = ({ odjava }) => {
  return (
    <nav className="navigacijaKontejner">
      <ul>
        <div className="opcijeNavigacije">
          <li>
            <Link to="/" reloadDocument>
              POČETNA
            </Link>
          </li>
          <li>
            <Link to="/kreirajsednicu">DODAJ SEDNICU</Link>
          </li>
          <li>
            <Link to="/profil">PROFIL</Link>
          </li>
        </div>
        <div className="opcijeNavigacije">
          <li>
            <Link to="/" onClick={odjava}>
              ODJAVA
            </Link>
          </li>
        </div>
      </ul>
    </nav>
  );
};
const NavigacijaPrijavljenKorisnik = ({ odjava }) => {
  return (
    <nav className="navigacijaKontejner">
      <ul>
        <div className="opcijeNavigacije">
          <li>
            <Link to="/" reloadDocument>
              POČETNA
            </Link>
          </li>
          <li>
            <Link to="/profil">PROFIL</Link>
          </li>
        </div>
        <div className="opcijeNavigacije">
          <li>
            <Link to="/" onClick={odjava}>
              ODJAVA
            </Link>
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
  const { OdjavaKorisnika } = PrijavaOdjavaHookvoi();
  const OdjaviSe = async () => {
    await OdjavaKorisnika();
  };
  return <NavigacijaPrijavljenAdmin odjava={OdjaviSe} />;
}

export default NavigacioniBar;
