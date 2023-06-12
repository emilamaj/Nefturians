# Nefture coding exercise - Nefturian hero
## Description
This is a coding exercise for an engineering position at Nefture.
The goal of the exercise is to create a simple web platform that allows users to create and manage their own heroes:
- A user enters its Ethereum address, and can see which nefturian has been assigned to him.
- The asignment function is hidden from the user.
- The user can ask the view the statistics of the clans of the nefturians.

The platform consists in a Next.js frontend and a Node.js backend. The backend is connected to a MongoDB database.
The frontend queries the backend to fetch the info of the nefturian associated to the user, and to fetch the statistics of the clans.
To compute the Id of the Nefturian assigned to the user, the backend simply converts the address into a number, and computes the remainder of the division by the number of nefturians (1241).
On every "search" request, the database registers data about the address.
When returning "statistics", the api queries the db to count the number of times each clan has been assigned.

## How to run the project

Run the following commands in frontend folder:
```bash
npm install
npm run dev
```

Run the following commands in backend folder:
```bash
npm install
node index.js
```
To connect to a mongodb database, create a `.env` file in the backend folder, and add the following line:
```bash
MONGODB_URI=mongodb+srv://<USER>:<PASSWORD>@cluster0.e0yanu0.mongodb.net/?retryWrites=true&w=majority
```