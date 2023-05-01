# Whats there
This is a travel companion app that helps users find the most popular attractions in any city they choose to visit. It also allows users to create a profile using Google's OAUTH login, plan multiple trips, and add and remove attractions from their itinerary. The app utilizes Google Maps API and TripAdvisor API to provide users with accurate and up-to-date information about the attractions they wish to visit.

## Features
Google's OAUTH login for creating a user profile
Planning and organizing multiple trips
Adding and removing attractions from trips
Integration with Google Maps API for navigation and location information
Integration with TripAdvisor API for reviews, ratings, and other relevant details about attractions

## Getting Started
To get started with the app, you will need to have the following:

A web browser (Chrome, Firefox, Safari, etc.)
A valid Google account to use for the OAUTH login
To run the app locally, follow these steps:

Clone the repository to your local machine
Install the necessary dependencies by running npm install in both the react-whats there directory and the nextjs-whatsthere directory
Start the servers by running npm start in the react-whatsthere directory  and npm run dev in the nextjs-whatsthere directory
Open your web browser and navigate to http://localhost:3000

## Getting started with prisma

In your nextjs-whatsthere file, create a `.env` file. In side of that file add

```
DATABASE_URL="file:./dev.db"
```

This is needed in order for prisma to work on your local.

Should you decide to use an upload database (So this will be a DB hosted only and shared between members) Please read the prisma docs and add accordingly


## Contributing
If you would like to contribute to the development of the app, feel free to submit a pull request or open an issue on GitHub.