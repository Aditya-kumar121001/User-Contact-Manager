const express = require("express");
const dotenv = require("dotenv").config()
const app=express();
const port = process.env.PORT || 5000;

//database connection
const connectDB = require("./database/connection")
connectDB();

//importing files
app.use(express.json())
app.use("/api/contact", require("./routes/contactRoutes"))
app.use("/api/user", require("./routes/userRoutes"));
const errorHandler = require("./middleware/errorHandler");

//middleware
app.use(errorHandler);

app.listen(port , () =>{
    console.log(`server is running on port ${port}`)
})