// $(".vac").on("click", function(){  $(".vac").after("<p>Test</p>");})


var vaccItervalId = setInterval(function(){

    if($(".vac").val() != null){
      var allData = $(".form-control :selected")[0].outerHTML.split("value")[1].split(">")[0];
      var cleanData = allData.replaceAll(/=|"*/g, "");
      // console.log(allData.split(" ")[1].replaceAll(/=|"*/g, ""));
      // console.log(allData.split(" ")[2].replaceAll(/=|"*/g, ""));
      $(".vac").after("<p class='vacres'>" + "<span class='resHead'>Minimum age:</span> " + cleanData.split(" ")[0]
      + " <span class='resHead'>Total slots:</span> " + cleanData.split(" ")[1] + " <span class='resHead'>Slot timings:</span> " + cleanData.split(" ")[2].replaceAll(/,/g, " || ") + "</p>");
      $(".vac").attr("disabled", true);
      clearInterval(vaccItervalId);

    }


  // clearInterval(vaccItervalId);
}, 100);
