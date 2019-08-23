CREATE TABLE IF NOT EXISTS qn_bucket
(
  id int PRIMARY KEY AUTO_INCREMENT,
  bucket varchar(255)
);

CREATE TABLE IF NOT EXISTS qn_zone
(
  id int PRIMARY KEY AUTO_INCREMENT,
  label varchar(30),
  value varchar(20)
);

INSERT INTO qn_zone (label, value) VALUES ('华东', 'z0');
INSERT INTO qn_zone (label, value) VALUES ('华北', 'z1');
INSERT INTO qn_zone (label, value) VALUES ('华南', 'z2');
INSERT INTO qn_zone (label, value) VALUES ('北美', 'na0');
INSERT INTO qn_zone (label, value) VALUES ('东南亚', 'as0');

SELECT * FROM qn_zone;