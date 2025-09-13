function Footer() {

   function podesiDatum()
   {
     const datumNovi = new Date();
     const trenutnaGodina = datumNovi.getFullYear();
     return trenutnaGodina;
   }

  return (
    <p>Sajt kreirao Božidar Tovarnicki | Dovvahkiin &copy; {podesiDatum()}</p>
  )
}

export default Footer