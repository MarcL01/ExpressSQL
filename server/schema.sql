-- Creates a database with the name 'simple'
CREATE DATABASE simple;

-- Uses the database with the name 'simple'
USE simple;

-- Creates the table inside of the 'simple' database
-- with the name 'data'
CREATE TABLE data (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  text TEXT NOT NULL
);


/*  Execute this file from the command line by typing:
 *    mysql -u root -p < server/schema.sql
 *  to create the database and the tables.*/