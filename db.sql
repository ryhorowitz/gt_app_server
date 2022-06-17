CREATE DATABASE gtlaw;

CREATE TABLE casefiles(
  id SERIAL PRIMARY KEY,
  case_number VARCHAR(8),
  first_name VARCHAR(30),
  last_name VARCHAR(40),
  -- status enumerated (active, closed, non-active)
)