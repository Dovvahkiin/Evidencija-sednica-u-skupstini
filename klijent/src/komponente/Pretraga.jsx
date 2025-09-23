import React, { useState } from "react";

function Pretraga() {
  const [pretrazi, koristiPretrazi] = useState("");

  const pretragaKucanje = (e) => {
    koristiPretrazi(e.target.value);
  };

  return (
    <div className="pretragaKontejner">
      <span>Pretraga po ID-u: </span>
      <input type="text" value={pretrazi} onChange={pretragaKucanje} />
      <button>Pretraži</button>
    </div>
  );
}

export default Pretraga;
