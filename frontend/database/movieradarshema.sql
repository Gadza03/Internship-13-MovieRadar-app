CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    isAdmin BOOLEAN DEFAULT FALSE
);

CREATE TABLE genres (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE movies (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
	genreId INT REFERENCES genres(id) ON DELETE CASCADE,
    releaseYear INT NOT NULL CHECK (releaseYear >= 1900),
    averageRating DECIMAL(3,2) DEFAULT 0, 
    imageUrl TEXT, 
    createdAt TIMESTAMP NOT NULL,
    updatedAt TIMESTAMP NOT NULL
);


CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    userId INT REFERENCES users(id) ON DELETE CASCADE,
    movieId INT REFERENCES movies(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     UNIQUE(userId, movieId)
);


CREATE TABLE ratings (
    userId INT REFERENCES users(id) ON DELETE CASCADE,
    movieId INT REFERENCES movies(id) ON DELETE CASCADE,
    ratingValue INT CHECK (ratingValue BETWEEN 1 AND 5) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(userId, movieId) 
);

CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    reviewId INT REFERENCES reviews(id) ON DELETE CASCADE,
    creatorId INT REFERENCES users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    createdAt TIMESTAMP NOT NULL
);

