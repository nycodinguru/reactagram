DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY UNIQUE,
  username VARCHAR(255),
  fname VARCHAR(255),
  lname VARCHAR(255),
  email VARCHAR NOT NULL UNIQUE,
  profile_picture VARCHAR(255)
);

DROP TABLE IF EXISTS posts CASCADE;

CREATE TABLE posts (
  id BIGSERIAL PRIMARY KEY NOT NULL,
  total_likes INTEGER,
  image_link VARCHAR(255),
  caption VARCHAR(255),
  user_id INTEGER REFERENCES users(id)
);

DROP TABLE IF EXISTS user_likes CASCADE;

CREATE TABLE user_likes (
  id BIGSERIAL PRIMARY KEY,
  userid INTEGER,
  postid INTEGER,
  is_liked BOOLEAN
);

DROP TABLE IF EXISTS comments CASCADE;

CREATE TABLE comments (
  id BIGSERIAL PRIMARY KEY,
  comment_text VARCHAR(1280),
  u_id INTEGER,
  p_id INTEGER,
  time_stamp VARCHAR(255)
);

INSERT INTO users (username, fname, lname, email, profile_picture) VALUES 
('linda21488', 'Linda', 'Hu', 'linda@example.com', 'https://i.imgur.com/grTnv8v.png'),
('rashad89', 'Rashad', 'Rose', 'rashad@example.com', 'https://i.imgur.com/czMpc7Z.png')
;

INSERT INTO posts (total_likes, image_link, caption, user_id) VALUES

(2, 'https://i.imgur.com/dF6lcTo.jpg', 'Jammin out... 🎸', 1),
(23, 'https://i.imgur.com/XGbO6rN.jpg', 'Gotta have my brew ☕️', 2),
(9, 'https://i.imgur.com/FqfDsBE.jpg', 'Love this piece!', 2),
(18, 'https://i.imgur.com/90zL5A7.jpg', 'I need more of this in my life 😅', 1),
(4, 'https://i.imgur.com/XhLd2De.jpg', 'look at my hat! 🔥🔥🔥', 1),
(83, 'https://i.imgur.com/daWnmVo.jpg', 'Gotta stay CONNTECTED!', 2),
(99, 'https://i.imgur.com/zJs4om1.jpg', 'These $400 Kombucha enimas have changed my life', 1),
(153, 'https://i.imgur.com/r3tJ1jK.jpg', 'Such a good game tonight 🏀', 2);


INSERT INTO user_likes (userid, postid, is_liked) VALUES 
(2, 1, true),
(2, 1, false),
(1, 2, true),
(2, 2, true);

INSERT INTO comments (comment_text, u_id, p_id) 
VALUES 
('I am a comment', 1, 1),
('I am a 2nd comment', 1, 2),
('I am a 3rd comment', 2, 3),
('I am a 4th comment', 2, 4);
