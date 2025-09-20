create view evidencijasednica.pregledSvihSednica as
select
	sed.IDSednice as ID,
	sed.NazivSednice as NazivSednice,
	DATE_FORMAT(sed.DatumSednice, '%d.%m.%Y') as Datum,
	statsed.NazivStatusaSednice as StatusSednice
from
	sednica sed
join
evidencijasednica.status_sednice statsed on
	statsed.IDStatusaSednice = sed.StatusSedniceID;