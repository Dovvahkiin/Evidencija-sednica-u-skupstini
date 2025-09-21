create view detaljanPregledSednice as
select
	sednica.IDSednice as ID,
	sednica.NazivSednice as Naziv,
	DATE_FORMAT(sednica.DatumSednice, '%d.%m.%Y') as Datum,
	sednica.BrojPrisutnih as BrojPrisutnih,
	sednica.ZapisnikSednice as Zapisnik,
	status.NazivStatusaSednice as StatusSednice,
	tacka.TekstTacke as DnevniRed
from evidencijasednica.sednica sednica
left join evidencijasednica.status_sednice status on status.IDStatusaSednice = sednica.StatusSedniceID
left join evidencijasednica.dnevni_red tacka on tacka.SednicaID = sednica.IDSednice;