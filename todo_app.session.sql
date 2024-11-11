-- CREATE TABLE tasks(
--     task_id SERIAL PRIMARY KEY ,
--     description VARCHAR(30) NOT NULL ,
--     date DATE
-- );

SELECT * FROM tasks;

-- INSERT INTO tasks (description, date) VALUES ('Task 1', '2022-01-01');
INSERT INTO tasks (id, description, date, done)
VALUES (
    id:integer,
    'description:text',
    'date:timestamp without time zone',
    done:boolean
  );