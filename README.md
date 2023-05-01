# Whats there
Whats there is a travel companion app that assists users in discovering the most popular attractions in any city they desire to visit. The app allows users to create a profile using Google's OAUTH login, enabling them to plan multiple trips and add and remove attractions from their itinerary.

The app is developed using Google Maps API and TripAdvisor API to provide users with accurate and up-to-date information about the attractions they wish to visit. This allows users to see the reviews, ratings, and other relevant details about the attractions, making it easier for them to make informed decisions.

Overall, Whats there is a helpful tool for travelers who want to explore new places and find the best attractions to visit. With its user-friendly interface and the ability to customize trips, the app can make traveling more enjoyable and stress-free.

## Getting started

```
cd nextjs-whatsthere
npm i
```

## Getting started with prisma

In your nextjs-whatsthere file, create a `.env` file. In side of that file add

```
DATABASE_URL="file:./dev.db"
```

This is needed in order for prisma to work on your local.

Should you decide to use an upload database (So this will be a DB hosted only and shared between members) Please read the prisma docs and add accordingly

