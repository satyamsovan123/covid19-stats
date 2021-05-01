const fs = require('fs');
const csv = require('csv-parser');
const https = require('https');

exports.getReport = function() {
  const vaccineUrl = "https://api.covid19india.org/csv/latest/cowin_vaccine_data_statewise.csv";
  const stateReportUrl = "https://api.covid19india.org/csv/latest/states.csv";

  https.get(vaccineUrl, function(res){
      const path = `${__dirname}/public/data/vaccine_report.csv`;
      const filePath = fs.createWriteStream(path);
      res.pipe(filePath);
      filePath.on("finish", function(){
          filePath.close();
          dwnldStatus = true;
      }).on("error", function(err){
          console.log("Unable to download the file");
          console.log(err);
      });
  });
  https.get(stateReportUrl, function(res){
      const path = `${__dirname}/public/data/state_report.csv`;
      const filePath = fs.createWriteStream(path);
      res.pipe(filePath);
      filePath.on("finish", function(){
          filePath.close();
          dwnldStatus = true;
      }).on("error", function(err){
          console.log("Unable to download the file");
          console.log(err);
      });
  });
  console.log("Latest reports fetched");
}
