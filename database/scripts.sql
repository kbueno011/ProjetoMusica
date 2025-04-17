create database db_controle_musicas_ba;


#ativa o database a ser utilizado
use db_controle_musicas_ba;

#Cria a tabela de musica
create table tbl_musica (
  id	 			int not null auto_increment primary key,
  nome	 			varchar (100) 		 not null,
  link	 			varchar (200) 		 not null,
  duracao 			time 				 not null,
  data_lancamento	date				 not null,
  foto_capa 		varchar(200) ,
  letra 			text
);

create table tbl_genero (
  id	 			int not null auto_increment primary key,
  nome	 			varchar (100) 		 not null
);

create table tbl_usuario (
  id	 			int not null auto_increment primary key,
  nome	 			varchar (100) 		 not null,
  email	 			varchar (200) 		 not null,
  senha	 			varchar (200) 		 not null,
  foto_perfil  		varchar(300) 
	
);

create table tbl_artista (
  id	 			int not null auto_increment primary key,
  nome             	varchar (100)	 not null,
  nome_artistico    varchar (100)	 not null,
  biografia 		text 	 		 not null,
  nacionalidade     varchar (100)	 not null,
  foto_perfil  		varchar(300) 
	
);


show tables;

desc tbl_musica,
desc tbl_genero
select * from tbl_genero

SELECT * FROM tbl_musica WHERE id = 2;
SELECT * FROM tbl_genero WHERE id = 1;

