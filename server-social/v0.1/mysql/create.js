
use httt;
CREATE TABLE historymomo(
    id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    phone  VARCHAR(13) NOT NULL,
    name VARCHAR(70) NOT NULL,
    amount INT(11) NOT NULL,
    comment VARCHAR(100),
    io BOOLEAN NOT NULL,
    lastupdate DATETIME NOT NULL,
    ownername VARCHAR(70) NOT NULL,
    ownerphone  VARCHAR(13) NOT NULL,
    ownercomment VARCHAR(100),
    upbalance BOOLEAN DEFAULT 0
  )ENGINE=INNODB;
 ALTER TABLE `httt`.`historymomo` ADD UNIQUE `uq_tran`(`phone`, `lastupdate`);
