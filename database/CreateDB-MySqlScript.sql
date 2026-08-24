-- Database creation script


-- Database and tables creation

create database if not exists meetingRecords;

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
--
-- Adding default roles, statuses and users (in the future users will have hashed passwords)

insert into meetingRecords.userRoles (UserRoleName)
select 'admin'
where not exists (
	select 1 from meetingRecords.userRoles
	where UserRoleName = 'admin'
);

insert into meetingRecords.userRoles (UserRoleName)
select 'user'
where not exists (
	select 1 from meetingRecords.userRoles
	where UserRoleName = 'user'
);

insert into meetingRecords.meetingStatusID (MeetingStatusName)
select 'scheduled'
where not exists (
	select 1 from meetingRecords.meetingStatusID
	where MeetingStatusName = 'scheduled'
);

insert into meetingRecords.meetingStatusID (MeetingStatusName)
select 'finished'
where not exists (
	select 1 from meetingRecords.meetingStatusID
	where MeetingStatusName = 'finished'
);

insert into meetingRecords.meetingStatusID (MeetingStatusName)
select 'delayed'
where not exists (
	select 1 from meetingRecords.meetingStatusID
	where MeetingStatusName = 'delayed'
);

insert into meetingRecords.meetingStatusID (MeetingStatusName)
select 'canceled'
where not exists (
	select 1 from meetingRecords.meetingStatusID
	where MeetingStatusName = 'canceled'
);

insert into meetingRecords.users (firstName,lastName,userEmail,userPassword,userRoleID)
select "admin","admin","admin@admin.com","admin123",1
where not exists (
	select 1 from meetingRecords.users
	where userEmail = 'admin@admin.com'
);

insert into meetingRecords.users (firstName,lastName,userEmail,userPassword,userRoleID)
select "John","doe","john123@gmail.com","johndoe1",2
where not exists (
	select 1 from meetingRecords.users
	where userEmail = 'john123@gmail.com'
);

-- creating views

create or replace view meetingRecords.allMeetings as
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
--

create or replace view meetingRecords.userProfile as
    select
    user.ID as ID,
    user.firstName as FirstName,
    user.lastName as LastName,
    user.userEmail as Email,
    user.userPassword as UserPassword,
    roles.UserRoleName as UserRole
    from meetingRecords.users user
    join meetingRecords.userRoles roles on roles.id = user.userRoleID;
--

create or replace view meetingRecords.meetingDetails as
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

drop procedure if exists meetingRecords.updateAgenda $$

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
--

delimiter $$

drop procedure if exists meetingRecords.updateMeeting $$

create procedure meetingRecords.updateMeeting (in p_id int, in p_title varchar(256), in p_date DATE, in p_attendees int, in p_status int, in p_content text)

exit_proc:

begin
	declare dateRestriction date;
	declare doesMeetingExist int;
	declare statusRestriction int;
	declare currentMeetingStatus int;

	declare meetingTitleFinal varchar(256);
	declare dateFinal date;
	declare attendeesFinal int;
	declare meetingStatusIDFinal int;
	declare meetingContentFinal text;

start transaction;
	
	set dateRestriction = curdate();
	
	set currentMeetingStatus = (	
	select meetingStatusID 
	from meetingRecords.meetings m 
	where m.ID = p_id);

	select ID into doesMeetingExist from meetingRecords.meetings m
	where m.ID = p_id
	limit 1;

	select ID into statusRestriction from meetingRecords.meetingStatusID ss
	where ss.ID = p_status
	limit 1;
	
	if doesMeetingExist is null
	then
	rollback;
	select concat ('Meeting does not exist. Transaction failed.') as error;
	leave exit_proc;
	end if;
	
	if statusRestriction > 4 or statusRestriction < 0 
	then
	rollback;
	select concat ('Status must be between 1 and 4. Transaction failed.') as error;
	leave exit_proc;
	end if;
	
	if statusRestriction = 1
	then
		if p_date < dateRestriction
		then
		rollback;
		select concat ('Meeting date cannot be in the past. Transaction failed.') as error;
		leave exit_proc;
		end if;
	end if;
	
	set meetingTitleFinal = p_title;
	set dateFinal = p_date;
	set attendeesFinal = p_attendees;
	set meetingContentFinal = p_content;
	set meetingStatusIDFinal = p_status;
	
	if currentMeetingStatus = 2 or currentMeetingStatus = 3  and meetingStatusIDFinal = 1 or meetingStatusIDFinal = 4
	then set meetingContentFinal = "";
	end if;
	
	update meetingRecords.meetings
	set
		MeetingTitle = coalesce(meetingTitleFinal, MeetingTitle),
		MeetingDate = coalesce(dateFinal, MeetingDate),
		Attendees = coalesce(attendeesFinal, Attendees),
		Content = meetingContentFinal,
		meetingStatusID = coalesce(meetingStatusIDFinal, meetingStatusID )
	where ID = p_id;
	commit;
	select concat ('Successfully updated meeting. Transaction successful.') as success;
end;
delimiter ;

--

delimiter $$

drop procedure if exists meetingRecords.updateContent $$

create procedure meetingRecords.updateContent (in p_id int, in p_content text)
 
exit_proc:

begin
	declare meetingCheck int;
	declare statusCheck int;
	declare contentFinal text;

start transaction;

	set meetingCheck = (
	select ID from meetingRecords.meetings m
	where m.ID = p_id
	);
	
	set statusCheck = (
	select meetingStatusID from meetingRecords.meetings m
	where m.ID = p_id
	);
	
	if meetingCheck is null
	then
	rollback;
	select concat ('Meeting does not exist. Transaction failed.') as error;
	leave exit_proc;
	end if;
	
	if statusCheck = 1 or statusCheck = 4
	then
	rollback;
	select concat ('Meeting is scheduled, canceled or does not exist. Transaction failed. ') as error;
	leave exit_proc;
	end if;
	
	set contentFinal = p_content;
	
	update meetingRecords.meetings m
	set
		Content = coalesce(contentFinal, Content)
	where m.ID = p_id;
	commit;
	select concat ('Successfully updated content. Transaction successful.') as success;
	
end;
delimiter ;
--


delimiter $$

drop procedure if exists meetingRecords.addAgenda $$

create procedure meetingRecords.addAgenda (in p_agenda text, in p_meetingID int)

exit_proc:

begin
	declare doesAgendaExist int default 0;	
	declare meetingCheck int;
	
start transaction;

	select COUNT(*) into doesAgendaExist from meetingRecords.agenda
	where MeetingID = p_meetingID;
	
	select ID into meetingCheck from meetingRecords.meetings
	where ID = p_meetingID limit 1;
	
	if meetingCheck is null
	then
	rollback;
	select concat ('Meeting does not exist. Transaction failed.') as error;
	leave exit_proc;
	end if;
	
	if doesAgendaExist > 0
	then
	rollback;
	select concat ('Agenda already exists for that meeting. You can update it or delete it. Transaction failed.') as error;
	leave exit_proc;
	end if;
	
	insert into meetingRecords.agenda (agendaContent, MeetingID)
	values (p_agenda, p_meetingID);
	commit;
	select concat ('Agenda successfully added. Transaction successful.') as success;
end;
delimiter ;
--

delimiter $$

drop procedure if exists meetingRecords.createMeeting $$

create procedure meetingRecords.createMeeting (in p_title varchar(256), in p_date date, in p_attendees int, in p_status int, in p_content text )

exit_proc:

begin 
	
	declare doesMeetingExist int;
	declare statusRestriction int;
	declare todayDate date;
	declare contentFinal text;
	
	start transaction;
	
	set todayDate = curdate();
	
	select ID into doesMeetingExist from meetingRecords.meetings
	where meetings.MeetingTitle = p_title
	limit 1;
	
	select ID into statusRestriction from meetingRecords.meetingStatusID
	where meetingStatusID.ID = p_status
	limit 1;
	
	set contentFinal = p_content;
	
	
if doesMeetingExist is not null
	then
	rollback;
	select concat ('Meeting with title:"', p_title, '" already exist. Transaction failed.') as error;
	leave exit_proc;

end if;

if statusRestriction > 4
	then
	rollback;
	select concat ('Status cannot be higher than 4. Transaction failed.') as error;
	leave exit_proc;

end if;

	if statusRestriction = 1 
	then
	if p_date < todayDate 
		then 
		rollback;
		select concat ('Meeting cannot be in the past. Transaction failed.') as error;
		leave exit_proc;
	end if;
end if;

	if statusRestriction = 1 or statusRestriction = 3 or statusRestriction = 4
	then
	set contentFinal = "";
	end if;

	insert into meetingRecords.meetings (MeetingTitle, MeetingDate, Attendees, MeetingStatusID, Content)
	values (p_title, p_date, p_attendees, p_status, contentFinal);
	commit;
	
	select concat ('Meeting is successfully added! Transaction successful.') as success;
end;
delimiter ;
--


delimiter $$

drop procedure if exists meetingRecords.deleteAgenda $$

create procedure meetingRecords.deleteAgenda (in p_meetingID int)

exit_proc:

begin
	declare agendaCheck int;

start transaction;

	select ID into agendaCheck
	from meetingRecords.agenda ag
	where ag.meetingID = p_meetingID
	limit 1;
	
	if agendaCheck is null or agendaCheck = 0
	then
	rollback;
	select 0 as deleted,'Agenda does not exist. Transaction failed.' as error;
	leave exit_proc;
	end if;
	
	delete from meetingRecords.agenda ag where ag.meetingID = p_meetingID;
	commit;
	select 1 as deleted,'Agenda successfully deleted. Transaction successful.' as success;
	
end $$
delimiter ;
--

delimiter $$

drop procedure if exists meetingRecords.deleteMeeting $$

CREATE PROCEDURE meetingRecords.deleteMeeting(IN p_meetingID INT)
exit_proc:
BEGIN
    DECLARE meetingCheck INT DEFAULT NULL;

    START TRANSACTION;

    SELECT ID
    INTO meetingCheck
    FROM meetingRecords.meetings
    WHERE ID = p_meetingID
    LIMIT 1;

    IF meetingCheck IS NULL THEN
        ROLLBACK;

        SELECT
            0 AS deleted,
            'Meeting does not exist. Transaction failed.' AS message;

        LEAVE exit_proc;
    END IF;

    DELETE FROM meetingRecords.meetings
    WHERE ID = p_meetingID;

    COMMIT;

    SELECT
        1 AS deleted,
        'Meeting successfully deleted. Transaction successful.' AS message;

END $$
delimiter ;