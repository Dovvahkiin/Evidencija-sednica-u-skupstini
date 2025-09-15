create view evidencijasednica.pregledSvihSednica as
select
sed.NazivSednice as NazivSednice,
sed.DatumSednice as Datum,
statsed.NazivStatusaSednice as StatusSednice
from
	sednica sed
join
evidencijasednica.status_sednice statsed on statsed.IDStatusaSednice = sed.StatusSedniceID;