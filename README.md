# Next.js Basic Authentication App

## Overview
This Next.js application provides a simple example of implementing basic authentication using a username and password. It demonstrates how to protect routes and control access to certain pages based on authentication status.

## Features
Basic Authentication: Users can log in with a username and password.
Protected Routes: Certain routes are protected and can only be accessed by authenticated users.
Logout: Users can log out to end their authenticated session.

## Installation
* Clone the repository git@github.com:awaisayub149/auth-frontend.git.
* cd auth-frontend.
* nvm use 16 (Node version 16).
* npm install.

## Usage
* Stop/kill the port 3000:
* Start the development server:
* npm run dev.
* Open your browser and navigate to http://localhost:3000.

## Usage
* Use the provided login form to log in with a valid username and password.
* Access the protected routes and see how the authentication mechanism works.

## Routes
* Login: /
* Protected Page: /dashboard
* Register: /register