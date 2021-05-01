//jshint esversion: 6

let queryState = "";
let queryDate = "";
let queryRes = [];

const fs = require("fs");
const csv = require("csv-parser");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

//fetch after 12 hours
var interval = 43200000;

const report = require(__dirname + "/report.js");
report.getReport();
setInterval(function(){
    report.getReport();
    console.log("Updated after " + interval + " seconds.");
}, 43200000);

//today, yesterday
let currDate = new Date();
let formatedTday = (currDate.toLocaleDateString("en-GB"));

const yesterday = new Date(currDate);
yesterday.setDate(yesterday.getDate() - 1);
const formatedYday = yesterday.toLocaleDateString("en-GB");

app.get("/", function(req, res){
  res.render("index");
});

app.post("/", function(req, res){
  queryRes = [];

  queryState = req.body.stateInput;
  queryDate = req.body.dateInput;
  // console.log(queryState, queryDate);

  let year = new Date(queryDate);
  var tweakedDay = new Date(queryDate);
  queryDate = tweakedDay.toLocaleDateString("en-GB");
  // console.log(queryState, queryDate, year.getFullYear(), currDate.getFullYear());


  fs.createReadStream(__dirname + "/public/data/vaccine_report.csv")
  .pipe(csv())
  .on("data", function(row){

      var currResJSONString = JSON.stringify((row));
      var currResJSON = JSON.parse(currResJSONString);

      //get the previous day report for query
      if(currResJSON["State"] == queryState && currResJSON["Updated On"] == queryDate){

          queryRes.push(currResJSON["State"], currResJSON["Updated On"],
          currResJSON["Total Individuals Registered"], currResJSON["Total Individuals Vaccinated"]);
          // console.log(queryRes);

      }
  });

  fs.createReadStream(__dirname + "/public/data/state_report.csv")
  .pipe(csv())
  .on("data", function(row){

      //console.log(typeof(row));
      var currResJSONString = JSON.stringify((row));

      //console.log(typeof(currResJSONString));
      var currResJSON = JSON.parse(currResJSONString);

      var tweakedDay = new Date(currResJSON["Date"]);
      tweakedDay = tweakedDay.toLocaleDateString("en-GB");

      if(currResJSON["State"] == queryState && tweakedDay == queryDate){
          queryRes.push(currResJSON["Confirmed"],
          currResJSON["Recovered"], currResJSON["Deceased"]);
          console.log(queryRes);

          res.redirect("/state");
      }

  });

  // res.redirect("/state");

});


app.get("/state", function(req, res){
  res.render("state", {queryRes: queryRes});
});

app.post("/state", function(req, res){
  res.redirect("/");
});


//start server
app.listen(process.env.PORT || 3000, function(){
  console.log("Main server is running.");
});
