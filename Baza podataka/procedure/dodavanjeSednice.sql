Delimiter $$

create procedure dodajNovuSednicu (in NazivSedniceParametar varchar(256), in DatumSedniceParametar date, in BrojPrisutnihParametar int, in StatusSedniceParametar int, in ZapisnikSedniceParametar text )

izadji:

begin 
	
	declare sednicaPostoji int;
	declare ograniciStatus int;
	declare danasnjiDatum date;
	declare ZapisnikFinalno text;
	
	start transaction;
	
	set danasnjiDatum = curdate();
	
	select IDSednice into sednicaPostoji from evidencijasednica.sednica
	where sednica.NazivSednice = NazivSedniceParametar
	limit 1;
	
	select IDStatusaSednice into ograniciStatus from evidencijasednica.status_sednice
	where status_sednice.IDStatusaSednice = StatusSedniceParametar
	limit 1;
	
	set ZapisnikFinalno = ZapisnikSedniceParametar;
	
	
if sednicaPostoji is not null
	then
	rollback;
	select concat ('Sednica pod nazivom"', NazivSedniceParametar, '" vec postoji. Transakcija nije uspesna.') as greska;
	leave izadji;

end if;

if ograniciStatus > 4
	then
	rollback;
	select concat ('Status ne moze biti veci od 4') as greska;
	leave izadji;

end if;

	if ograniciStatus = 1 
	then
	if DatumSedniceParametar < danasnjiDatum 
		then 
		rollback;
		select concat ('Sednica ne moze biti zakazana za datum koji je vec prosao.') as greska;
		leave izadji;
	end if;
end if;

	if ograniciStatus = 1 or ograniciStatus = 4
	then
	set ZapisnikFinalno = "";
	end if;

	insert into evidencijasednica.sednica (NazivSednice, DatumSednice, BrojPrisutnih, StatusSedniceID, ZapisnikSednice)
	values (NazivSedniceParametar, DatumSedniceParametar, BrojPrisutnihParametar, StatusSedniceParametar, ZapisnikFinalno);
	commit;
	
	select concat ('Uspesno dodata sednica! Transakcija uspesna.') as uspesno;
end;
$$
Delimiter ;
