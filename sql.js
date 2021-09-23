CREATE DATABASE `httt` CHARACTER SET utf8 COLLATE utf8_general_ci;

CREATE TABLE users(
    id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    username varchar(70) NOT NULL UNIQUE ,
    password varchar(70) NOT NULL,
    salt varchar(11) UNIQUE,
    email varchar(50) NOT NULL UNIQUE,
    phone  varchar(11) UNIQUE,
    name varchar(99) NOT NULL,
    register TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
    expired DATETIME,
    role  varchar(1) NOT NULL DEFAULT 0,
    balance INT(11) NOT NULL DEFAULT 0,
    cash INT(11) NOT NULL DEFAULT 0,
    gender INT(1) NOT NULL
  )ENGINE=INNODB;

 CREATE TABLE transactions(
   id_tra INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
   date_tra DATETIME,
   text VARCHAR(99),
   connecter_id INT(11) NOT NULL,
   target_id  INT(11) NOT NULL,
   coin  INT(11) NOT NULL,

   INDEX `idx_transaction_source` (`connecter_id` ASC),
   CONSTRAINT `fk_transaction_source`
    FOREIGN KEY (`connecter_id`)
    REFERENCES users (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,

    INDEX `idx_transaction_target` (`target_id` ASC),
    CONSTRAINT `fk_transaction_target`
     FOREIGN KEY (`target_id`)
     REFERENCES users (`id`)
     ON DELETE NO ACTION
     ON UPDATE NO ACTION

 )ENGINE=INNODB;

 CREATE TABLE friends(
   id_fr INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
   connecter_id INT(11) NOT NULL,
   target_id INT(11) NOT NULL,
   date_fr DATETIME,

   INDEX `idx_friend_source` (`connecter_id` ASC),
   CONSTRAINT `fk_friend_source`
    FOREIGN KEY (`connecter_id`)
    REFERENCES users (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,

    INDEX `idx_friend_target` (`target_id` ASC),
    CONSTRAINT `fk_friend_target`
     FOREIGN KEY (`target_id`)
     REFERENCES users (`id`)
     ON DELETE NO ACTION
     ON UPDATE NO ACTION
 )ENGINE=INNODB;

ALTER TABLE `httt`.`friends` ADD UNIQUE `uq_friend`(`connecter_id`, `target_id`);


 CREATE TABLE messages(
   id_me INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
   connecter_id INT(11) NOT NULL,
   target_id INT(11) NOT NULL,
   text_me VARCHAR(99) NOT NULL,
   date_me DATETIME,

   INDEX `idx_umessage_source` (`connecter_id` ASC),
   CONSTRAINT `fk_umessage_source`
    FOREIGN KEY (`connecter_id`)
    REFERENCES users (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,

    INDEX `idx_umessage_target` (`target_id` ASC),
    CONSTRAINT `fk_umessage_target`
     FOREIGN KEY (`target_id`)
     REFERENCES users (`id`)
     ON DELETE NO ACTION
     ON UPDATE NO ACTION
 )ENGINE=INNODB;


 CREATE TABLE status(
   id_st INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
   connecter_id INT(11) NOT NULL,
   content VARCHAR(99) NOT NULL,
   date_st DATETIME,
   benefit INT(11),

   INDEX `idx_upost_user` (`connecter_id` ASC),
   CONSTRAINT `fk_upost_user`
    FOREIGN KEY (`connecter_id`)
    REFERENCES users (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION

 )ENGINE=INNODB;

 CREATE TABLE tasks(
   id_ta INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
   id_st INT(11) NOT NULL,
   connecter_id INT(11) NOT NULL,
   target_id INT(11) NOT NULL,
   date_start DATETIME NOT NULL,
   date_end DATETIME,
   status_ta BOOLEAN NOT NULL,

   INDEX `idx_task_source` (`connecter_id` ASC),
   CONSTRAINT `fk_task_source`
    FOREIGN KEY (`connecter_id`)
    REFERENCES users (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,

    INDEX `idx_task_target` (`target_id` ASC),
    CONSTRAINT `fk_task_target`
     FOREIGN KEY (`target_id`)
     REFERENCES users (`id`)
     ON DELETE NO ACTION
     ON UPDATE NO ACTION,

     INDEX `idx_task_status` (`id_st` ASC),
     CONSTRAINT `fk_task_status`
      FOREIGN KEY (`id_st`)
      REFERENCES status (`id_st`)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION

 )ENGINE=INNODB;





//update balance
UPDATE users SET balance=balance +5 WHERE id=1;

UPDATE users SET balance=balance -5 WHERE id=4;

CREATE DATABASE `web_chat` CHARACTER SET utf8 COLLATE utf8_general_ci;
use web_chat;
CREATE TABLE messages(
    id INT(11)  PRIMARY KEY NOT NULL AUTO_INCREMENT,
    message varchar(70)  );

INSERT INTO `users` ( `username`, `password`, `salt`, `email`, `phone`, `name`)
VALUES ( 'ty', '123456', 'secret', 'tuhoangty@gmail.com', '0704902083', 'Phạm Minh Tỷ');
