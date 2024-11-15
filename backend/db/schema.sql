CREATE DATABASE chiroseminars;

\c chiroseminars

CREATE TABLE chiro_users (
    id SERIAL PRIMARY KEY,
    email TEXT UNIQUE,
    username TEXT UNIQUE,
    password_digest TEXT NOT NULL,
    seminar_id TEXT[],
    role TEXT,
    profile_pic_url TEXT
);

CREATE TABLE chiro_seminars (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES chiro_users(id) ON DELETE CASCADE,
    title VARCHAR(150),
    organizer TEXT,
    date TEXT,
    location TEXT,
    description TEXT,
    price TEXT,
    contact TEXT,
    username_list TEXT[],
    image_url TEXT,
    featured TEXT,
    topics TEXT[]
);
