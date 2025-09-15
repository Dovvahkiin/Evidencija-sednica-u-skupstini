delimiter $$

create procedure azurirajSednicu (in IDSedniceParametar int, in NazivSedniceParametar varchar(256), in DatumSedniceParametar DATE, in BrojPrisutnihParametar int, in StatusSedniceIDParametar int, in ZapisnikSedniceParametar text)

izadji:

begin
	declare ogranicenjeDatuma date;
	declare sednicaPostoji int;
	declare ogranicenjeStatusa int;
	declare trenutniStatusSednice int;

-- promenljive za unos
	declare NazivSedniceFinalno varchar(256);
	declare DatumSedniceFinalno date;
	declare BrojPrisutnihFinalno int;
	declare StatusSedniceIDFinalno int;
	declare ZapisnikSedniceFinalno text;

start transaction;
	
	set ogranicenjeDatuma = curdate();
	
	set trenutniStatusSednice = (	
	select StatusSedniceID 
	from evidencijasednica.sednica s 
	where s.IDSednice = IDSedniceParametar);
	
	select IDSednice into sednicaPostoji from evidencijasednica.sednica s
	where s.IDSednice = IDSedniceParametar
	limit 1;

	select IDStatusaSednice into ogranicenjeStatusa from evidencijasednica.status_sednice ss
	where ss.IDStatusaSednice = StatusSedniceIDParametar
	limit 1;
	
	if sednicaPostoji is null
	then
	rollback;
	select concat ('Sednica ne postoji. Transakcija nije uspesna.') as greska;
	leave izadji;
	end if;
	
	if ogranicenjeStatusa > 2 or ogranicenjeStatusa < 0 
	then
	rollback;
	select concat ('Status ne moze biti veci od 2 ili manji od 0. Transakcije nije uspesna.') as greska;
	leave izadji;
	end if;
	
	if ogranicenjeStatusa = 1
	then
		if DatumSedniceParametar < ogranicenjeDatuma
		then
		rollback;
		select concat ('Sednica ne moze biti zakazana za datum koji je vec prosao. Transakcija nije uspesna.') as greska;
		leave izadji;
		end if;
	end if;
	
	set NazivSedniceFinalno = NazivSedniceParametar;
	set DatumSedniceFinalno = DatumSedniceParametar;
	set BrojPrisutnihFinalno = BrojPrisutnihParametar;
	set ZapisnikSedniceFinalno = ZapisnikSedniceParametar;
	set StatusSedniceIDFinalno = StatusSedniceIDParametar;
	
	if trenutniStatusSednice = 2 and StatusSedniceIDFinalno = 1
	then set ZapisnikSedniceFinalno = null;
	end if;
	
	update evidencijasednica.sednica
	set
		NazivSednice = coalesce(NazivSedniceFinalno, NazivSednice),
		DatumSednice = coalesce(DatumSedniceFinalno, DatumSednice),
		BrojPrisutnih = coalesce(BrojPrisutnihFinalno, BrojPrisutnih),
		ZapisnikSednice = ZapisnikSedniceFinalno,
		StatusSedniceID = coalesce(StatusSedniceIDFinalno, StatusSedniceID )
	where IDSednice = IDSedniceParametar;
	commit;
	select concat ('Azuriranje sednice je uspesno. Transakcija uspesna.') as uspesno;
end;
delimiter ;

