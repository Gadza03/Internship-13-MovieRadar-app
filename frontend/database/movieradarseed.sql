INSERT INTO genres (name)
VALUES
    ('Action'),
    ('Adventure'),
    ('Comedy'),
    ('Drama'),
    ('Horror'),
    ('Sci-Fi'),
    ('Romance'),
    ('Thriller'),
    ('Fantasy'),
    ('Mystery');


INSERT INTO users (firstname, lastname, isadmin, email, password)
VALUES
    ('John', 'Doe', FALSE, 'john.doe@gmail.com', 'password123'),
    ('Jane', 'Smith', FALSE, 'jane.smith@gmail.com', 'password456');
    ('admin', 'admin', TRUE, 'admin@admin.com', 'admin123');



	INSERT INTO movies (title, description, genreId, releaseYear, averageRating, imageUrl, createdAt, updatedAt)
VALUES
    ('The Dark Knight', 'A superhero film about Batman fighting crime in Gotham City.', 1, 2008, 4.9, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Inception', 'A mind-bending thriller where a team infiltrates dreams to plant ideas.', 6, 2010, 4.8, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('The Hangover', 'A comedy about a wild bachelor party in Las Vegas and the aftermath.', 3, 2009, 4.5, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Forrest Gump', 'A drama about a simple man with extraordinary experiences in American history.', 4, 1994, 4.7, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Get Out', 'A horror-thriller about a young African American man who uncovers disturbing secrets at his girlfriends family estate.', 5, 2017, 4.6, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Star Wars: A New Hope', 'A science fiction epic about a young farm boy becoming a hero in a galaxy far, far away.', 6, 1977, 4.9, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('The Notebook', 'A romantic drama about a young couple whose love story is told over decades.', 7, 2004, 4.3, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Jurassic Park', 'An adventure film about a theme park with living dinosaurs that goes horribly wrong.', 2, 1993, 4.8, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Shutter Island', 'A psychological thriller about a U.S. Marshal investigating the disappearance of a patient from a mental institution.', 8, 2010, 4.4, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('The Lord of the Rings: The Fellowship of the Ring', 'A fantasy epic about a young hobbit on a journey to destroy a powerful ring.', 9, 2001, 4.9, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO reviews (userId, movieId, content) VALUES
(1, 1, 'Amazing movie, loved every scene!'),
(1, 3, 'The story was decent, but the pacing was off.'),
(1, 5, 'Great visuals, but lacking depth.'),
(2, 2, 'An underrated masterpiece!'),
(2, 4, 'Not my cup of tea, but well directed.'),
(2, 6, 'Could have been better with a stronger ending.');

INSERT INTO ratings (userId, movieId, ratingValue) VALUES
(1, 1, 5),
(1, 3, 3),
(1, 5, 4),
(2, 2, 5),
(2, 4, 2),
(2, 6, 3),
(1, 7, 4),
(2, 8, 1),
(1, 9, 5),
(2, 10, 3);

INSERT INTO comments (reviewId, creatorId, content, createdAt) VALUES
(1, 2, 'Totally agree, one of the best movies ever!', CURRENT_TIMESTAMP),
(2, 2, 'I felt the same about the pacing issues.', CURRENT_TIMESTAMP),
(3, 2, 'The visuals were stunning indeed!', CURRENT_TIMESTAMP),
(4, 2,'Finally, someone appreciates this film!', CURRENT_TIMESTAMP),
(5, 2, 'I think the direction was top-notch.', CURRENT_TIMESTAMP),
(6, 2, 'Yeah, the ending could have been stronger.', CURRENT_TIMESTAMP);


