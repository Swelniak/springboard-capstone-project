# Capstone Step 2: Project Proposal

## Project Name

**GameLog**

## Project Summary

GameLog is a full-stack video game tracking application inspired by Letterboxd, but focused on video games instead of movies. Users will be able to search for video games, view game details, save games to personal lists, track their progress, rate games, and write short reviews or notes.

The goal of the project is to help users organize their gaming backlog and keep a personal history of the games they want to play, are currently playing, have completed, or have dropped.

This project will use an external video game API for game data and my own backend API for user-specific features such as authentication, saved games, reviews, ratings, and custom game lists.

---

## Tech Stack

For this project, I plan to use the MERN stack.

### Frontend

* React
* Vite
* React Router
* CSS or a UI styling library

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

### Authentication

* User signup and login
* Password hashing
* JSON Web Tokens or session-based authentication

### External API

* RAWG Video Games Database API

### Deployment

* Render for deployment
* MongoDB Atlas for the database

---

## Project Focus

This project will be an evenly focused full-stack application.

The frontend will be important because the app needs to feel clean, visual, and easy to use. Users should be able to browse games, search quickly, and manage their lists without confusion.

The backend will also be important because the app needs user accounts, saved game data, ratings, reviews, and personal lists. The external API will provide general game data, but my backend will handle the personalized features that make the app useful.

---

## Project Type

GameLog will be a website/web application. It will be built for desktop and laptop browsers first, but I would like the layout to be responsive enough to work well on smaller screens.

---

## Project Goal

The goal of GameLog is to give users a simple way to track their video game library and gaming history.

Many people own games across multiple platforms and stores. It can become difficult to remember what they want to play, what they are currently playing, what they finished, and what they stopped playing. GameLog will solve this by letting users organize games into personal lists and add their own ratings, notes, and reviews.

The app will not try to replace a full video game database. Instead, it will use an existing video game API for general game information and focus on the user’s personal tracking experience.

---

## Target Users

The main users of GameLog will be people who play video games and want to keep track of their gaming backlog.

Possible users include:

* Casual gamers who want to remember games they want to play
* Gamers with a large backlog
* People who play games across multiple platforms
* Users who enjoy rating and reviewing media
* People who want a personal diary of games they have completed

The target demographic would likely be teens and adults who play video games and are familiar with apps like Letterboxd, Goodreads, or backlog tracking tools.

---

## Data Plan

GameLog will use a combination of external API data and my own application data.

### External API Data

I plan to explore using the RAWG Video Games Database API. The external API would provide information such as:

* Game titles
* Cover/background images
* Release dates
* Platforms
* Genres
* Developers
* Publishers
* Ratings
* Descriptions
* Screenshots or trailers if available

This data would allow users to search for games and view details without me having to manually create a large video game database.

### My Own Backend Data

My own backend API will store user-specific information, including:

* User accounts
* Saved games
* Game status
* Ratings
* Reviews
* Notes
* Favorite games
* Custom lists

The external API will provide general game information, but MongoDB will store the information that belongs specifically to each user.

---

## Possible Database Schema

The database schema may change as I build the project, but my initial idea includes the following models.

### User

The User model will store account information.

Possible fields:

* username
* email
* password hash
* profile image URL
* bio
* created date

### SavedGame

The SavedGame model will represent a game saved by a user.

Possible fields:

* user ID
* external API game ID
* title
* image URL
* platform
* status
* rating
* review
* notes
* hours played
* date started
* date completed
* created date
* updated date

Possible status values:

* Want to Play
* Playing
* Completed
* Dropped
* Favorite

### CustomList

The CustomList model would allow users to create their own game lists.

Possible fields:

* user ID
* list name
* description
* game IDs
* created date
* updated date

### Review

Reviews may be stored inside SavedGame or separated into their own model.

Possible fields:

* user ID
* game ID
* rating
* review text
* created date
* updated date

---

## Potential API Issues

There are several possible issues I may run into with the external API.

### API Key Security

The RAWG API requires an API key. I will need to make sure the API key is stored securely in an environment variable and not pushed to GitHub.

### Rate Limits

The external API may have request limits. To avoid making too many requests, I may save selected game information in my database after a user adds a game to their list.

### Missing or Inconsistent Data

Some games may not have complete information, such as missing images, descriptions, release dates, or platform details. I will need to handle missing data in the frontend so the app does not break.

### Attribution Requirements

If I use RAWG data or images, I will need to follow its attribution requirements by clearly crediting RAWG where appropriate.

### Avoiding a Clone

The project should not simply copy an existing video game database. GameLog will use the API as a data source, but the focus of the app will be the user’s personal tracking, reviews, and lists.

---

## Sensitive Information

This project will include some sensitive information.

Sensitive data may include:

* User emails
* User passwords
* Authentication tokens
* API keys

To protect this information, I plan to:

* Hash user passwords before storing them
* Store secret keys in environment variables
* Avoid committing `.env` files to GitHub
* Use authentication middleware to protect private user routes
* Only allow users to edit or delete their own saved games and reviews

The app will not store payment information, financial information, medical information, or other highly sensitive personal data.

---

## Core Functionality

The main functionality of the app will include:

### User Authentication

Users will be able to:

* Sign up
* Log in
* Log out
* Access their own saved game data

### Game Search

Users will be able to:

* Search for video games by title
* View a list of matching games
* Click a game to view more details

### Game Detail Page

Users will be able to view information such as:

* Title
* Image
* Release date
* Platforms
* Genres
* Description
* Rating information if available

### Save Games

Logged-in users will be able to save games to their personal collection.

### Track Game Status

Users will be able to organize games by status:

* Want to Play
* Playing
* Completed
* Dropped
* Favorite

### Ratings and Reviews

Users will be able to:

* Add a personal rating
* Write a short review
* Edit their rating or review
* Delete their review

### User Dashboard

Users will have a dashboard where they can see their saved games grouped by status.

---

## User Flow

A possible user flow would look like this:

1. A visitor lands on the homepage.
2. The visitor can search for games or create an account.
3. The visitor signs up or logs in.
4. The user searches for a game.
5. The user clicks on a game to view details.
6. The user adds the game to their personal list.
7. The user chooses a status, such as “Want to Play” or “Playing.”
8. Later, the user updates the game to “Completed.”
9. The user adds a rating and review.
10. The user views their dashboard to see all saved games organized by status.

---

## Features Beyond Basic CRUD

This project will include CRUD features, but I want it to be more than a basic create/read/update/delete app.

Features beyond basic CRUD may include:

* Search integration with an external video game API
* User-specific game lists
* Game status tracking
* Ratings and reviews
* A personalized dashboard
* Filtering games by status
* Sorting games by rating, title, or date added
* Responsive visual layout with game images

These features should make the app feel like a real product instead of just a simple database project.

---

## Stretch Goals

If I have extra time, I would like to add some stretch features.

Possible stretch goals include:

### Public User Profiles

Users could have a public profile page showing their favorite games, completed games, and recent reviews.

### Custom Lists

Users could create their own lists, such as:

* Favorite RPGs
* Best games of all time
* Games to play with friends
* Childhood favorites

### Stats Page

The app could show personal gaming stats, such as:

* Number of completed games
* Average rating
* Favorite genre
* Most-played platform
* Games completed this year

### Follow Other Users

Users could follow other users and view their recent activity.

### Comments or Likes

Users could like or comment on other users’ reviews.

### Recommendation Feature

The app could suggest games based on the user’s saved games, favorite genres, or highly rated games.

---

## Planned Tasks

### 1. Design Database Schema

Create the first version of the MongoDB/Mongoose models for users, saved games, reviews, and custom lists.

Type: Backend
Difficulty: Medium
Priority: Must Have

### 2. Source Game Data

Test the RAWG API and decide which endpoints are needed for searching games and viewing game details.

Type: Backend
Difficulty: Medium
Priority: Must Have

### 3. Set Up Backend

Create the Express server, connect to MongoDB, set up environment variables, and create basic routes.

Type: Backend
Difficulty: Medium
Priority: Must Have

### 4. Set Up Frontend

Create the React/Vite frontend, set up React Router, and create the first layout pages.

Type: Frontend
Difficulty: Medium
Priority: Must Have

### 5. User Authentication

Build signup, login, logout, and protected routes.

Type: Fullstack
Difficulty: Hard
Priority: Must Have

### 6. Game Search

Allow users to search for games using the external API.

Type: Fullstack
Difficulty: Medium
Priority: Must Have

### 7. Save Games to User Library

Allow logged-in users to save games to their personal list.

Type: Fullstack
Difficulty: Hard
Priority: Must Have

### 8. Edit Game Status, Rating, and Review

Allow users to update saved games with status, rating, review, and notes.

Type: Fullstack
Difficulty: Medium
Priority: Must Have

### 9. User Dashboard

Create a dashboard where users can view saved games grouped by status.

Type: Frontend
Difficulty: Medium
Priority: Must Have

### 10. Styling and Polish

Improve layout, spacing, responsiveness, images, buttons, and overall user experience.

Type: Frontend
Difficulty: Medium
Priority: Must Have

### 11. Stats Page

Create a user stats page with basic information about completed games, ratings, and favorite categories.

Type: Fullstack
Difficulty: Medium
Priority: Stretch Goal

### 12. Public Profiles

Allow users to share a public version of their profile and game lists.

Type: Fullstack
Difficulty: Hard
Priority: Stretch Goal

---

## Minimum Viable Product

The minimum version of GameLog should include:

* User signup and login
* Search games using an external API
* View game details
* Save games to a personal list
* Update game status
* Add ratings and reviews
* Delete saved games
* View a personal dashboard

If these features are complete, the project will meet the main goal of being a full-stack video game tracking app.

---

## Final Notes

GameLog is my preferred capstone project because it has a clear purpose, realistic scope, and strong portfolio potential. It gives me the opportunity to practice full-stack development while building something visual and easy to understand.

The project will use external API data for video game information, but the main value of the app will come from my own backend features: user accounts, saved games, reviews, ratings, and personalized tracking.
