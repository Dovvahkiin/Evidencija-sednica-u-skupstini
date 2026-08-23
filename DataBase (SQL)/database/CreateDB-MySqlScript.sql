

-- Database creation with tables and default entities

create database if not exists meetingRecords;

DROP TABLE IF EXISTS meetingRecords.agenda;
DROP TABLE IF EXISTS meetingRecords.meetings;
DROP TABLE IF EXISTS meetingRecords.meetingStatusID;
DROP TABLE IF EXISTS meetingRecords.users;
DROP TABLE IF EXISTS meetingRecords.userRoles;

create table if not exists meetingRecords.meetingStatusID(
ID int auto_increment primary key,
MeetingStatusName varchar(50) not null
);

create table if not exists meetingRecords.meetings (
ID int auto_increment primary key,
MeetingTitle varchar(256) not null,
MeetingDate DATE not null,
Attendees int not null,
Content text null,
MeetingStatusID int not null,
foreign key (MeetingStatusID) references meetingRecords.meetingStatusID(ID) 
);

create table if not exists meetingRecords.agenda(
ID int auto_increment primary key,
agendaContent text not null,
meetingID int not null,
foreign key (meetingID) references meetingRecords.meetings(ID) on delete cascade
);

create table if not exists meetingRecords.userRoles(
ID int auto_increment primary key,
UserRoleName varchar(20) not null
);

create table if not exists meetingRecords.users(
ID int auto_increment primary key,
firstName varchar(50) not null,
lastName varchar(50) not null,
userEmail varchar(150) not null,
userPassword varchar(30) not null,
userRoleID int not null,
foreign key (userRoleID) references meetingRecords.userRoles (ID)
);

insert into meetingRecords.userRoles (UserRoleName) values ('admin'),('user');
insert into meetingRecords.meetingStatusID (MeetingStatusName) values ('scheduled'),('finished'), ('delayed'),('canceled');

insert into meetingRecords.users (firstName,lastName,userEmail, userPassword, userRoleID)
values ("admin","adminovic","admin@admin.com","admin123", 1), ("Pera","Peric","pera@gmail.com","pera123","2");

-- creating views

create view meetingRecords.allMeetings as
select 
    meet.ID as ID,
    meet.MeetingTitle as Title,
	DATE_FORMAT(meet.MeetingDate, '%d.%m.%Y') as MeetingDate,
    meet.Attendees as Attendees,
    meet.Content as Content,
    meetStat.MeetingStatusName as MeetingStatus
    from 
    meetingRecords.meetings meet
    join
    meetingRecords.meetingStatusID meetStat on meet.MeetingStatusID = meetStat.ID
    order by ID asc;

create view meetingRecords.userProfile as
    select
    user.ID as ID,
    user.firstName as FirstName,
    user.lastName as LastName,
    user.userEmail as Email,
    user.userPassword as UserPassword,
    roles.UserRoleName as UserRole
    from meetingRecords.users user
    join meetingRecords.userRoles roles on roles.id = user.userRoleID;

create view meetingRecords.meetingDetails as
    select
    meet.ID as ID,
    meet.MeetingTitle as Title,
	DATE_FORMAT(meet.MeetingDate, '%d.%m.%Y') as MeetingDate,
    meet.Attendees as Attendees,
    meet.Content as Content,
    meetStat.MeetingStatusName as MeetingStatus,
    a.agendaContent as Agenda
    from meetingRecords.meetings meet
    left join meetingRecords.meetingStatusID meetStat on meet.MeetingStatusID = meetStat.ID
    left join meetingRecords.agenda a on a.meetingID = meet.ID;

-- creating procedures

delimiter $$

create procedure meetingRecords.updateAgenda (in p_id int, in p_content text)

exit_proc:

begin
	declare meetingCheck int;
	declare agendaCheck int;
	declare contentFinal text;

start transaction;

	set meetingCheck = (
	select meetingID from meetingRecords.agenda a 
	where a.ID = p_id
	);

	set agendaCheck = (
	select ID from meetingRecords.agenda a
	where a.ID = p_id
	);
	
	if agendaCheck is null
	then
	rollback;
	select concat ('Agenda does not exist. Transaction failed.') as error;
	leave exit_proc;
	end if;

	if meetingCheck is null
	then
	rollback;
	select concat ('Meeting record does not exist. Transaction failed.') as error;
	leave exit_proc;
	end if;
	
	set contentFinal = p_content;
	
	update meetingRecords.agenda
	set
		agendaContent = coalesce (contentFinal, agendaContent)
	where ID = p_id;
	commit;
	
	select concat ('Successfully updated agenda. Transaction successful.') as success;

end;
delimiter ;