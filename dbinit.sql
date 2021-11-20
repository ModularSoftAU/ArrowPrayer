DROP DATABASE IF EXISTS arrowprayer;
CREATE DATABASE IF NOT EXISTS arrowprayer;
USE arrowprayer;

CREATE TABLE config (
  id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
  guildID VARCHAR(18) NOT NULL,
  prayerRequestChannel VARCHAR(18) DEFAULT NULL,
  prayerRequestLogChannel VARCHAR(18) DEFAULT NULL
);
