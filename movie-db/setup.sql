DROP TABLE IF EXISTS TITLE;
CREATE TABLE TITLE
(
    TITLE_ID VARCHAR(50),
    ORDERING INT,
    TITLE TEXT,
    REGION TEXT,
    LANGUAGE TEXT,
    TYPES TEXT,
    ATTRIBUTES TEXT,
    IS_ORIGINAL_TITLE BOOLEAN
);
COPY TITLE FROM '/docker-entrypoint-initdb.d/title.akas.fixed.tsv' DELIMITER E'\t';


DROP TABLE IF EXISTS TITLE_BASICS;
CREATE TABLE TITLE_BASICS
(
    TITLE_ID VARCHAR(50),
    TITLE_TYPE TEXT,
    PRIMARY_TITLE TEXT,
    ORIGINAL_TITLE TEXT,
    IS_ADULT BOOLEAN,
    START_YEAR INT,
    END_YEAR INT,
    RUNTIME_MINUTES INT,
    GENRE TEXT
);
COPY TITLE_BASICS FROM '/docker-entrypoint-initdb.d/title.basics.fixed.tsv' DELIMITER E'\t';


DROP TABLE IF EXISTS CREW;
CREATE TABLE CREW
(
    TITLE_ID VARCHAR(50),
    DIRECTORS TEXT,
    WRITERS TEXT
);
COPY CREW FROM '/docker-entrypoint-initdb.d/title.crew.fixed.tsv' DELIMITER E'\t';


DROP TABLE IF EXISTS EPISODES;
CREATE TABLE EPISODES
(
    TITLE_ID VARCHAR(50),
    PARENT_ID VARCHAR(50),
    SEASON_NUMBER INT,
    EPISODE_NUMBER INT
);
COPY EPISODES FROM '/docker-entrypoint-initdb.d/title.episode.fixed.tsv' DELIMITER E'\t';


DROP TABLE IF EXISTS PRINCIPALS;
CREATE TABLE PRINCIPALS
(
    TITLE_ID VARCHAR(50),
    ORDERING INT,
    PERSON_ID TEXT,
    CATEGORY TEXT,
    JOB TEXT,
    CHARACTERS TEXT
);
COPY PRINCIPALS FROM '/docker-entrypoint-initdb.d/title.principals.fixed.tsv' DELIMITER E'\t';


DROP TABLE IF EXISTS RATINGS;
CREATE TABLE RATINGS
(
    TITLE_ID VARCHAR(50),
    AVERAGE_RATING FLOAT,
    NUM_VOTES FLOAT
);
COPY RATINGS FROM '/docker-entrypoint-initdb.d/title.ratings.fixed.tsv' DELIMITER E'\t';


DROP TABLE IF EXISTS NAME_BASICS;
CREATE TABLE NAME_BASICS
(
    NAME_ID VARCHAR(50),
    PRIMARY_NAME TEXT,
    BIRTH_YEAR INT,
    DEATH_YEAR INT,
    PRIMARY_PROFESSION TEXT,
    KNOWN_FOR_TITLES TEXT
);
COPY NAME_BASICS FROM '/docker-entrypoint-initdb.d/name.basics.fixed.tsv' DELIMITER E'\t';