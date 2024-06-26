import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import initApiRoutes from "./route/api";
import connectDB from './config/connectDB'
import configCORS from "./config/cors";
import cookieParser from "cookie-parser";

const app = express();

configCORS(app);

// config body-parser
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))

// config cookie-parser
app.use(cookieParser());

// config view engine
viewEngine(app);

initWebRoutes(app);
initApiRoutes(app);

// test connect
connectDB();

const port = process.env.PORT || 6969;

app.listen(port, () => {
    console.log(`Backend express is running on port ${port}`)
})
