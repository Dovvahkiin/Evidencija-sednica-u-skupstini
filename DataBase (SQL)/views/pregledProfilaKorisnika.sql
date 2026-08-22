create view pregledProfilaKorisnika as
select 
	   korisnik.IDKorisnika as ID,
	   korisnik.ImeKorisnika as ImeKorisnika,
	   korisnik.PrezimeKorisnika as PrezimeKorisnika,
	   korisnik.EmailKorisnika as EmailKorisnika,
	   korisnik.LozinkaKorisnika as LozinkaKorisnika,
	   status.NazivStatusa as StatusKorisnika
from evidencijasednica.korisnici korisnik
join evidencijasednica.status_korisnika status on status.IDStatusaKorisnika = korisnik.IDStatusa