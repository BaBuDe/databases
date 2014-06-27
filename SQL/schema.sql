CREATE DATABASE chat;

USE chat;



-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'Messages'
--
-- ---

DROP TABLE IF EXISTS `Messages`;

CREATE TABLE `Messages` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `Content` VARCHAR(140) NOT NULL,
  `id_Users` INTEGER NOT NULL,
  `id_Rooms` INTEGER NOT NULL,
  `Timestamp` TIMESTAMP NOT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Rooms'
--
-- ---

DROP TABLE IF EXISTS `Rooms`;

CREATE TABLE `Rooms` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `Roomname` VARCHAR(30) NOT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Users'
--
-- ---

DROP TABLE IF EXISTS `Users`;

CREATE TABLE `Users` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `Username` VARCHAR(30) NOT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Relationships'
--
-- ---

DROP TABLE IF EXISTS `Relationships`;

CREATE TABLE `Relationships` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `id_Friender` INTEGER NOT NULL,
  `id_Friendee` INTEGER NOT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Foreign Keys
-- ---

ALTER TABLE `Messages` ADD FOREIGN KEY (id_Users) REFERENCES `Users` (`id`);
ALTER TABLE `Messages` ADD FOREIGN KEY (id_Rooms) REFERENCES `Rooms` (`id`);
ALTER TABLE `Relationships` ADD FOREIGN KEY (id_Friender) REFERENCES `Users` (`id`);
ALTER TABLE `Relationships` ADD FOREIGN KEY (id_Friendee) REFERENCES `Users` (`id`);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `Messages` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Rooms` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Users` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Relationships` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `Messages` (`id`,`Content`,`id_Users`,`id_Rooms`,`Timestamp`) VALUES
-- ('','','','','');
-- INSERT INTO `Rooms` (`id`,`Roomname`) VALUES
-- ('','');
-- INSERT INTO `Users` (`id`,`Username`) VALUES
-- ('','');
-- INSERT INTO `Relationships` (`id`,`id_Friender`,`id_Friendee`) VALUES
-- ('','','');



/* Create other tables and define schemas for them here! */




/*  Execute this file from the command line by typing:
 *    mysql < schema.sql
 *  to create the database and the tables.*/




