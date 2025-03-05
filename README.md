🎬 Discover your next favorite movie! Our AI-powered movie recommendation app suggests films based on your taste, mood & viewing history. Explore genres, get personalized picks & never miss a great film! 🍿✨
# Movie Recommendation

Welcome to the Movie Recommendation project—a dynamic movie search and recommendation platform built with Vite, React, and Tailwind CSS. This guided project is my first full-fledged build, where I learned the ins and outs of modern web development while crafting a sleek, responsive UI and integrating powerful features.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Technologies](#technologies)
- [Demo](#demo)
- [Setup](#setup)
- [Usage](#usage)
- [Known Issues](#known-issues)
- [Future Improvements](#future-improvements)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Overview

This project is a movie search platform designed to provide real-time movie data with a user-friendly experience. It leverages the TMDB API to fetch movie details, while a trending section powered by Appwrite tracks search counts and displays the hottest picks. With debounced search functionality, the app minimizes unnecessary API calls, keeping the server happy and the experience smooth.

## Features

- **Sleek UI:** Built with Tailwind CSS to ensure a modern and responsive design.
- **Debounced Search:** Optimized search input to prevent excessive API calls.
- **Real-Time Movie Data:** Integration with the TMDB API provides up-to-date movie information.
- **Trending Section:** Utilizes Appwrite to track search counts and spotlight the top 5 movies.
- **Top 20 Movies:** Intended to showcase the most popular movies (currently under troubleshooting due to CORS issues).

## Technologies

- [Vite](https://vitejs.dev/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TMDB API](https://www.themoviedb.org/documentation/api)
- [Appwrite](https://appwrite.io/)

## Demo

Check out the live version of the project (note: the "Top 20 Movies" feature is pending a fix for a CORS issue on the hosted version):

![UI Screenshot](./screenshot.png)
![UI Screenshot](./screenshot1.png)
*The UI boasts vibrant movie posters and an intuitive layout.*

## Setup

To get a local copy up and running, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/whynotramaa/movie-recommendation.git
