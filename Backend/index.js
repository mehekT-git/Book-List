import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();


const app = express();

app.use(express.json());

app.use(
    cors({
        origin: 'http://localhost:5173',
        methods: ['GET','POST','PUT','DELETE'],
        allowedHeaders: ['Content-Type'],
    })
);

// Root route
app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Welcome to Book Store');
});

app.use('/books',booksRoute);

// Connect to MongoDB and start the server
mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('App connected to Database');
        app.listen(PORT, () => {
            console.log(`App is listening on port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });

    