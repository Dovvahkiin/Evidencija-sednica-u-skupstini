delimiter $$

create procedure dodajDnevniRed (in DnevniRedParametar text, in SednicaIDParametar int)

izadji:

begin
	declare dnevniRedPostoji int default 0;	
	declare proveraSednice int;
	
start transaction;

	select COUNT(*) into dnevniRedPostoji from evidencijasednica.dnevni_red
	where sednicaID = SednicaIDParametar;
	
	select IDSednice into proveraSednice from evidencijasednica.sednica
	where IDSednice = SednicaIDParametar limit 1;
	
	if proveraSednice is null
	then
	rollback;
	select concat ('Sednica ne postoji. Transakcija nije uspela.') as greska;
	leave izadji;
	end if;
	
	if dnevniRedPostoji > 0
	then
	rollback;
	select concat ('Dnevni red za ovu sednicu vec postoji. Mozete ga azurirati ili obrisati. Transakcija nije uspela.') as greska;
	leave izadji;
	end if;
	
	insert into evidencijasednica.dnevni_red (TekstTacke, SednicaID)
	values (DnevniRedParametar, SednicaIDParametar);
	commit;
	select concat ('Dnevni red je dodat. Transakcija uspesna') as uspesno;
end;
$$
Delimiter ;
