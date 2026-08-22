delimiter $$

create procedure obrisiDnevniRed (in IDSedniceParametar int)
izadji:

begin
	declare dnevniRedProvera int;

start transaction;

	select IDDnevniRed into dnevniRedProvera
	from evidencijasednica.dnevni_red dred
	where dred.SednicaID = IDSedniceParametar
	limit 1;
	
	if dnevniRedProvera is null or dnevniRedProvera = 0
	then
	rollback;
	select 0 as obrisano,'Dnevni red ne postoji. Transakcija nije uspela.' as greska;
	leave izadji;
	end if;
	
	delete from evidencijasednica.dnevni_red dred where dred.SednicaID = IDSedniceParametar;
	commit;
	select 1 as obrisano,'Uspesno obrisan dnevni red. Transakcija uspesna.' as uspesno;
	
end $$
delimiter ;
