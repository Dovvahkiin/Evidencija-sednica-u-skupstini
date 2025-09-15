delimiter $$

create procedure obrisiDnevniRed (in IDDnevnogRedaParametar int)
izadji:

begin
	declare dnevniRedProvera int;

start transaction;

	select IDDnevniRed into dnevniRedProvera
	from evidencijasednica.dnevni_red dred
	where dred.IDDnevniRed = IDDnevnogRedaParametar
	limit 1;
	
	if dnevniRedProvera is null or dnevniRedProvera = 0
	then
	rollback;
	select concat ('Dnevni red ne postoji. Transakcija nije uspela.') as greska;
	leave izadji;
	end if;
	
	delete from evidencijasednica.dnevni_red dred where dred.IDDnevniRed = IDDnevnogRedaParametar;
	commit;
	select concat('Uspesno obrisan dnevni red. Transakcija uspesna.') as uspesno;
	
end $$
delimiter ;
