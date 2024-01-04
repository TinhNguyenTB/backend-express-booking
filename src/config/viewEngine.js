import express from "express";

let configViewEngine = (app) => {
    app.use(express.static("./src/public"));  // client chi co the truy cap vao cac file trong thu muc public
    app.set("view engine", "ejs");  // su dung view engine la ejs
    app.set("views", "./src/views");  // duong dan den cac file view
}

module.exports = configViewEngine;