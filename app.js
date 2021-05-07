//jshint esversion: 6

let queryState = "";
let queryDate = "";
let queryRes = [];

let distInputVaccine = "";
var vaccineTweakedDay = "";
let vaccineUrl = "";

let vaccineCenterLists = [];
const https = require("https");
const fs = require("fs");
const csv = require("csv-parser");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");
var getJSON = require("get-json");
const fetch = require("node-fetch");

var interval = 43200000;

const report = require(__dirname + "/report.js");
report.getReport();
setInterval(function(){
    report.getReport();
    console.log("Updated after " + interval + " seconds");
}, 43200000);

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

  let year = new Date(queryDate);
  var tweakedDay = new Date(queryDate);
  queryDate = tweakedDay.toLocaleDateString("en-GB");
  // console.log(queryState, queryDate, year.getFullYear(), currDate.getFullYear());


  fs.createReadStream(__dirname + "/public/data/vaccine_report.csv")
  .pipe(csv())
  .on("data", function(row){

      var currResJSONString = JSON.stringify((row));
      var currResJSON = JSON.parse(currResJSONString);

      if(currResJSON["State"] == queryState && currResJSON["Updated On"] == queryDate){
          let totalAdministered = parseInt(currResJSON["First Dose Administered"]) + parseInt(currResJSON["Second Dose Administered"]);
          queryRes.push(currResJSON["State"], currResJSON["Updated On"],
          totalAdministered.toString(), currResJSON["Total Individuals Vaccinated"]);
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
          // console.log(queryRes);

          res.redirect("/state");
      }

  });

});


app.get("/state", function(req, res){
  res.render("state", {queryRes: queryRes});
});

app.post("/state", function(req, res){
  res.redirect("/");
});

app.get("/vaccinations", function(req, res){
  res.render("vaccinations");
});

app.post("/vaccinations", function(req, res){

  // console.log(req.body);
  distInputVaccine = req.body.distInputVaccine;
  vaccineTweakedDay = new Date(req.body.dateInput);

  let dd = vaccineTweakedDay.getDate();

  let mm = vaccineTweakedDay.getMonth() + 1;
  const yyyy = vaccineTweakedDay.getFullYear();
  if(dd<10)
  {
      dd=`0${dd}`;
  }

  if(mm<10)
  {
      mm=`0${mm}`;
  }
  vaccineTweakedDay = `${dd}-${mm}-${yyyy}`;
  // console.log("__________");
  vaccineUrl = "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=" + distInputVaccine + "&date=" + vaccineTweakedDay;
  console.log("Retriving data from: " + vaccineUrl);

  res.redirect("/vaccinations-result");

});

app.get("/vaccinations-result", function(req, res){
  vaccineCenterLists = [];


  getJSON(vaccineUrl)
    .then(function(responseFromUrl) {
    // console.log(responseFromUrl.sessions.length);
    // console.log(responseFromUrl);
    if(responseFromUrl.sessions.length == 0){
      console.log("No vaccine details available");
    }
    else{
      console.log("Getting vaccine details");
      for(let i = 0; i < responseFromUrl.sessions.length; i++){

        vaccineCenterLists.push(
        responseFromUrl.sessions[i].name + ", " +
        responseFromUrl.sessions[i].address + ", " +
        responseFromUrl.sessions[i].district_name + ", " +
        responseFromUrl.sessions[i].state_name + " || " +
        responseFromUrl.sessions[i].min_age_limit + " || " +
        responseFromUrl.sessions[i].available_capacity + " || " +
        responseFromUrl.sessions[i].slots
        );
        // console.log(response.sessions[i]);
      }
    }
    // console.log(vaccineCenterLists.sort());
    res.render("vaccinationsResult", {vaccineCenterLists: vaccineCenterLists});

  }).catch(function(error) {
    console.log("Error while fetching JSON from API: " + error);
  });



});
//start server
app.listen(process.env.PORT || 3000, function(){
  console.log("Main server is running...");
});
