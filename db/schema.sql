drop table if exists parties;
drop table if exists candidates;
drop table if exists voters;
drop table if exists votes;

CREATE TABLE votes (
  id INTEGER PRIMARY KEY,
  voter_id INTEGER UNSIGNED not null,
  candidate_id INTEGER UNSIGNED not null, 
  create_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT uc_voter UNIQUE (voter_id),
  CONSTRAINT fk_voter FOREIGN KEY (voter_id) REFERENCES voters(id) ON DELETE CASCADE,
  CONSTRAINT fk_candidate FOREIGN KEY (candidate_id) REFERENCES candidates(id) ON DELETE CASCADE
);

CREATE table voters (
  id integer primary key, 
  first_name VARCHAR(30) not null,
  last_name VARCHAR(30) not null,
  email VARCHAR(50) not null,
  created_at datetime default current_timestamp
);

CREATE TABLE parties (
  id INTEGER PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  description TEXT
);

CREATE TABLE candidates (
  id INTEGER PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  industry_connected BOOLEAN NOT NULL,
  party_id integer unsigned, 
  constraint fk_party foreign key (party_id) references parties(id) on delete set null
);