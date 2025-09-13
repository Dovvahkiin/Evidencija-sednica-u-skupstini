import React from 'react'
import TabelaPregled from '../komponente/tabele/TabelaPregled'
import Header from '../komponente/Header/Header'
import Footer from '../komponente/Footer'

function Pocetna() {
  return (
    <main>
        <Header />
        <section className="okvirSajta">
            <TabelaPregled />
            <Footer />
        </section>        
    </main>
  )
}

export default Pocetna