const express = require('express');
const {connection} = require('./config/db');
const cors = require("cors");
require('dotenv').config()
const port = process.env.port
const {routerUser}= require("./routes/userRouter");
const { routerQuiz } =  require("./routes/quizRouter")

const app = express();
app.use(express.json());

app.get('/',(req,res)=>{
    res.send('Home Page')
});

app.use("/user",routerUser);

app.use("/quiz", routerQuiz);

app.listen(port, async()=>{
    try {
        await connection;
        console.log("Connected to DB")    
    } 
    catch (error) {
        console.log(error);
        console.log("Cannot connected to DB")
    }
})