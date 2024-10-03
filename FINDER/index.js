const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const request = require("request");
const DB = new Map();
const app = express();
const fs = require("fs");
const sqlite3 = require("sqlite3");
const sqlite = require("sqlite");

app.use(express.static("public"));

app.get("/", function(req, res) {
    res.sendFile("index.html");
});

app.get("/finder.html", function(req, res) {
    res.sendFile("finder.html");
}); 
app.get("/loster.html", function(req, res) {
    res.sendFile("loster.html");
});
app.post("/upload", function(req, res) {
    if (!req.body?.place || !req.body?.type || !req.body?.way) {
        return;
    }
    const way = req.body.way;
    const place = req.body.place;
    const type = req.body.type;
    const img = req.body.img;
    let latLng_x, latLng_y;
    if (place == "연세대학교") {
        latLng_x = 37.56376886760;
        latLng_y = 126.9377647106;
    }
    else if (place == "천안시청") {
        latLng_x = 36.81503182656032;
        latLng_y = 127.11392312655443;
    }
    else if (place == "강남구청역") {   
        latLng_x = 37.51729997754024;
        latLng_y = 127.04127592654241;
    }
    
    const data = fs.readFileSync("product.json", 'utf-8');
        const jsonObj = JSON.parse(data);
        jsonObj.push({"type": type, "place":place, "img": img, "latLng_x": latLng_x, "latLng_y": latLng_y});
        fs.writeFile("product.json", JSON.stringify(jsonObj), "utf-8", function(error) {
            if (error) {console.log("error:", error);}
        });
    res.redirect("complete.html");
})
const PORT = process.env.PORT || 8000;
app.listen(PORT, function() {
    console.log("Server on. http://localhost:" + PORT);
});