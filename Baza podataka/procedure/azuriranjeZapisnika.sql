delimiter $$

create procedure azurirajZapisnik (in IDSedniceParametar int, in ZapisnikParametar text)
 
izadji:

begin
	declare proveraSednice int;

-- promenljive za unos

	declare ZapisnikFinalno text;

start transaction;

	set proveraSednice = (
	select ZapisnikSednice from evidencijasednica.sednica s
	where s.IDSednice = IDSedniceParametar
	);
	
	if proveraSednice is null
	then
	rollback;
	select concat ('Sednica ne postoji. Transakcija nije uspesna') as greska;
	leave izadji;
	end if;
	
	set ZapisnikFinalno = ZapisnikParametar;
	
	update evidencijasednica.sednica s
	set
		ZapisnikSednice = coalesce(ZapisnikFinalno, ZapisnikSednice)
	where s.IDSednice = IDSedniceParametar;
	commit;
	select concat ('Uspesno azuriranje zapisnika. Transakcija uspesna.') as uspesno;
	
end;$$
Delimiter ;
