delimiter $$

create procedure azurirajDnevniRed (in IDSedniceParametar int, in TekstTackeParametar text)

izadji:

begin
	declare proveraSednice int;
	declare proveraDnevnogReda int;

-- promenljive za unos
	declare TekstTackeFinalno text;

start transaction;

	set proveraSednice = (
	select SednicaID from evidencijasednica.dnevni_red dr 
	where dr.SednicaID = IDSedniceParametar
	);

	set proveraDnevnogReda = (
	select IDDnevniRed from evidencijasednica.dnevni_red dr
	where dr.SednicaID = IDSedniceParametar
	);
	
	if proveraDnevnogReda is null
	then
	rollback;
	select concat ('Dnevni red ne postoji. Transakcija nije uspela.') as greska;
	leave izadji;
	end if;

	if proveraSednice is null
	then
	rollback;
	select concat ('Sednica ne postoji ili nema tacaka. Transakcija nije uspela.') as greska;
	leave izadji;
	end if;
	
	set TekstTackeFinalno = TekstTackeParametar;
	
	update evidencijasednica.dnevni_red
	set
		TekstTacke = coalesce (TekstTackeFinalno, TekstTacke)
	where SednicaID = IDSedniceParametar;
	commit;
	
	select concat ('Uspesno azuriranje dnevnog reda. Transakcija uspesna.') as uspesno;

end;
delimiter ;