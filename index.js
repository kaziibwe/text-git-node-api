import express from "express";
import users from "./users.js";
import axios from "axios"
import https from 'https';


const port = 3000;
const app = express();
app.use(express.json()); // Middleware to parse JSON bodies

// listen
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
