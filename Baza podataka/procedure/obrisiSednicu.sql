delimiter $$

create procedure obrisiSednicu (in IDSedniceParametar int)
izadji:

begin
	declare sednicaProvera int;

start transaction;

	select IDSednice into sednicaProvera
	from evidencijasednica.sednica s
	where s.IDSednice = IDSedniceParametar
	limit 1;
	
	if sednicaProvera is null
	then
	rollback;
	select concat ('Sednica ne postoji. Transakcija nije uspela.') as greska;
	leave izadji;
	end if;
	
	delete from evidencijasednica.sednica s where s.IDSednice = IDSedniceParametar;
	select row_count() as obrisanRed;
	commit;
	select concat('Uspesno obrisana sednica. Transakcija uspesna.') as uspesno;
	
end $$
delimiter ;
