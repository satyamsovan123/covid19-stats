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

var flag = 0;
$(".navbar-toggler").on("click", function(){
  flag = flag + 1;
  if(flag % 2 != 0){
    $(".main").css("opacity", "0.2");
    $(".main").css("filter", "blur(5px)");

  }
  else{
    $(".main").css("filter", "blur(0px)");
    $(".main").css("opacity", "1");
  }

  $(".navbar-collapse").css("text-align", "center");
  $(".navbar-collapse").css("margin-top", "40vh");
});
