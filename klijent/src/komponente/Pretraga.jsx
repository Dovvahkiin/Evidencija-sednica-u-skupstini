import React, { useState } from "react";

function Pretraga({ elementPretrage }) {
  const [pretraga, koristiPretragu] = useState(null);
  const pretragaKucanje = (e) => {
    koristiPretragu(e.target.value);
  };

  const PretragaKlik = (e) => {
    e.preventDefault();
    elementPretrage(pretraga);
  };

  return (
    <div className="pretragaKontejner">
      <form>
        <span>Pretraga po ID-u: </span>
        <input
          type="number"
          name="pretraga"
          value={pretraga}
          onChange={pretragaKucanje}
        />
        <button onClick={PretragaKlik}>Pretraži</button>
      </form>
    </div>
  );
}

export default Pretraga;
