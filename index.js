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

    console.log("changes")

    res.json(user);
})



app.post("/creatUser", (req, res) => {
    const { name, email, phone, subscription, password } = req.body;

    const id = users.length + 1;
    const newuser = {
        id: id,
        name,
        email,
        phone,
        subscription,
        password
    }
    users.push(newuser);
    res.json([
        {
            "message": "user created successfully",
            "users": newuser
            // "users":users

        }
    ]);
})




app.put("/userUpdate/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find((user) => user.id === id);

    if (!user) return res.status(401).send('user not found');

    const { name, email, phone, subscription, password } = req.body;
    const useUpdate = {
        id: id,
        name,
        email,
        phone,
        subscription,
        password
    }
    // users.splice(users.indexOf(user),1,useUpdate);

    const UserIndex = users.findIndex((user) => user.id === id);
    users[UserIndex] = useUpdate;
    res.json({ users })


});



app.delete('/deletUser/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find((user) => user.id === id);

    if (!user) return res.status(401).send('user not found');

    const UserIndex = users.findIndex((user) => user.id === id);
    users.splice(UserIndex, 1);

    res.status(200).send("User Deleted successfully").json(user)

})


app.post('/aiApi', async (req, res) => {
    const { string } = req.body;
    

    if (!string) {
        return res.status(401).json({
            error: 'String parameter is required'
        });
    }

    // Define the URL of the AI server
    const aiServerUrl = `https://ydegrees.pearlbuddy.com:8090?string=${encodeURIComponent(string)}`;

    try {
        // Make a GET request to the AI server
        const response = await axios.get(aiServerUrl, {
            // Disable SSL verification (not recommended for production)
            httpsAgent: new https.Agent({ rejectUnauthorized: false })
        });

        // Process the AI server response
        res.json({
            success: true,
            data: response.data
        });

    } catch (error) {
        res.status(500).json({
            error: 'An error occurred while communicating with the AI server: ' + error.message
        });
    }
});
