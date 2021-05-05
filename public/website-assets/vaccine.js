var stateUrl = "https://cdn-api.co-vin.in/api/v2/admin/location/states";
let statesStrings = [];
let distStrings = [];
let stateId = "";
let distId = "";
let distUrl = "";
$.getJSON(stateUrl, function(allStates){
  for(let i = 0; i < allStates.states.length; i++){
    // console.log(allStates.states[i]);
    statesStrings.push("<option class='selectedStateOpt' value=\'" + allStates.states[i].state_id + "\'>" + allStates.states[i].state_name + "</option>");
  }
  statesStrings.reverse();
  // console.log(statesStrings);
  // statesStrings.push("<option value=\'" + allStates.states[i].state_id + "\'>" + allStates.states[i].state_name + "</option>");
  for(let i = 0; i < statesStrings.length; i++){
    // console.log($("option")[i].outerHTML);
    $(".firstState").after(statesStrings[i]);
    // statesStrings.push("<option value=\'" + allStates.states[i].state_id + "\'>" + allStates.states[i].state_name + "</option>");
  }
});

var intervalId = setInterval(function(){
  if($(".dynamic-states").val() == null){
    $(".dynamic-dist").attr("disabled", true);
    // console.log("null");
  }
  else{
    $(".dynamic-states").attr("disabled", true);

    // console.log("not null");
    $(".dynamic-dist").attr("disabled", false);

    stateId = $(".dynamic-states").val();


    distUrl = "https://cdn-api.co-vin.in/api/v2/admin/location/districts/" + stateId;
    // console.log(distUrl);
    $.getJSON(distUrl, function(allDists){
      // console.log(allDists.districts);
      for(let i = 0; i < allDists.districts.length; i++){
        // console.log(allDists.districts[i].district_id, allDists.districts[i].district_name);
        distStrings.push("<option class='selectedDistOpt' value=\'" + allDists.districts[i].district_id + "\'>" + allDists.districts[i].district_name + "</option>");
      }
      // distStrings.reverse();
      // console.log(distStrings);

      for(let i = 0; i < distStrings.length; i++){
        // console.log($("option")[i].outerHTML);
        $(".firstDist").after(distStrings[i]);
        // statesStrings.push("<option value=\'" + allStates.states[i].state_id + "\'>" + allStates.states[i].state_name + "</option>");
      }
      distId = $(".dynamic-dist").val();
      //to stop setinterval function
      clearInterval(intervalId);
    });
  }
}, 100);


// $(".dynamic-states").val();
// let distUrl = "https://cdn-api.co-vin.in/api/v2/admin/location/districts/" + "3";

$.getJSON(distUrl, function(allDists){
  // console.log(allDists);
});

var today = new Date();
var formattedToday = today.toISOString().split('T')[0];
$("#datein")[0].setAttribute('min', formattedToday);

$(".submit").on("click", function(){
  // let check_intervalId = setInterval(function(){
  //   if(stateId == "" || distId == ""){
  //     $(".submit").after("<p>Please fill up the form!</p>");
  //     // window.location.replace("/vaccinations");
  //   }
  //   else{
  //     clearInterval(check_intervalId);
  //   }
  // }, 100);
  if(stateId == "" || distId == "" || $("#datein").val() == "" ){
    $(".submit").after("<p class='warning'>Please fill up the entire form!</p>");
    setTimeout(function(){
      $(".submit").hide();
      window.location.replace("/vaccinations");
    }, 900);


    // window.location.replace("/vaccinations");
  }

});
//
// $(".vac").on("click", function(){
//
//   // console.log("sjkbda");
//   // setInterval(function(){
//   //   if($(".vac").val() == null){
//   //     console.log("null");
//   //     $(".vac").hide();
//   //   }
//   //   else{
//   //     console.log("not null");
//   //   }
//   // }, 1000);
//   $(".vac").after("<p>Test</p>");
// });

//
// $(".vac").on("click", function(){  $(".vac").after("<p>Test</p>");})




// intervalId = setInterval(function(){
//   if($(".form-control").val() != null){
//       $(".form-control").after("<p>Test</p>");
//     }
//   clearInterval(intervalId);
// }, 100);
//
//
// $(".form-control").val()
// $(".form-control :selected")[0].outerHTML.split("value")[1]
// $(".form-control :selected")[0].outerHTML.split("value")[1].split(">")[0];

// if($(".vac").val() != null){
//   console.log("not selected");
//     $(".vac").after("<p>Test</p>");
// }


// console.log(statesObj)
// $(".dynamic-states option")[1].outerHTML;
