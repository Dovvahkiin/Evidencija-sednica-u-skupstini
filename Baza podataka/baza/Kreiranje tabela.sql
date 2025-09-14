DROP TABLE IF EXISTS evidencijasednica.dnevni_red;
DROP TABLE IF EXISTS evidencijasednica.sednica;
DROP TABLE IF EXISTS evidencijasednica.status_sednice;

create table if not exists evidencijasednica.status_sednice(
IDStatusaSednice int auto_increment primary key,
NazivStatusaSednice varchar(50) not null
);

create table if not exists evidencijasednica.sednica (
IDSednice int auto_increment primary key,
NazivSednice varchar(256) not null,
DatumSednice DATE not null,
BrojPrisutnih int not null,
ZapisnikSednice text null,
StatusSedniceID int not null,
foreign key (StatusSedniceID) references evidencijasednica.status_sednice(IDStatusaSednice) 
);

create table if not exists evidencijasednica.dnevni_red(
IDDnevniRed int auto_increment primary key,
RedniBrojTacke int not null,
TekstTacke text not null,
SednicaID int not null,
foreign key (sednicaID) references evidencijasednica.sednica(IDSednice) on delete cascade
);
