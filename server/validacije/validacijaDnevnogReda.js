class ValidacijaDnevnogReda {
  async ValidirajDnevniRed(unos) {
    let greska = [];

    if (!unos || unos.trim() === "") {
      greska.push("Tekst tacke ne moze biti prazan.\n");
    }
    return greska;
  }
}
class PoziviValidacija extends ValidacijaDnevnogReda {
  async ValidacijaPodataka(podaci) {
    const greska = await this.ValidirajDnevniRed(podaci);
    if (greska.length > 0) {
      console.log("\n\nGreska pri validaciji:\n\n" + greska);
      return { validacija: false, greska };
    }
    return { validacija: true };
  }
}

module.exports = { PoziviValidacija };
