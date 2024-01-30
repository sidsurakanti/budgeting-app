-- creating tables
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY, -- auto-incrementing id
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL
)

 CREATE TABLE IF NOT EXISTS cashflows (
    id SERIAL PRIMARY KEY, 
    savings NUMERIC,
    income NUMERIC,
    user_id INTEGER REFERENCES users
)

CREATE TABLE IF NOT EXISTS transactions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    amount NUMERIC NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    user_id INTEGER REFERENCES users
)


-- insert placeholder data
INSERT INTO users 
(email, password, name)
VALUES ('johndoe@gmail.com', 'abc123', 'John Doe');

INSERT INTO cashflows
(savings, income, user_id)
VALUES (90000, 9000, 1);

-- get user by email
SELECT * FROM users
WHERE email='johndoe@gmail.com'

-- get john's cashflow
SELECT * FROM cashflows
WHERE user_id=1;

