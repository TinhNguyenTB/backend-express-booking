import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import connectDB from './config/connectDB'
import configCORS from "./config/cors";

const app = express();

configCORS(app);

// config body-parser
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))

// config view engine
viewEngine(app);

initWebRoutes(app);

connectDB();

const port = process.env.PORT || 6969;

app.listen(port, () => {
    console.log(`BackEnd nodejs is running on port ${port}`)
})
