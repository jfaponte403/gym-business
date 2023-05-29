drop database gym_business;
create database gym_business;
use gym_business;

CREATE TABLE user_type(
    user_type INT NOT NULL,
    user_des VARCHAR(20) NOT NULL,
    PRIMARY KEY (user_type, user_des)
);
insert into user_type (user_type, user_des) values 
(1, 'admin'),
(2, 'member'),
(3, 'coach');

CREATE TABLE users(
    code VARCHAR(5) NOT NULL,
    name VARCHAR(255) NOT NULL,
    user_type INT NOT NULL,
    PRIMARY KEY (code),
    FOREIGN KEY (user_type) REFERENCES user_type(user_type)
);
insert into users (code, name, user_type) values 
('ADM01', 'admin', 1),
('ADM02', 'Juan Perez', 1),
('COA01', 'coach', 3),
('COA02', 'Mauricio Hernandez', 3),
('MEM01', 'member', 2),
('MEM02', 'Harold Garcia', 2),
('MEM03', 'Leo Messi', 2);

CREATE TABLE logins(
    code VARCHAR(5) NOT NULL,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL,
    PRIMARY KEY (code),
    FOREIGN KEY (code) REFERENCES users(code)
);
INSERT logins (code, username, password) 
values
	('ADM01', 'admin', '1234'),
	('ADM02', 'Juan_Pe', '1234'),
	('COA01', 'coach', '1234'),
	('COA02', 'Mauricio_He', '1234'),
	('MEM01', 'member', '1234'),
	('MEM02', 'Harold_Ga', '1234'),
	('MEM03', 'Leo_Me', '1234');

CREATE TABLE training_plan(
    code VARCHAR(5) NOT NULL,
    description VARCHAR(255) NOT NULL,
    PRIMARY KEY (code)
);
INSERT INTO training_plan (code, description)
VALUES
    ('TP001', 'Beginner training plan'),
    ('TP002', 'Intermediate training plan'),
    ('TP003', 'Advanced training plan'),
    ('TP004', 'Weight loss training plan'),
    ('TP005', 'Muscle gain training plan');
    
CREATE TABLE plans(
    code VARCHAR(5) NOT NULL,
    plan_name VARCHAR(50) NOT NULL,
    plan_description VARCHAR(255) NOT NULL,
    plan_price INT NOT NULL,
    PRIMARY KEY (code)
);
INSERT INTO plans (code, plan_name, plan_description, plan_price)
VALUES
    ('PLN01', 'Economic Plan', 'Basic gym membership plan', 50),
    ('PLN02', 'Premium Plan', 'Premium gym membership plan', 100),
    ('PLN03', 'VIP Plan', 'VIP gym membership plan with extra benefits', 150);

CREATE TABLE members(
    code VARCHAR(5) NOT NULL,
    age INT NOT NULL,
    cellphone VARCHAR(10) NOT NULL,
    start_date DATE NOT NULL,
    training_plan VARCHAR(10) NOT NULL,
    code_plan varchar (5) not null,
    starting_height INT NOT NULL,
    starting_weight INT NOT NULL,
    PRIMARY KEY (code),
    FOREIGN KEY (code) REFERENCES users(code),
    FOREIGN KEY (code_plan) REFERENCES plans(code),
    FOREIGN KEY (training_plan) REFERENCES training_plan(code)
);
INSERT INTO members (code, age, cellphone, start_date, training_plan, code_plan, starting_height, starting_weight)
VALUES
    ('MEM01', 25, '5551234', '2022-02-02', 'TP001', 'PLN01', '175', '75'),
    ('MEM02', 30, '5555678', '2022-12-01', 'TP002', 'PLN02', '180', '80'),
    ('MEM03', 21, '5555679', '2023-01-01', 'TP003', 'PLN03', '170', '65');

create table progress(
	progress_code varchar(5) NOT NULL,
	code_member VARCHAR(5) NOT NULL,
    current_height INT NOT NULL,
    current_weight INT NOT NULL,
    current_data date NOT NULL,
    primary key(progress_code),
    foreign key (code_member) references members(code)
);
-- DROP TRIGGER IF EXISTS insert_progress_date;
DELIMITER //

CREATE TRIGGER insert_progress_date
BEFORE INSERT ON progress
FOR EACH ROW
BEGIN
  SET NEW.current_data = NOW();
END //

DELIMITER ;

INSERT INTO progress (progress_code, code_member, current_height, current_weight)
VALUES
    ('PR001', 'MEM01', 175, 80),
    ('PR002', 'MEM02', 180, 78),
    ('PR003', 'MEM03', 170, 75);

CREATE TABLE payment_history(
    code VARCHAR(10) NOT NULL,
    payment_date DATE NOT NULL,
    next_payment DATE NOT NULL,
    code_member VARCHAR(5) NOT NULL,
    PRIMARY KEY (code),
    FOREIGN KEY (code_member) REFERENCES members(code)
);

DELIMITER //
CREATE TRIGGER set_next_payment_date
BEFORE INSERT ON payment_history
FOR EACH ROW
BEGIN
    SET NEW.next_payment = DATE_ADD(NEW.payment_date, INTERVAL 1 MONTH);
END //
DELIMITER;

insert into payment_history(code, payment_date, code_member)
values
	('PAY01', '2023-01-01', 'MEM01'),
	('PAY02', '2023-01-01', 'MEM02'),
	('PAY03', '2023-02-01', 'MEM01'),
	('PAY04', '2023-02-01', 'MEM02');


create table machines(
	code varchar(5) not null,
    name varchar(50) not null,
    primary key (code)
);
INSERT INTO machines (code, name)
VALUES
('MA001', 'Treadmill'),
('MA002', 'Elliptical machine'),
('MA003', 'Stationary bike'),
('MA004', 'Rowing machine'),
('MA005', 'Weight lifting machine');

create table using_machine(
	code varchar(5) not null,
    member_code varchar(5) not null,
    machine_code varchar(5) not null,
    data_using datetime not null,
    foreign key (member_code) references members(code),
    foreign key (machine_code) references machines(code),
    primary key (code)
);

DELIMITER //
CREATE TRIGGER insert_using_machine_trigger
BEFORE INSERT ON using_machine
FOR EACH ROW
BEGIN
    SET NEW.data_using = NOW();
END //
DELIMITER ;

insert into using_machine (code, member_code, machine_code)
values
	('UMC01', 'MEM01','MA001'),
	('UMC02', 'MEM02','MA002'),
	('UMC03', 'MEM01','MA003'),
	('UMC04', 'MEM02','MA001');

create table routines(
	code varchar(5) not null,
    description varchar(255) not null,
    primary key(code)
);
INSERT INTO routines (code, description) VALUES
('RTN01', 'Cardio Workout'),
('RTN02', 'Strength Training'),
('RTN03', 'Yoga Routine'),
('RTN04', 'HIIT Circuit'),
('RTN05', 'Pilates Routine'),
('RTN06', 'Full Body Workout'),
('RTN07', 'Upper Body Workout'),
('RTN08', 'Lower Body Workout'),
('RTN09', 'Core Workout'),
('RTN10', 'Stretching Routine');

create table entry_log_member(
	code varchar(5) not null,
    member_code varchar(5) not null,
    routine_code varchar(5) not null,
    entry_date datetime not null,
    primary key (code),
    foreign key (member_code) references members(code),
    foreign key (routine_code) references routines(code)
);
DELIMITER //
CREATE TRIGGER insert_entry_log_member
BEFORE INSERT ON entry_log_member
FOR EACH ROW
BEGIN
    SET NEW.entry_date = NOW();
END //
DELIMITER ;
INSERT INTO entry_log_member (code, member_code, routine_code) VALUES
('ELM01', 'MEM01', 'RTN01'),
('ELM02', 'MEM02', 'RTN02'),
('ELM03', 'MEM03', 'RTN03'),
('ELM04', 'MEM01', 'RTN04'),
('ELM05', 'MEM02', 'RTN05'),
('ELM06', 'MEM03', 'RTN06'),
('ELM07', 'MEM01', 'RTN07'),
('ELM08', 'MEM02', 'RTN08'),
('ELM09', 'MEM03', 'RTN09'),
('ELM10', 'MEM01', 'RTN10');


create table entry_log_coach(
	code varchar(5) not null,
    coach_code varchar(5) not null,
    routine_code varchar(5) not null,
    entry_date datetime not null,
    primary key (code),
    foreign key (coach_code) references users(code)
);
DELIMITER //
CREATE TRIGGER insert_entry_log_coach
BEFORE INSERT ON entry_log_coach
FOR EACH ROW
BEGIN
    SET NEW.entry_date = NOW();
END //
DELIMITER ;
INSERT INTO entry_log_coach (code, coach_code, routine_code) VALUES
('ELC01', 'COA01', 'RTN01'),
('ELC02', 'COA02', 'RTN02'),
('ELC03', 'COA01', 'RTN03'),
('ELC04', 'COA02', 'RTN04'),
('ELC05', 'COA01', 'RTN05'),
('ELC06', 'COA02', 'RTN06'),
('ELC07', 'COA01', 'RTN07'),
('ELC08', 'COA02', 'RTN08'),
('ELC09', 'COA01', 'RTN09'),
('ELC10', 'COA02', 'RTN10');

-- fecha y rutina de x usuario.
select entry_log_member.entry_date as data, routines.description as routine, users.name as name
from entry_log_member, routines, members, users
where entry_log_member.member_code = members.code AND
	entry_log_member.routine_code = routines.code AND
    members.code = users.code AND
	members.code = 'MEM01';
DELIMITER //

CREATE PROCEDURE GetUserEntryLogs(IN userId VARCHAR(5))
BEGIN
    SELECT entry_log_member.entry_date AS data, routines.description AS routine, users.name AS name
    FROM entry_log_member
    JOIN routines ON entry_log_member.routine_code = routines.code
    JOIN members ON entry_log_member.member_code = members.code
    JOIN users ON members.code = users.code
    WHERE members.code = userId;
END //

DELIMITER ;
CALL GetUserEntryLogs('MEM01');


-- Maquinas mas usadas del gym
SELECT machines.name AS Maquina, (
    SELECT COUNT(*)
    FROM using_machine
    WHERE using_machine.machine_code = machines.code
) AS uses
FROM machines;

-- Ver que personas estan haciendo X rutina
select users.name as name, routines.description as routine, entry_log_member.entry_date as date
from users, routines, members, entry_log_member
where 
	users.code = members.code AND
	routines.code = entry_log_member.routine_code AND
    entry_log_member.member_code = members.code AND
    members.code = 'MEM01';
DELIMITER //
CREATE PROCEDURE GetUserRoutineEntries(IN user_code VARCHAR(10))
BEGIN
    SELECT users.name AS name, routines.description AS routine, entry_log_member.entry_date AS date
    FROM users, routines, members, entry_log_member
    WHERE users.code = members.code
        AND routines.code = entry_log_member.routine_code
        AND entry_log_member.member_code = members.code
        AND members.code = user_code;
END //
DELIMITER ;
CALL GetUserRoutineEntries('MEM02');

-- ver porque entrenador tuvo asesoria un usuario

CREATE VIEW view_members AS
SELECT code, name
FROM users
WHERE user_type = 2;

CREATE VIEW view_coaches AS
SELECT code, name
FROM users
WHERE user_type = 3;

select view_members.name as member, view_coaches.name as coach, routines.description, case when entry_log_member.routine_code = entry_log_coach.routine_code then true else false end as advisory
from view_members, view_coaches , routines, entry_log_member, entry_log_coach
where
	view_members.code = entry_log_member.member_code AND 
	view_coaches.code = entry_log_coach.coach_code AND
    entry_log_member.routine_code = routines.code AND
    entry_log_coach.routine_code = routines.code;

-- get personal data by code
select 
	users.name as name, plans.plan_name as plan, members.start_date as start_date, logins.username, training_plan.description as training_plan
from
	users, plans, members, logins, training_plan
where
	users.code = members.code AND
    logins.code = users.code AND
    plans.code = members.code_plan AND 
    training_plan.code = members.training_plan AND
    members.code = 'MEM01';

DELIMITER //
CREATE PROCEDURE GetMemberInformation(IN memberCode VARCHAR(5))
BEGIN
    SELECT 
        users.name AS name, plans.plan_name AS plan, members.start_date AS start_date, logins.username, training_plan.description AS training_plan
    FROM
        users, plans, members, logins, training_plan
    WHERE
        users.code = members.code
        AND logins.code = users.code
        AND plans.code = members.code_plan
        AND training_plan.code = members.training_plan
        AND members.code = memberCode;
END //
DELIMITER ;

CALL GetMemberInformation('MEM01');

-- Progress
select
	users.name as name, members.starting_weight as starting_weight, members.starting_height as starting_height, progress.current_weight as current_weight, progress.current_height as current_height, progress.current_data as measurement_date
from
	users, members, progress
where 	
    users.code = members.code
    AND progress.code_member = members.code
    AND members.code = 'MEM01';
    
DELIMITER //
CREATE PROCEDURE GetMemberProgress(IN memberCode VARCHAR(5))
BEGIN
    SELECT
        users.name AS name, members.starting_weight AS starting_weight, members.starting_height AS starting_height,
        progress.current_weight AS current_weight, progress.current_height AS current_height, progress.current_data  AS measurement_date
    FROM
        users, members, progress
    WHERE
        users.code = members.code
        AND progress.code_member = members.code
        AND members.code = memberCode;
END //
DELIMITER ;

CALL GetMemberProgress('MEM02');


-- users with active members     
SELECT
    users.name AS name,
    payment_history.payment_date AS payment_date,
    payment_history.next_payment AS next_payment,
    CASE
        WHEN CURDATE() BETWEEN payment_history.payment_date AND payment_history.next_payment THEN 'Activa'
        ELSE 'Inactiva'
    END AS membership_status
FROM
    users, members, payment_history
WHERE
    users.code = members.code
    AND payment_history.code_member = members.code;


-- get code_user, password, type_user
select 
	users.code, user_type.user_type
from 
	users, logins, user_type
where 
	logins.password = '1234'
    AND logins.username = 'member'
    AND logins.code = users.code
    AND users.user_type = user_type.user_type;
    
DROP PROCEDURE IF EXISTS GetUserByLogin;
    
    
DELIMITER //
CREATE PROCEDURE GetUserByLogin(IN p_username VARCHAR(255), IN p_password VARCHAR(255))
BEGIN
    SELECT users.code, user_type.user_type
    FROM users, logins, user_type
    WHERE logins.username = p_username
    AND logins.password = p_password
    AND logins.code = users.code
    AND users.user_type = user_type.user_type;
END //
DELIMITER ;

CALL GetUserByLogin('member', '1234');

