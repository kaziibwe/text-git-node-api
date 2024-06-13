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

app.get("/users", (req, res) => {
    res.json(users);
})

app.get("/user/:id", (req, res) => {
    const id = req.params.id;
    // const user = users.find((user)=>user.id === parseInt(id));

    const user = users.find((user) => user.id === parseInt(id))
    if (!user) return res.status(401).send('user not found');

    res.json(user);
})
