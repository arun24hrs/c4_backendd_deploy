const express = require("express");
const connection = require("./db");
const userRoute = require("./Routes/user.route");
const postRouter = require("./Routes/post.route");
const auth = require("./Middleware/auth.middleware");
require("dotenv").config();
const cors = require("cors")
const app = express();
app.use(cors())
app.use(express.json())

app.use("/users", userRoute);
app.use(auth);
app.use("/posts", postRouter)

app.listen(process.env.Port, async()=>{
    try {
        await connection;
        console.log("Connected to DB.")
        console.log(`Server is Running on ${process.env.Port}`)
    } catch (error) {
        console.log("Error connecting to DB.")
    }
})