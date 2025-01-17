const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes/ToDoRoute")
require("dotenv").config();

const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MongoDB_CLOUD).then(()=>console.log("Connected!!")).catch((err)=>console.log(err));
app.use(routes);
app.listen(PORT,()=>console.log("Server is running on port "+PORT));