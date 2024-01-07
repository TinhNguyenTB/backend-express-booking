import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
require('dotenv').config();
import connectDB from './config/connectDB'
import cors from 'cors'

let app = express();
app.use(cors({ origin: true, optionsSuccessStatus: 200 }))

// config app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

viewEngine(app);
initWebRoutes(app);

connectDB();

let port = process.env.PORT || 6969;
// if port === undefined => port = 6969

app.listen(port, () => {
    console.log(`BackEnd nodejs is running on port ${port}`)
})
