USE meal_plan;

CREATE TABLE users (
  id int NOT NULL AUTO_INCREMENT,
  email varchar(255) NOT NULL,
  password varchar(255) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY email (email)
);

CREATE TABLE breakfast (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(255) NOT NULL,
  img varchar(255) NOT NULL,
  ingredients TEXT NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE lunch (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(255) NOT NULL,
  img varchar(255) NOT NULL,
  ingredients TEXT NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE dinner (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(255) NOT NULL,
  img varchar(255) NOT NULL,
  ingredients TEXT NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE snack (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(255) NOT NULL,
  img varchar(255) NOT NULL,
  ingredients TEXT NOT NULL,
  PRIMARY KEY (id)
);