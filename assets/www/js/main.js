var second = 0;
var end = 0;
var x_cloud1 = 650;
var x_cloud2 = -280;
var x_cloud3 = 660;
var sleep_time = 10;
var	inDownState = 0;

$(document).ready(function() 
{
	$("#splash_body").hide();
	setTimeout("hideFirst()", 2000);		
	init();
});

function hideFirst()
{
	$("#first_body").hide();
	$("#splash_body").show();
}

function init()
{
	$("#txt_continue").html("Continue");
	$("#txt_unlock").html("Unlock");
	$("#txt_start").html("Start");
	$("#txt_end").html("end");
	$(".sleepfor").html("sleep for:");
	$(".msg_body").html(sleep_time + " mins");
}

function MoveClouds()
{
	x_cloud1 -= 2;
	if (x_cloud1 < -205)
		x_cloud1 = 325;	
	
	x_cloud2 += 2;
	if (x_cloud2 > 330)
		x_cloud2 = -140;		
	
	x_cloud3 -= 2;
	if (x_cloud3 < -150)
		x_cloud3 = 330;
		
	$("#act_body").find(".cloud1")
	.css("margin-left", x_cloud1 + "px");
	
	$("#act_body").find(".cloud2")
	.css("margin-left", x_cloud2 + "px");
	
	$("#act_body").find(".cloud3")
	.css("margin-left", x_cloud3 + "px");


	setTimeout("MoveClouds()", 100);
}

function act_continue()
{
	if(inDownState)
	{
		$("#act_body").find(".btn_end").show();
		inDownState	=	0;
	}
	else
	{
		$("#act_body").find(".btn_end").hide();
		console.log("111");
		setTimeout("MoveClouds()", 500);
	}
}

function sleep_set(flag)
{
	if (flag == 0)
	{
		$("#act_body").find(".btn_start").hide();

		$("#timebar").animate({left:"-200px"});
		$("#msg_minutes").animate({left:"-100px"});

		$("#act_body").find(".btn_end").show();

		play();
		end	=	0;
		second = $("#timebar").val()  * 60 ;
		timeclock();
	}
	else
	{
		$("#timebar").animate({left:"0px"});
		$("#msg_minutes").animate({left:"0px"});

		$("#act_body").find(".btn_start").show();
		$("#act_body").find(".btn_end").hide();
		
		second = $("#timebar").val("10");
		//document.getElementById("MoveSheep").style.WebkitAnimationPlayState="paused";
		//$("#MoveSheep").hide();
		//$("#MoveSheep").css("WebkitAnimationPlayState","paused");
		pause();
		end	=	1;
	}
}

function act_start()
{
	sleep_set(0);	
}

function act_end()
{
	sleep_set(1);
	$(".msg_body").html(sleep_time + " mins");
}

function infoDown()
{
	console.log("infoDown()");
	inDownState	=	1;
}

function showTimeValue(timeval)
{
	$(".msg_body").html(timeval + " mins");
}

function play(){
  var video1 = document.getElementById("video1");  
  video1.src="http://192.168.0.23/www/travelsleep_full.mp3";

  video1.play();   
}  
function pause(){
  var video1 = document.getElementById("video1");   
   setTimeout("video1.load()", 2000);
  //video1.pause();
}   

function timeclock(){
  if ((second < 1)) {	//count down
	pause();
	console.log("pause");
	return false;
  }
  if(end == 1) return false;

  second = second-1;
  munite	=	parseInt(second / 60);
  showTimeValue(munite);
  setTimeout("timeclock()", 1000);
}