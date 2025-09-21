create view evidencijasednica.pregledSvihSednica as
select
	sed.IDSednice as ID,
	sed.NazivSednice as NazivSednice,
	DATE_FORMAT(sed.DatumSednice, '%d.%m.%Y') as Datum,
	sed.BrojPrisutnih as BrojPrisutnih,
	sed.ZapisnikSednice as Zapisnik,
	statsed.NazivStatusaSednice as StatusSednice
from
	sednica sed
join
evidencijasednica.status_sednice statsed on	sed.StatusSedniceID = statsed.IDStatusaSednice ;