//jshint esversion: 6

var interval = 1800000;

const report = require(__dirname + "/report.js");
report.getReport();
setInterval(function(){
    report.getReport();
    console.log("Updated after " + interval + " seconds.");
}, 1800000);

const express = require("express");
const app = express();

//start server
port = process.env.PORT;
app.listen(port || 3001, function(){
  console.log("Update server is running.");
});
