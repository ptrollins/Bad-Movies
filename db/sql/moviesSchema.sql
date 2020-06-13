-- SET UP SCHEMA HERE
CREATE DATABASE IF NOT EXISTS badmovies;

USE badmovies;

CREATE TABLE IF NOT EXISTS favorites (
  favorite_id int NOT NULL AUTO_INCREMENT,
  id int UNIQUE,
  title varchar(255),
  popularity float(5,5),
  poster_path varchar(255),
  overview text,
  release_date varchar(255),
  PRIMARY KEY (favorite_id)
);