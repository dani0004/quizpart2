// JavaScript Document

//global variable declarations
var username = "";
var userscore = 0;
var scriptFileName = "capital-json.js";
var scriptLoaded = false;
var questionId = "";
var numAnswered = 0;
var totalQuestions = 8;
var correctAnswers = 0;
var incorrectAnswers = 0;
var today = new Date();
today = today.toLocaleDateString();



var popupUpdated=false;//needs to go into local storage
$(document).bind("mobileinit", function(){
	//set any settings 
	console.log("!!!!!!!!mobileinit function called");
	//var mm=localStorage.getItem("gameusers");
	//if(mm==null){
	//create a new JSON object to hold the users and their scores
	//get the current date
	//*************STATE VARIABLES*******************
	
	//******END STATE VARIABLES ************************
	 //*************USER SCORE STATE*******************
	//var now = new Date();
	$.mobile.pageLoadErrorMessage = 'Sorry, something went wrong. Please try again.';
	
	
	//*************END USER SCORE STATE*******************
	
	$.mobile.dialog.prototype.options.closeBtnTest="goodbye";
	
	$.mobile.initializePage =true; //auto initialize
	$.support.cors = true;
	$.mobile.allowCrossDomainPages = true;
	
	
});



$(document).on("click", ".playBtn", function( ev ){
	//clicked or tapped the play button from any screen
	console.log("clicked play button");
	//###EVENT FIRING CONTROL SECTION
	$("#answerList").remove();
	$("#scoretable").children().remove(".ui-grid-b");
	$("#help").children().remove("#helpList");
	
	if(window.localStorage){
		
		localStorage.setItem("helppage","0");}
	
	//###END EVENT FIRING CONTROL SECTION
	//####INITIALIZE SECTION############
	//reset localStorage if a new user
	//####END INITIALIZE SECTION############
	var activated=false;
	if( !scriptLoaded ){
		//go get the script file if it is not previously loaded
		console.log("script was not loaded");
		var p=
		"http://localhost/quizgame/js/capital-json.js?&callback=buildQuestions";
	var m=document.createElement("script");
	m.src=p;
	document.getElementsByTagName("head")[0].appendChild(m);
	console.log("after attaching script to document");
	scriptLoaded=true;
	activated=true;
	s

console.log("after making call");


  
	}
	//reactivate the disabled li
	if(!activated){
		console.log("activated is "+activated);
	$(document).on("click", "#questions li", setQuestionId);}
	$("#scores").hide();
	$("#help").hide();
	$.mobile.changePage("#play","slide",true,false);
	$("#play").show();
	
});

 

$(document).on("vclick", ".scoresBtn", function( ev ){
	//clicked the scores button
	//###EVENT FIRING CONTROL SECTION
	//control multiple firing of events
	//$(document).off("vclick", ".scoresBtn");
	//remove dynamic content from other pages
	$("#answerList").remove();
	$("#help").children().remove("#helpList");
	$("#scoretable").children().remove(".ui-grid-b");
	ev.stopPropagation();
	ev.preventDefault();
	if(window.localStorage){
			localStorage.setItem("helppage","0");}
	
	//###END EVENT FIRING CONTROL SECTION
	var scoreSaved;
	if( window.localStorage ){
	//***REQUIREMENT********	
		//check for existing scores, fetch and display them
		//use the ui-grid to display the scores
		//show usernames and scores
		//var html = '<div class="ui-grid-a">';
	//***END REQUIREMENT********	
		
		saveScore();
		
		if(ajaxActive){
			saveScoreRemote(correctAnswers,username);
			buildAjaxScoresPage();
		}
		else
			buildScoresPage();
		
		$.mobile.changePage("#scores","flip",true,false);
	$("#scores").fadeIn('slow');
	$("#play").hide();
	$("#scores").show();

	}
	
});

$(document).on("vclick", ".helpBtn", function( ev ){
	console.log("before building help page");
	
	buildHelpPage();
	//$.mobile.changePage("#help","flip",true,false);
	$.mobile.changePage( "#help", {
            transition: "slide",
            role: "dialog",
            reverse: false,
        });
});


$(document).on("pageshow", "#play", function( ev, ui){
	
	//***REQUIREMENT********	
		//get the username if one doesn't already exist
		//save the username when they click the submit button
		//hide the popup after getting the username
		//$("#userform").popup("close").fadeOut("slow");
	//***END REQUIREMENT********
	
	var thisQuestion=" ";
	numAnswered=0;
	totalQuestions=8;
	numAnswered=0;
	correctAnswers=0;
	incorrectAnswers=0;
	var scoreSaved=false;
	if(window.localStorage){ console.log("hoorayWWWW");
		localStorage.setItem("scoresaved",scoreSaved);
		localStorage.setItem("thisQuestion",thisQuestion);
		localStorage.setItem("numAnswered",numAnswered);
		var now2=JSON.stringify(today);
		var gameUsers=[{"name":"test1","highscore":0,"scores":[], "date":now2,"duration":0}];
		localStorage.setItem("gameusers",JSON.stringify(gameUsers));
		localStorage.setItem("thisQuestion",thisQuestion);
		
		localStorage.setItem("correctAnswers","0");
		localStorage.setItem("incorrectAnswers","0");
		localStorage.setItem("numAnswered","0");
		localStorage.setItem("helppage","0");
		console.log("after storing in local storage");
	}
	else{console.log("sadSADWWWWW"); return;}
	//###EVENT FIRING CONTROL SECTION
	//control multiple firing of events
	//$(document).off("pageshow", "#play");
	//remove dynamic content from other pages
	//$("#answerList").remove();
	$("#scoretable").children().remove(".ui-grid-b");
	$("#help").children().remove("#helpList");
	//$("#help").remove();
	var classAdded="1";
	classAdded=localStorage.getItem("classAdded");
	if(classAdded=="0"){return;}
	//###END EVENT FIRING CONTROL SECTION
	
	
	console.log("getting user name");
	//get the array from localStorage
	var userexists=false;
	var items,s,ss;
	
	if(username == ""){
		$( "#userform" ).popup( "open" );
		
		
			$("#btnSubmit").on("click",  function( ev ){
			//###EVENT FIRING CONTROL SECTION
			$(document).off("click", "#btnSubmit");
			//###END EVENT FIRING CONTROL SECTION
			
			console.log("in button click event");
			
			var pp=$("#username").val();
			username=pp;
		
			var  basescore=0;
			var i;
		
			
			//if( window.localStorage ){
				
				 s=localStorage.getItem("gameusers");
				
			
				if(s!=null ){
					
					ss=JSON.parse(s);
					
					console.log("in button click event checking user name");
					ss.forEach(function(key,value){
					
							if(key.name==username){
								userexists=true;
								
					console.log(key.name);
					console.log(username);
								//if(parseInt(key.highscore)>=basescore)
							/*{basescore=parseInt(key.highscore); console.log(basescore);}
							
							html="<p><label >Welcome  "+key.name+" your highest score is:<label><input type=\"text\" name=\"userscore\" id=\"userscore\" placeholder=\"userscore\" value=\""+key.highscore+"\" readonly=\"true\"/></p>";
							*/
							
							//if(!popupUpdated){
							//$(html).insertAfter("#username").trigger("create",function(ev){
								
								//$(document).on("click", "#btnSubmit");
								//ev.stopPropagation();
								//ev.preventDefault();
								
							//	});//end of nameform trigger
							//	popupUpdated=true;
							//}
							
								
							}//end of found username if
					});//end of forEach for checking user vals
					if(!userexists){
	
						var json={};
						json["name"]=username;
						json["highscore"]=0;
						json["scores"]=[0,0,0,0,0];
						json["date"]=today;
						console.log(ss);
						ss.push(json);
						var sq=JSON.stringify(ss);
						localStorage.setItem("gameusers",sq);
					}//end of !userexists if
				}//end of check for s==null
			//}//end of check for window local storage exists
			
			ev.stopPropagation();
	ev.preventDefault();
	
	/*if(username!="" && popupUpdated){
		
		setTimeout(function(){
			
			$("#userform").popup("close");
		},2000);*/
		
		//}//end of if for setting timeout
	$("#userform").popup("close");
		});//end of event for submit button
		
	}//end of username is null check
	//hide the popup after getting the username

}); //end of page show for play event



function buildQuestions( data ){
	
	//****REQUIREMENTS***********
	//this function runs AFTER the questions script file runs
	//loop through the questions and add the HTML for the questions and answers
	//remember to call trigger("create") after adding the listview
	//*****END REQUIREMENTS ****************

	//######VARIABLES DECLARATIONS#########
	var qlist, quid,aqid,minihtml="", minihtml2="", fancyhtml="";
	var cm=new Array();
	scriptLoaded = true;
	//######END VARIABLES DECLARATIONS#######
	
	//initialize total questions
	totalQuestions=data.questions.length;
	$("#gamearea").clear;
	localStorage.setItem("qidstate","0");
	data.questions.forEach(function(key,value){
		
		//get the answers
		var aaa=key.answer;
		qlist="";
		var qval="q"+value;
		var aval="a"+value;
		 allhtml=new Array();
		
		//store question id and answer id 
		//or put this in local storage
		var aid=key.answer;
		
		cm.push(qval,key.answer);//this is a javascript array pure string
		
	
		key.answers.forEach(function(key,value){
			aqid="aq"+value;
			if(value==aid){cm.push(key);} //this is a javascript array
			
	
			var	quid1="ques"+value;
				quid=quid1+"_"+qval;
	
			
			
		minihtml2=minihtml2+"<li id=\""+quid+"\">"+key+"</li>"
		
		});
		
		minihtml="<ul data=role=\"listview\"  data-theme=\"c\" >"+minihtml2+"</ul>";
		
		minihtml="<li data-role=\"collapsible\" data-theme=\"b\" id=\""+qval+"\" ><h3>Question "+ (value+1) +"</h3>"+key.qtext+"<h3>Choose Answer</h3>"   +minihtml+"</li>";
		
		fancyhtml=fancyhtml+minihtml;
		
		minihtml2="";
		minihtml="";

	});
	
	

	
	var html="<div id=\"questions\" ><h2>Welcome to the Science quiz game</h2><ul data-role=\"listview\" data-theme=\"b\"  >"+fancyhtml+"</ul></div>";
	$(html).insertBefore("#msg").trigger("create");
	

	//store the cm array in localStorage
	
	if( window.localStorage ){
	localStorage.setItem("gameanswers",cm);
	console.log("after storing game answers in local storage");
	}
	$("#gamearea  ul").addClass("questionsList");
	

	
	$(document).on("click", "#questions li", setQuestionId);

}

function setQuestionId( ev ){
	//*****REQUIREMENTS*******
	//jQuery mobile will automatically navigate to the nexted ul
	//we need to set the number for the current question
	//*****END REQUIREMENTS****
	
	//#####EVENT FIRING CONTROL SECTION########
	//$(document).off("click", "#questions li");
	ev.preventDefault();
	ev.stopPropagation();
	var xy = localStorage.getItem("qidstate");
	if(xy=="1"){return};
	//#####END EVENT FIRING CONTROL SECTION########
	
	var qidstate=localStorage.getItem("qidstate");
	if(qidstate=="0"){
	questionId = $(this).attr("id");
	
	qidstate="1";
	localStorage.setItem("qidstate",qidstate);
	}
	
	
	//#######RESTORE STATE FOR THE NEXT QUESTION SECTION
	localStorage.setItem("classAdded","1");
	
	//#######END RESTORE STATE FOR THE NEXT QUESTION SECTION
}

//function for when the user
$(document).on("click", ".questionsList li", function( ev ){
	
	
	
	//******REQUIREMENTS SECTION**************
	//run this code when they click an answer
	//trigger click event for current question
	//to get the question id
	//navigate back to the question list with $.mobile.changePage()
	//disable clicking on the question that was answered
	//update the answer list
	//show the answer status
	//trigger a click to view the correct answer
	//******END REQUIREMENTS SECTION
	
	//#####EVENT FIRING CONTROL SECTION########
	//cannot prevent the second click as it has already gone up the stack
	$(document).unbind("click", $(this))
	ev.preventDefault();
	ev.stopPropagation();
	numAnswered=0;
	correctAnswers=0;
	localStorage.setItem("qidstate","0");
	var classAdded=localStorage.getItem("classAdded");
	if(classAdded=="0"){return;}
	//#####END EVENT FIRING CONTROL SECTION########
	
	//######VARIABLE DEFINITIONS###################
	var scoreSaved;
	//############END VARIABLE DEFINITIONS#############
	
	
	var answerId=$(this).attr("id");
	
	var qidstate=localStorage.getItem("qidstate");
	qidstate="0";
	localStorage.setItem("qidstate",qidstate);
	var getParent=answerId.split("_");
	
	
	//question id is part of the answer id
	var pref=getParent[0];
	var len=pref.length;
	// questionId=pref[0]+pref[(len-1)];
	questionId=getParent[1];
	
	
	numAnswered=0;
	numAnswered++;
	localStorage.setItem("numAnswered",numAnswered)

	//check and count if the answer was correct
	
	var answerStatus=validateAnswer(answerId);
	

	//update the answer list dynamic html
	//updateAnswerList(answerId);
	var correctAnswersString="";
	var incorrectAnswersString="";
	var numAnsweredString="";
	//change the li for the question AND the answer background colour to pass or fail
	if(answerStatus){$("#"+questionId).addClass("right");
		console.log(correctAnswers);
		correctAnswersString=localStorage.getItem("correctAnswers");

		if(correctAnswers==null){ correctAnswers=0;}
		else{correctAnswers=parseInt(correctAnswersString);}
		correctAnswers++;
		console.log("added class right ");
		localStorage.setItem("classAdded","0");
		localStorage.setItem("correctAnswers",correctAnswers.toString());
		incorrectAnswersString=localStorage.getItem("incorrectAnswers");
		incorrectAnswers=parseInt(incorrectAnswersString)
		numAnswered=correctAnswers+incorrectAnswers;
		localStorage.setItem("numAnswered",numAnswered.toString());
	}//add a green class}
	else{$("#"+questionId).addClass("wrong");
		incorrectAnswersString=localStorage.getItem("incorrectAnswers");
		if(incorrectAnswers==null){ incorrectAnswers=0;}
		else{incorrectAnswers=parseInt(incorrectAnswersString);}
		incorrectAnswers++;
		console.log("added class wrong ");
		localStorage.setItem("classAdded","0");
		localStorage.setItem("incorrectAnswers",incorrectAnswers);
		correctAnswersString=localStorage.getItem("correctAnswers");
		correctAnswers=parseInt(correctAnswersString)
		numAnswered=correctAnswers+incorrectAnswers;
		localStorage.setItem("numAnswered",numAnswered.toString());
	}//add a red class
	
	
	//trigger click event
	$("#questions #"+getParent[1]).trigger("click", function(ev){
		ev.stopPropgation();
		return false;
		});
	//###SHOW THE ANSWER FOR THIS QUESTION#####	
	//this is shown through the UpdateAnswerList function
	updateAnswerList(answerId);

	//###KLUTZY WORKAROUND TO HANDLE THIS EVENT FIRING TWICE AND COUNTS#####
	
	numAnsweredString=localStorage.getItem("numAnswered");
	numAnswered=parseInt(numAnsweredString);
	
	correctAnswersString=localStorage.getItem("correctAnswers");
	
	var twicetot=totalQuestions*2;
	
	//update scores ASSIGNMENT PART 2 SAVE SCORES IN THE SERVER
	
	/* dEC11, PART 2 CHANGES BEGIN HERE*/
	if(numAnswered==twicetot){
		saveScore();}
	//###END KLUTZY WORKAROUND TO HANDLE THIS EVENT FIRING TWICE#####
		
	
	
	//###WE ARE SUPPOSED TO SHOW THE SCORES PAGE AND THEN RETURN?#####
	
	$.mobile.changePage("#play");
	
	//###HOUSEKEEPING#####
	currentQuestion="#"+questionId;
	
	$(currentQuestion).addClass(".ui-disabled");
	$(currentQuestion).on("click", function (event, ui) {
    return false;});
	$(currentQuestion).on("tap", function (event, ui) {
    return false;
});

	$(currentQuestion).addClass("fadeText");
	$(currentQuestion + " span").addClass("fadeText");
	$(currentQuestion + "li").addClass("fadeText");
	$(currentQuestion).trigger("collapse");
	
	

	//get the next sequential question id
	var len=currentQuestion.length;
	var nn=parseInt(currentQuestion.substr(2,len-2));
	var newnn=nn+1;
	var nextqid=currentQuestion.substr(0,len-1)+newnn;
	
	qidstate="0";
	
});

function validateAnswer(id){
	console.log("EEEEanswer id is" + id);
	console.log("question id is "+questionId);
	var cmans=localStorage.getItem("gameanswers");
	
	var cmansarray=cmans.split(",");
	console.log(cmansarray);
	var len=cmansarray.length;
	var i=0;
	var indx=0;
	for (i=0;i<len;i++)
	{
		if(cmansarray[i]==questionId){indx=i; i=len;}
	}
	
	var expaid=cmansarray[indx+1];
	console.log(expaid);
	
	if("ques"+cmansarray[indx+1]+"_"+questionId==id){return true;} else {return false;}
}

function updateAnswerList(id){	
	//******VARIABLE DEFINITION SECTION***********
	var answertext;
	var minihtml="",html="";
	//******END VARIABLE DEFINITION SECTION***********
	//#####EVENT FIRING CONTROL SECTION########
	$("#msg").children().remove("#answerList");
	//#####END EVENT FIRING CONTROL SECTION########
	
	//get the value of the answer
	var ansText=getAnswerValue(id);//user answer value
	console.log("XXXX creating answer list ");
	console.log("your answer text is ");
	console.log(ansText);
	
	//get expected answer id
	var cmans=localStorage.getItem("gameanswers");
	
	var cmansarray=cmans.split(",");
	var indx=cmansarray.indexOf(questionId);//answer array
	var aval="a"+questionId[1];
	
	var len=cmansarray[indx+2].length; //get the answer 2 postions down
	var expaid=cmansarray[indx+1];
	//now check the answer switch stack for the answer.
	
	var expansText=cmansarray[indx+2];//expected answer text
	
	//########GET THE CURRENT USER STATUS FROM LOCAL STORAGE
	var numAnsweredString=localStorage.getItem("numAnswered");
	numAnswered=parseInt(numAnsweredString);
	/*var actualNumAnswered=numAnswered/2;*/
	var actualNumAnswered=numAnswered;
	var correctAnswersString=localStorage.getItem("correctAnswers");
	correctAnswers=parseInt(correctAnswersString);
	/*var actualcorrectAnswers=correctAnswers/2;*/
	var actualcorrectAnswers=correctAnswers; 
	//klutzy fix as event fires twice could not fix that as yet
	//########END GET THE CURRENT USER STATUS FROM LOCAL STORAGE
	
	//get the text of the current question
	
	var mm="#"+questionId + " .ui-collapsible-content";
	var questionText=$(mm).text(); //jquery method to extract text
	
	
	minihtml=minihtml+"<div   data-theme=\"b\" id=\""+aval+"\" ><h4>Correct Answer:<span>"+expansText+"</span></h4><p></<p >You answered:<span>"+ansText+"</span> </p><p>Your score so far is "+actualcorrectAnswers.toString()+" out of "+totalQuestions.toString()+"</p></div>";
	
		
	html="<div id=\"answerList\" data-role=\"popup\" class=\"ui-content\" data-position-to=\"window\" data-theme=\"a\"><a href=\"#\" data-rel=\"back\" data-role=\"button\" data-theme=\"a\" data-icon=\"delete\" data-iconpos=\"notext\" class=\"ui-btn-right\">Close</a><h3><a name=\"answerList\">Check Answers<a></h3>"+minihtml+"</div>";
	
	

	$(html).appendTo("#msg").trigger("create",function(ev){
		ev.stopPropagation();
		return false;
		});
	$("#msg").popup();
	$("#msg").popup("open");

}
function getAnswerValue(id)
{
	//** Read the DOM to get the answer text
	answerText=$("#"+id).text();

	return answerText;
}
function saveScore(){
	
	//***********REQUIREMENTS SECTION*************
	//save the users score to localStorage OR to the server via AJAX
	//extract the JSON object from local storage
	//push the new scores in
	//save the current score and username to localStorage
	//add the current score and username to the LISTS in localStorage
	//display the scores from localStorage or via AJAX or via a <script>
	//***********END REQUIREMENTS SECTION*************
	if( window.localStorage ){
		var s=localStorage.getItem("gameusers");
		var ss=JSON.parse(s);
		//get all the scores for this user
		var correctAnswersString=localStorage.getItem("correctAnswers");
		correctAnswers=parseInt(correctAnswersString);

		var len=ss.length;
		var j=0;
		for (i=0;i<len;i++)
		{
			console.log("LLLLL Saving scoresin loop checking name");
			
			if(ss[i].name==username){
				
				console.log(username);
				console.log(ss[i].name);
				
				var n=parseInt(ss[i].highscore);
				console.log(n);
				console.log(correctAnswers);
				
				if (n<correctAnswers)
				{ ss[i].highscore=correctAnswers; console.log("setting high score");}
				for (j=0;j<5;j++){
					console.log(ss[i].scores[j]);
					if (correctAnswers>ss[i].scores[j]){
					ss[i].scores[j]=correctAnswers; j=6;
					//MAKE THE AJAX CALL HERE TO SAVE ON THE SERVER
					saveScoreRemote(correctAnswers);
					}
					else{
						if(correctAnswers>=5){
							ss[i].scores.push(correctAnswers);
							}
						}
				}
				ss[i].scores.sort();
				
				ss[i].date=today;
			}
			
		}

	//convert object back to string and store back in  local storage
	
		localStorage.setItem("gameusers",JSON.stringify(ss));
	
	
		
	}//end window local storage
	
	//jump to the score page with $.mobile.changePage()
	//when the user indicates that they have completed the game
	$.mobile.changePage("#scores");
	
	scoreSaved=true;	
}

function saveScoreRemote(correctAnswers,username){
	
	
	console.log("RRRRRRRRRRRRRRRRRRRbefore making remote call");
	var accountName="dani0004"
	var canswersstring=correctAnswers.toString();
	var scoreAlreadySaved="0";
	if(window.localStorage){
		scoreAlreadySaved=localStorage.getItem("scoreAlreadySaved");
	}
	
	if(scoreAlreadySaved=="0"){
	
	$.ajax({
		url:'set-highscore.php',
		data:'account=dani0004&username='+username+'&score='+canswersstring,
		dataType:"json",
		type:"POST"
	}).done(function(scoreData,textStatus,jqXHR){
		console.log("RRRRRRRRRRRRRRRRRRRbefore done making remote call");
		console.log("the score data is ");
		alert( jqXHR.responseText);
		console.log(scoreData);
		ajaxActive=true;
		
		
	}).fail(function(jqXHR,textStatus,errorThrown){
		//failed to save the score
		console.log("RRRRRRRRRRRRRRRRRRRbefore fail making remote call");
		
		console.log(jqXHR);
		ajaxActive=false;
		console.log("ERR"+errorThrown);
		
		localStorage.setItem("scoreAlreadySaved","1");
	});
	}
}

function buildScoresPage(){
	
	
	if( window.localStorage ){
		var s=localStorage.getItem("gameusers");
		var ss=JSON.parse(s);
	}
	console.log(ss);
	var	html1="",html0="",html3="",min22="";;
	
		var pp1="0",pp2="0",pp3="0",html="",minihtml="",min1="",min2="",min3="";
		var	min1h="<div class=\"ui-block-a headers \"><h3>PLAYER NAMES</h3></div>";
		var	min2h="<div class=\"ui-block-b headers \"><h3>SCORES</h3></div>";
		var	min3h="<div class=\"ui-block-c headers \"><h3>LAST UPDATED DATE</h3></div>";
			html0="<div class=\"ui-grid-b outer\" data-add-back-btn=\"true\">"+min1h+min2h+min3h+"</div>";
			
			ss.forEach(function(key,value){
			min22="";
			len=key.scores.length;
			min1="<div class=\"ui-block-a scgeneral \"><p>"+key.name+"</p></div>";
			for (i=0;i<len;i++){
				if(key.scores[i]>0){
				min22=min22+"<p>"+key.scores[i]+"</p>";
				console.log("checking mini scores");}
			}
			min2="<div class=\"ui-block-b scoring \"><p>"+key.highscore+"</p>"+min22+"</div>";
			min3="<div class=\"ui-block-c scgeneral \"><p>"+key.date+"</p></div>";
	
				html1=html1+"<div class=\"ui-grid-b outer\" data-add-back-btn=\"true\">"+min1+min2+min3+"</div>";
		});
		
		var html3=html0+html1;
		

	$(html3).insertBefore("#recent").trigger("create", function(ev){
		ev.stopPropagation();
		ev.preventDefault();
		});
	console.log("after creating scores page");
	$("#scores").attr("data-add-back-btn",true);
	
	
}



function buildHelpPage(){
	console.log("starting to build help page");
	var mm="";
	if(window.localStorage){
		mm=localStorage.getItem("helppage");
		if(mm==null){localStorage.setItem("helppage","0")}
		if(mm=="1"){return;}
	}
	
	$("#help").children().remove("#helpList");
	
	console.log("after removing help list");
	
			var minihtml1="<li data-role=\"collapsible\" data-theme=\"b\" id=\"h0\" ><h3>Players </h3><p>The game is open to any numer of players</p><p>Only one player may be active at a time as the application is currently saving data locally</p><p>The game is a beta release </p></li><li data-role=\"collapsible\" data-theme=\"b\" id=\"h0\" ><h3>Game Rules </h3><p>Players may answer questions in any order</p><p>Only scores of 5 or greater are stored in the local database (these are called high scores)</p><p>Each answer is worth one point</p><p>A wrong answer is counted as zero</p></li><li data-role=\"collapsible\" data-theme=\"b\" id=\"h0\" ><h3>Scoring </h3><p>Scores for each player together with the last updated date are stored locally</p><p>A user may see a report of all the users and scores </p><p>Unlimited high scores may be stored</p><p>Chrome browser users on PC must maximize the browser window if you observe the scroll bar disappearing </p></li><li data-role=\"collapsible\" data-theme=\"b\" id=\"h0\" ><h3>FAQ </h3></li>";
			
			var minihtml2="<ul data-role=\"listview\" id=\"helpList\"data-theme=\"b\">"+ minihtml1+"</ul>";
			console.log("after creating minihtml2");
		
			
			$(minihtml2).appendTo("#help div:last-child  ").trigger("create",function(ev){
		ev.stopPropagation();
		var pp=ev.isPropagationStopped();
		console.log("stopping create propagation");
		console.log(pp);
		return false;
		
		
	});
	$("#help").prop("data-theme","b");
		$("#help h1").prop("data-theme","b");
		$("#help .ui-dialog-contain").prop("data-theme","b");
		
		if(window.localStorage){
		
		localStorage.setItem("helppage","1");}
		
	
	console.log("backto help click");
}

