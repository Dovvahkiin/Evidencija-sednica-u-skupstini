import React from "react";
import Header from "../komponente/Header/Header";

function Sednica() {
  return (
    <main>
      <Header />
      <section className="okvirSajta sednica">
        <h1>Naslov sednice: Test</h1>
        <div className="tackeDnevnogRedaSednica">
          <p>
            Tacke dnevnog reda: <br />
            <br />
            Tacka 1. Test
          </p>
        </div>
        <div className="zapisnikSednica">
          <p>
            Zapisnik: Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Ipsam ad temporibus velit, ex atque illo repellat quo. Iure, nisi
            reiciendis autem assumenda commodi blanditiis aliquid cumque quaerat
            praesentium iste sequi.
          </p>
        </div>
      </section>
    </main>
  );
}

export default Sednica;
