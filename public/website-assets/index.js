var today = new Date();
var formattedToday = today.toISOString().split('T')[0];
var yesterday = new Date(today);
yesterday.setDate(yesterday.getDate() - 1);
yesterday = yesterday.toISOString().split('T')[0];

$("#datein")[0].setAttribute('max', yesterday);

$(".submit").on("click", function(){
    $(".results").addClass("show");
});

setInterval(function(){
  if($("#statein").val() == null){
    $(".submit").attr("disabled", true);
  }
  else{
    $(".submit").attr("disabled", false);
  }
}, 100);
