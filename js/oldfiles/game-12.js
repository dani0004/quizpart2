// JavaScript Document

//global variable declarations
var username = "";
var userscore = 0;
var scriptFileName = "capital-json.js";
var scriptLoaded = false;
var questionId = "";
var numAnswered = 0;
var totalQuestions = 0;
var correctAnswers = 0;
var incorrectAnswers = 0;
var today = new Date();
today = today.toLocaleDateString();


//my global variables
var scoreSaved=false;
qidstate=false;	
$(document).bind("mobileinit", function(){
	//set any settings 
	//gray out inactive playlists
	var mm=localStorage.getItem("gameusers");
	//if(mm==null){
	//create a new JSON object to hold the users and their scores
	//get the current date
	var now = new Date();
	
	var now2=JSON.stringify(now);
		
	var gameUsers=[{"name":"test1","highscore":0, "date":now2,"duration":0}];
	localStorage.setItem("gameusers",JSON.stringify(gameUsers));
	console.log("after storing in local storage");
	//}
	
	totalQuestions=0;
	numAnswered=0;
	correctAnswers=0;
	incorrectAnswers=0;
	$.mobile.initializePage =true; //auto initialize
	$.support.cors = true;
	$.mobile.allowCrossDomainPages = true;
	
});

//code from steve for disabling the click
//$("li").bind("click", "#myquestion", function(ev){
//$(this).preventDefault();
//$(this).stopPropagation();
//return false;
//this will stop all the click functionality
//});

$(document).on("click", ".playBtn", function( ev ){
	//clicked or tapped the play button from any screen
	
	if( !scriptLoaded ){
		//go get the script file if it is not previously loaded
		console.log("script was not loaded");
		var p=/*"http://localhost/quizgame/js/capital-json.js?q=buildQuestions&callback=buildQuestions";*/
		"http://localhost/quizgame/js/capital-json.js?&callback=buildQuestions";
	var m=document.createElement("script");
	m.src=p;
	document.getElementsByTagName("head")[0].appendChild(m);
	console.log("after attaching script to document");
	scriptLoaded=true;
	}
});



$(document).on("vclick", ".scoresBtn", function( ev ){
	//clicked the scores button
	if( window.localStorage ){
		//check for existing scores, fetch and display them
		//use the ui-grid to display the scores
		//show usernames and scores
		var html = '<div class="ui-grid-a">';
		
	}
});

$(document).on("vclick", ".helpBtn", function( ev ){
	//clicked the help button
	//extra script for that could go here
});


$(document).on("pageshow", "#play", function( ev, ui){
	//get the username if one doesn't already exist
	console.log("getting user name");
	//get the array from localStorage
	var s=localStorage.getItem("gameusers");
	var ss=JSON.parse(s);
	
	if(username == ""){
		$( "#userform" ).popup( "open" );
		
		$(document).on("click", "#btnSubmit", function( ev ){
		console.log("in button click event");
			//save the username when they click the submit button
			var pp=$("#username").val();
			username=pp;
			console.log("user name is");
			console.log(pp);
			var items,s;
			//check if browser supports local storage - check with Steve this test does not work!!!
			
			console.log("checking local storage");
			
				//first check if name is in local storage
				var mm=localStorage.getItem("gameusers");
				var  basescore=0;
				var userexists,i;
				if(s!=null ){
					ss=JSON.parse(mm);
					var entry=ss.userinfo[username];
					if(entry!=null){userexists=true;
					entry.forEach(function(key,value){
						if(parseInt(key)>basescore)
							{basescore=parseInt(key); console.log(basescore);}
					});
					var len=ss.length;
					for (i=0;i<len;i++)
					{
						if(ss.name==username){
							userexists=true;
						}
					}
					}
					
				
						
						//show popup to user with highest score
					
				}
				if(!userexists){
					
				
				var json={};
				json["name"]=username;
				json["highscore"]=0;
				
				ss.push(json);
				var sq=JSON.stringify(ss);
				
				localStorage.setItem("gameusers",sq);
				}
			
			
			/*if(localStorage in window && window["localStorage"]){
				items=localStorage.getItem(userid1);
				console.log("name in local storage is");
				console.log(items);
				localStorage.setItem("userid",pp);
				items=localStorage.getItem(userid);
				console.log("name in local storage is");
				console.log(items);
			}
			else{console.log("local storage not supported");}*/
			ev.preventDefault(); //prevent the default action of the event
			//hide the popup after getting the username
			$("#userform").popup("close");
		});
	}
});


function buildQuestions( data ){
	scriptLoaded = true;
	var cm=new Array();
	console.log("XXXXXX!!!!!!cm new array created");
	//initialize total questions
	totalQuestions=data.questions.length;
	console.log( data );
	//this function runs AFTER the questions script file runs
	//loop through the questions and add the HTML for the questions and answers
	//remember to call trigger("create") after adding the listview
	$("#gamearea").clear;
	
	$("<h2>Welcome to the Science quiz game</h2>").insertBefore("#msg");
	$("<form data-role=\"field-contain\" data-theme=\"b\"></form>").insertBefore("#msg");
	
	$("#gamearea form").append("<ul data-role=\"listview\" data-theme=\"a\"></ul>");
	$("#gamearea form ul").addClass("questionsList");

	var qlist, quid,aqid;
	data.questions.forEach(function(key,value){
		
		//get the answers
		var aaa=key.answer;
		qlist="";
		var qval="q"+value;
		var aval="a"+value;
		
		//store question id and answer id in a temporary array
		//or put this in local storage
		var aid=key.answer;
		
		cm.push(qval,key.answer);//this is a javascript array pure string
		console.log("capturing cm");
		console.log(cm);
		$("#gamearea form .questionsList").append("<li data-role=\"collapsible\" data-theme=\"b\" id=\""+qval+"\" ><h3>Question:</h3>"+key.qtext+"</li>");
	
		key.answers.forEach(function(key,value){
			aqid="aq"+value;
			if(value==aid){cm.push(key);} //this is a javascript array
			if(value==0){
				
				$("#gamearea form .questionsList li:last-child").append("<fieldset data-role=\"controlgroup\"><input id=\"ques0\" type=\"radio\" name=\"ques0\" value=\"ques0\"><label for \"ques0\">"+key+"</label></fieldset>");
			}
			else{
				quid="ques"+value;
				
				$("#gamearea form .questionsList li:last-child fieldset").append("<input id=\""+quid+"\" type=\"radio\" name=\""+quid+"\" value=\""+quid+"\"><label for \"+quid+\">"+key+"</label>");
			}
		
		});
		
		

	});
	
	$("#gamearea form .questionsList li").append("<a href=\"./#answerList\" data-role=\"button\">Check Answer</a>");
	console.log("before setting question id");

	
	$(document).on("click", ".questionsList li", setQuestionId);
	
	//store the cm array in localStorage
	if( window.localStorage ){
	localStorage.setItem("gameanswers",cm);
	console.log("after storing game answers in local storage");
	}
	
	buildAnswers(data);
	
}

function buildAnswers(data){
	
	$("<div id=\"answerList\"></div>").insertBefore("#msg");
	$("#answerList ").append("<h3><a name=\"answerList\">Answer List:<a></h3>");
	$("#answerList").append("<ul data-role=\"listview\" data-theme=\"a\"></ul>");
	
	
	
	var qlist, quid,aqid, added;
	data.questions.forEach(function(key,value){
		
		//get the answers
		var aaa=key.answer;
		qlist="";
		var qval="q"+value;
		var aval="a"+value;
	
	/*	$("#answerList ul").append("<li data-role=\"collapsible\" data-theme=\"b\" id=\""+aval+"\" ><h4>Question:"+key.qtext+"</h4><p >You answered: </p><input type=\"text\"><p>Correct answer: </p><input type=\"text\" value=\"" +key.answers[aaa]+"\"><p>Score: </p><input type=\"text\"><p>Total Score: </p><input type=\"text\"></li>");*/
		


	});
	
	
	
	
}

function setQuestionId( ev ){
	//jQuery mobile will automatically navigate to the nexted ul
	//we need to set the number for the current question
	
	if(!qidstate){
	questionId = $(this).attr("id");
	console.log("setting question id is");
	console.log(questionId);
	qidstate=true;
	ev.preventDefault();
	}
	 //to prevent it coming back again
}

//function for when the user
$(document).on("click", ".questionsList input", function( ev ){
	//run this code when they click an answer
	//trigger click event for current question
	//to get the question id
	ev.stopPropagation();
	
	$(".questionsList li").trigger("click");
	
	
	//increment the number of questions answered
	numAnswered+=1;
	
	//check and count if the answer was correct
	answerId = $(this).attr("id");
	var answerStatus=validateAnswer(answerId);
	
	//update the answer list dynamic html
	updateAnswerList(answerId);
	//change the li for the question AND the answer background colour to pass or fail
	if(answerStatus){$("#"+questionId).addClass("right");correctAnswers+=1;}//add a green class}
	else{$("#"+questionId).addClass("wrong");incorrectAnswers+=1;}//add a red class
	
	
	//update the answer list
	//update scores
	if(!scoreSaved){
	saveScore();}
	console.log("after save score");
	$.mobile.changePage("#gamearea");
	currentQuestion="#"+questionId;
	//navigate back to the question list with $.mobile.changePage()
	//disable clicking on the question that was answered
	//fade the answers out in the question that was answered
	
	
	$(currentQuestion +" fieldset").fadeOut('slow');
	/*$(currentQuestion +" fieldset").fadeTo('slow',0.2);*/
	
	//get the next sequential question id
	var len=currentQuestion.length;
	var nextqid=currentQuestion.substr(0,len-1)+1;
	
	console.log("HHHHHHHnext quid is");
	console.log(nextqid);
	qidstate=false;
	
	
	/*$(currentInput).unbind("click",function(ev){console.log("unbinding2");ev.preventDefault(); return false;});*/
	
	
	/*try {
         		$(currentQuestion +"  #ques0").checkboxradio("disable");
    		 }
    	 catch (err) {
        			 console.log ("Error occurred refreshing checkbox (probably first time!)");
     				}
		try {
         		$(currentQuestion +"  #ques1").checkboxradio("disable");
    		 }
    	 catch (err) {
        			 console.log ("Error occurred refreshing checkbox (probably first time!)");
     				}
		try {
         		$(currentQuestion +"  #ques2").checkboxradio("disable");
    		 }
    	 catch (err) {
        			 console.log ("Error occurred refreshing checkbox (probably first time!)");
     				}
		try {
         		$(currentQuestion +"  #ques3").checkboxradio("disable");
    		 }
    	 catch (err) {
        			 console.log ("Error occurred refreshing checkbox (probably first time!)");
     				}	*/	
	
	//display their new total score
	//check if they have answered all the questions
		//call the function to save the total score in localStorage
		
	//disable the click on the single question
	/*$(document).on("click", currentQuestion, function( ev ){*/
	//trigger the click event for the current question
	
		/*$(document).on("click", currentQuestion, function( ev ){
			console.log("current question clicked");
		ev.preventDefault();
		
		return false;	
	});*/
});

function validateAnswer(id){
	var cmans=localStorage.getItem("gameanswers");
	
	var cmansarray=cmans.split(",");
	var indx=cmansarray.indexOf(questionId);//answer array

	var expaid=cmansarray[indx+1];

	if(cmansarray[indx+1]==id){return true;} else {return false;}
}
function updateAnswerList(id){	
	
	var answertext;
	//get the value of the answer
	var ansText=getAnswerValue(id);//user answer value
	
	
	//get expected answer id
	var cmans=localStorage.getItem("gameanswers");
	
	var cmansarray=cmans.split(",");
	var indx=cmansarray.indexOf(questionId);//answer array
	var aval="a"+questionId[1];
	
	var len=cmansarray[indx+2].length; //get the answer 2 postions down
	var expaid=cmansarray[indx+1];
	//now check the answer switch stack for the answer.
	
	var expansText=cmansarray[indx+2];//expected answer text
	
	//get the text of the current question
	var questionText=$("#"+questionId).text(); //jquery method to extract text
	
	console.log(questionText);
	
	$("#answerList ul").append("<li data-role=\"collapsible\" data-theme=\"b\" id=\""+aval+"\" ><h4>Question:"+questionText+"</h4><p >You answered: </p><input type=\"text\" value=\""+ansText+"\"><p>Correct answer: </p><input type=\"text\" value=\"" +expansText+"\"><p>Score: </p><input type=\"text\ value=\"" +4+"\"><p>Total Score: </p><input type=\"text\ value=\"" +correctAnswers+"\"></li>").trigger("create");
	

}
function getAnswerValue(id)
{
	var answerText="";
	switch(id)
	{
		case"quid0":
		answerText=$('label[for="quid0"]').html();
		break;
		case"quid1":
		answerText=$('label[for="quid1"]').html();
		break;
		case "quid2":
		answerText=$('label[for="quid2"]').html();
		break;
		case "quid3":
		answerText=$('label[for="quid3"]').html();
		break;
		default:
	}
	return answerText;
}
function saveScore(){
	//save the users score to localStorage OR to the server via AJAX
	//extract the JSON object from local storage
	//push the new scores in
	if( window.localStorage ){
		var s=localStorage.getItem("gameusers");
		var ss=JSON.parse(s);
		//get all the scores for this user

		var len=ss.length;
		for (i=0;i<len;i++)
		{
			console.log("in loop checking name");
			
			if(ss[i].name==username){
				
				console.log("correct answers value");
				console.log(correctAnswers);
				console.log(ss[i].highscore);
				if (parseInt(ss[i].highscore)<correctAnswers)
				{ ss[i].highscore=correctAnswers; console.log("setting high score");}
			}
		}

	//convert object back to string and store back in  local storage
		localStorage.setItem("gameusers",JSON.stringify(ss));
	
	
		//save the current score and username to localStorage
		//add the current score and username to the LISTS in localStorage
	}//end window local storage
	buildScoresPage();
	//jump to the score page with $.mobile.changePage()
	$.mobile.changePage("#scores");
	//display the scores from localStorage or via AJAX or via a <script>
	scoreSaved=true;	
}
function buildScoresPage(){
	
	
	if( window.localStorage ){
		var s=localStorage.getItem("gameusers");
		var ss=JSON.parse(s);
		scoresHtml="<div class=\"ui-grid-b\"><div class=\"ui-block-a\"><h3>Score</h3></div><div class=\"ui-block-b\"><h3>Date</h3></div><div class=\"ui-block-c\"><h3>Time</h3></div></div><!-- /grid-b -->";
		console.log("before inserting first lot");
	$(scoresHtml).appendTo("#scoretable").trigger("create",function(ev){
		ev.stopPropagation();
		var pp=ev.isPropagationStopped();
		console.log("stopping create propagation");
		console.log(pp);
		return false;
	});
	
		
		
		scoresHtml="<ul data-role=\"listview\" ></ul>";
		$(scoresHtml).appendTo(".ui-block-a").trigger("create");
		
		
		
		scoresHtml="";
		ss.forEach(function(key,value){
			
			if(value==0){
			miniHtml="<li><h4>Player:"+ key.name +"</h4><ul>";}
			else{
			miniHtml="<li><h4>Player:"+ key.name +"</h4><ul>";}
			
			miniHtml=miniHtml+"<li>"+key.highscore+"</li></ul></li>";
			
			
			scoresHtml=scoresHtml+miniHtml;
		});
		
	}
	
	console.log(scoresHtml);
	
	$(scoresHtml).appendTo(".ui-block-a ul").trigger("create");
	console.log("after creating scores page");
	
	
	
}

function buildHelpPage(){
	
	
	//if( window.localStorage ){
		
		var helpHtml="<div class=\"ui-grid-b\"><div class=\"ui-block-a\"><h3>Score</h3></div></div><!-- /grid-b -->";
		console.log("before inserting first lot");
	$(helpHtml).appendTo("#help").trigger("create",function(ev){
		ev.stopPropagation();
		var pp=ev.isPropagationStopped();
		console.log("stopping create propagation");
		console.log(pp);
		return false;
	});
	
		
		
		helpHtml="<ul data-role=\"listview\" ></ul>";
		$(helpHtml).appendTo(".ui-block-a").trigger("create");
		
		
		
		helpHtml="";
		
			
			
			miniHtml+="<li><h4>Players</h4><ul><li>Number of players is unlimited</li><li>xxxxx</li><li>xxxxx</li><li>xxxxx</li></ul>";
			
			miniHtml+="<li><h4>Game Rules</h4><ul><li>xxxxx</li><li>xxxxx</li><li>xxxxx</li></ul>";
			
			miniHtml+="<li><h4>Scoring</h4><ul><li>xxxxx</li><li>xxxxx</li><li>xxxxx</li></ul>";
			
			
			scoresHtml=scoresHtml+miniHtml;
		
		
	//}
	
	console.log(scoresHtml);
	
	$(scoresHtml).appendTo(".ui-block-a ul").trigger("create");
	console.log("after creating help page");
	
	
	
}

