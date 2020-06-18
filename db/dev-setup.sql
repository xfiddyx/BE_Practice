DROP DATABASE IF EXISTS companies_data;
CREATE DATABASE companies_data;

\c companies_data;

CREATE TABLE companies
(
 company_id SERIAL PRIMARY KEY,
 established INT NOT NULL,
 owner_id INT REFERENCES owners(owner_id) NOT NULL,
 name VARCHAR (50),
 bs VARCHAR (250),
 head_office VARCHAR(250)
)

CREATE TABLE owners
(
 owner_id SERIAL PRIMARY KEY,
 forename VARCHAR(50),
 surname VARCHAR(50),
 age INT NOT NULL,
 residence VARCHAR (250)
)

CREATE TABLE products
(
 product_id SERIAL PRIMARY KEY,
 product VARCHAR (50),
 cost_of_product INT NOT NULL,
 company_id INT REFERENCES companies(company_id)
)