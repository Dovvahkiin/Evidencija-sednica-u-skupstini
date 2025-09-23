import React, { useState } from "react";

function Pretraga({ elementPretrage }) {
  const [pretraga, koristiPretragu] = useState("");
  const pretragaKucanje = (e) => {
    koristiPretragu(e.target.value);
  };

  const PretragaKlik = (e) => {
    e.preventDefault();
    elementPretrage(pretraga);
  };

  return (
    <div className="pretragaKontejner">
      <form onSubmit={PretragaKlik}>
        <span>Pretraga po ID-u: </span>
        <input
          type="text"
          name="pretraga"
          value={pretraga}
          onChange={pretragaKucanje}
        />
        <button>Pretraži</button>
      </form>
    </div>
  );
}

export default Pretraga;
