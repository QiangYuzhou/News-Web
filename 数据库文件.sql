create table 即时(
	title text,
	href varchar(100),
	date varchar(20),
	content longtext
);

create table 大陆(
	title text,
	href varchar(100),
	date varchar(20),
	content longtext
);

create table 国际(
	title text,
	href varchar(100),
	date varchar(20),
	content longtext
);

create table 台湾(
	title text,
	href varchar(100),
	date varchar(20),
	content longtext
);
create table 社会(
	title text,
	href varchar(100),
	date varchar(20),
	content longtext
);

create table 军事(
	title text,
	href varchar(100),
	date varchar(20),
	content longtext
);

create table 港澳(
	title text,
	href varchar(100),
	date varchar(20),
	content longtext
);

create table 历史(
	title text,
	href varchar(100),
	date varchar(20),
	content longtext
);
create table 财经(
	title text,
	href varchar(100),
	date varchar(20),
	content longtext
);
create table 娱乐(
	title text,
	href varchar(100),
	date varchar(20),
	content longtext
);

create table 体育(
	title text,
	href varchar(100),
	date varchar(20),
	content longtext
);

create table 时尚(
	title text,
	href varchar(100),
	date varchar(20),
	content longtext
);

create table 科技(
	title text,
	href varchar(100),
	date varchar(20),
	content longtext
);
create table 读书(
	title text,
	href varchar(100),
	date varchar(20),
	content longtext
);
create table 游戏(
	title text,
	href varchar(100),
	date varchar(20),
	content longtext
);
create table 文化(
	title text,
	href varchar(100),
	date varchar(20),
	content longtext
);

create table 公益(
	title text,
	href varchar(100),
	date varchar(20),
	content longtext
);

create table 旅游(
	title text,
	href varchar(100),
	date varchar(20),
	content longtext
);
create table 健康(
	title text,
	href varchar(100),
	date varchar(20),
	content longtext
);

create table user(
	user varchar(20),
	pwd varchar(30),
	email varchar(30),
	like1 varchar(10),
	like2 varchar(10),
	like3 varchar(10),
	like4 varchar(10),
	unique(user),
	unique(email)
);

create table pos(
	user varchar(20),
	即时 int,
	大陆 int,
	国际 int,
	台湾 int,
	社会 int,
	军事 int,
	港澳 int,
	历史 int,
	财经 int,
	娱乐 int
);



