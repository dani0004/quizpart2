// JavaScript Document

//global variable declarations
var username = "";
var userscore = 0;
var scriptFileName = "capital-json.js";
var scriptLoaded = false;
var questionId = "";
var numAnswered = 0;
var totalQuestions = 5;
var correctAnswers = 0;
var incorrectAnswers = 0;
var today = new Date();
today = today.toLocaleDateString();



var popupUpdated=false;
$(document).bind("mobileinit", function(){
	//set any settings 
	//gray out inactive playlists
	var mm=localStorage.getItem("gameusers");
	if(mm==null){
	//create a new JSON object to hold the users and their scores
	//get the current date
	//*************STATE VARIABLES*******************
	var scoreSaved=false;
	localStorage.setItem("scoresaved",scoreSaved);
	var thisQuestion=" ";
	localStorage.setItem("thisQuestion",thisQuestion);
	localStorage.setItem("numAnswered",numAnswered);
	//******END STATE VARIABLES ************************
	 //*************USER SCORE STATE*******************
	var now = new Date();
	
	var now2=JSON.stringify(now);
	
		
	var gameUsers=[{"name":"test1","highscore":0,"scores":[], "date":now2,"duration":0}];
	localStorage.setItem("gameusers",JSON.stringify(gameUsers));
	console.log("after storing in local storage");
	//*************END USER SCORE STATE*******************
	}
	
	totalQuestions=5;
	numAnswered=0;
	correctAnswers=0;
	incorrectAnswers=0;
	$.mobile.initializePage =true; //auto initialize
	$.support.cors = true;
	$.mobile.allowCrossDomainPages = true;
	
});



$(document).on("click", ".playBtn", function( ev ){
	//clicked or tapped the play button from any screen
	//###EVENT FIRING CONTROL SECTION
	console.log("starting PLAY");
	$("#answerList").remove();
	//$("#gamearea").children().remove("ul");
	$("#scoretable").children().remove(".ui-grid-b");
	//###END EVENT FIRING CONTROL SECTION
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
	//$(document).on("vclick", ".scoresBtn");
	console.log("BEFORE SHOWING PAGE");
	//$.mobile.showPageLoadingMsg("b", "This is only a test", true);
	//$(".scoresBtn").bind("vclick"); //scores btn click evnt needs to be enabled here!!
	$("#scores").hide();
	$.mobile.changePage("#play","slide",true,false);
	$("#play").show();
	
});

 

$(document).on("vclick", ".scoresBtn", function( ev ){
	//clicked the scores button
	//###EVENT FIRING CONTROL SECTION
	//control multiple firing of events
	$(document).off("vclick", ".scoresBtn");
	//remove dynamic content from other pages
	$("#answerList").remove();
	
	$("#scoretable").children().remove(".ui-grid-b");
	ev.stopPropagation();
	ev.preventDefault();
	//$("#help").remove();
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
		
		buildScoresPage();
		
		$.mobile.changePage("#scores","flip",true,false);
	$("#scores").fadeIn('slow');
	$("#play").hide();
	$("#scores").show();

	}
	
});

$(document).on("vclick", ".helpBtn", function( ev ){
	//clicked the help button
	//extra script for that could go here
	ev.stopPropagation();
	//ev.preventDefault();
	$.mobile.changePage("#help","flip",true,false);
	$("#scores").fadeIn('slow');
});


$(document).on("pageshow", "#play", function( ev, ui){
	
	//***REQUIREMENT********	
		//get the username if one doesn't already exist
		//save the username when they click the submit button
		//hide the popup after getting the username
		//$("#userform").popup("close").fadeOut("slow");
	//***END REQUIREMENT********
	
	//###EVENT FIRING CONTROL SECTION
	//control multiple firing of events
	$(document).off("pageshow", "#play");
	//remove dynamic content from other pages
	//$("#answerList").remove();
	$("#scoretable").children().remove(".ui-grid-b");
	//$("#help").remove();
	//###END EVENT FIRING CONTROL SECTION
	
	
	console.log("getting user name");
	//get the array from localStorage
	var userexists=false;
	var items,s,ss;
	
	if(username == ""){
		$( "#userform" ).popup( "open" );
		
		//$(document).on("click", "#btnSubmit", function( ev ){
			$("#btnSubmit").on("click",  function( ev ){
			//###EVENT FIRING CONTROL SECTION
			$(document).off("click", "#btnSubmit");
			//###END EVENT FIRING CONTROL SECTION
			
			console.log("in button click event");
			
			var pp=$("#username").val();
			username=pp;
			console.log("user name is");
			console.log(pp);
			
			var  basescore=0;
			var i;
			
			
			
			
			console.log("checking local storage");
			
			//if( window.localStorage ){
				
				 s=localStorage.getItem("gameusers");
				
				//first check if name is in local storage
				//var mm=localStorage.getItem("gameusers");
				if(s!=null ){
					
					ss=JSON.parse(s);
					
					
					ss.forEach(function(key,value){
					
							if(key.name==username){
								userexists=true;
								console.log("EEEEEXXXss equals user name");
					console.log(key.name);
					console.log(username);
								if(parseInt(key.highscore)>=basescore)
							{basescore=parseInt(key.highscore); console.log(basescore);}
							
							html="<p><label >Welcome back "+key.name+" your highest score is:<label><input type=\"text\" name=\"userscore\" id=\"userscore\" placeholder=\"userscore\" value=\""+key.highscore+"\" readonly=\"true\"/></p>";
							
							
							if(!popupUpdated){
							$(html).insertAfter("#username").trigger("create",function(ev){
								
								$(document).on("click", "#btnSubmit");
								ev.stopPropagation();
								ev.preventDefault();
								
								});//end of nameform trigger
								popupUpdated=true;
							}
							
								console.log("ZZZZZZZZZZZ after trigger create");
								
								
								//need to set condition for loop break here
							}//end of found username if
					});//end of forEach for checking user vals
					if(!userexists){
	
						var json={};
						json["name"]=username;
						json["highscore"]=0;
						json["scores"]=[0,0,0,0,0];
						json["date"]=JSON.stringify(new Date());
						console.log(ss);
						ss.push(json);
						var sq=JSON.stringify(ss);
						localStorage.setItem("gameusers",sq);
					}//end of !userexists if
				}//end of check for s==null
			//}//end of check for window local storage exists
			
			ev.stopPropagation();
	ev.preventDefault();
	
	if(username!="" && popupUpdated){
		
		setTimeout(function(){
			
			$("#userform").popup("close");
		},2000);
		
		}//end of if for setting timeout
	
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
		
		//store question id and answer id in a temporary array
		//or put this in local storage
		var aid=key.answer;
		
		cm.push(qval,key.answer);//this is a javascript array pure string
		console.log("capturing cm");
		console.log(cm);
	
		key.answers.forEach(function(key,value){
			aqid="aq"+value;
			if(value==aid){cm.push(key);} //this is a javascript array
			
	
			var	quid1="ques"+value;
				quid=quid1+"_"+qval;
			minihtml2=minihtml2+"<input id=\""+quid+"\" type=\"radio\" name=\""+qval+"\" value=\""+quid1+"\" data-theme=\"b\" ><label for \""+quid+"\">"+key+"</label>";	
			
			
		
		
		});
		//minihtml="<ul data=role=\"listview\"  class=\"ui-listview\" data-theme=\"c\" ><li><fieldset data-role=\"controlgroup\" data-type=\"horizontal\" data-role=\"none\"  >"+minihtml2+"</fieldset></li></ul>";
		minihtml="<ul data=role=\"listview\"  class=\"ui-listview\" data-theme=\"c\" ><li><fieldset  data-type=\"horizontal\" data-role=\"none\"  >"+minihtml2+"</fieldset></li></ul>";
		
		minihtml="<li data-role=\"collapsible\" data-theme=\"b\" id=\""+qval+"\" ><h3>Question "+ (value+1) +"</h3>"+key.qtext+"<h3>Choose Answer</h3>"   +minihtml+"</li>";
		
		fancyhtml=fancyhtml+minihtml;
		
		minihtml2="";
		minihtml="";

	});
	
	

	//var html="<div data-role=\"fieldcontain\"><h2>Welcome to the Science quiz game</h2><ul data-role=\"listview\" data-theme=\"b\" id=\"questions\" >"+fancyhtml+"</ul></div>";
	var html="<div data-role=\"none\"><h2>Welcome to the Science quiz game</h2><ul data-role=\"listview\" data-theme=\"b\" id=\"questions\" >"+fancyhtml+"</ul></div>";
	$(html).insertBefore("#msg").trigger("create");
	$("#gamearea input[type='radio']").prop("checked",false).checkboxradio("refresh").trigger("create");
	
	//$("#gamearea input[type='radio']").checkboxradio("enable").checkboxradio("refresh").trigger("create");
	
	console.log("before building answers");

	
	//store the cm array in localStorage
	
	if( window.localStorage ){
	localStorage.setItem("gameanswers",cm);
	console.log("after storing game answers in local storage");
	}
	$("#gamearea  ul").addClass("questionsList");
	//buildAnswers();

	
	$(document).on("click", "#questions li", setQuestionId);

}


function buildQuestionsxx( data ){
	
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
		
		//store question id and answer id in a temporary array
		//or put this in local storage
		var aid=key.answer;
		
		cm.push(qval,key.answer);//this is a javascript array pure string
		console.log("capturing cm");
		console.log(cm);
	
		key.answers.forEach(function(key,value){
			aqid="aq"+value;
			if(value==aid){cm.push(key);} //this is a javascript array
			
	
			var	quid1="ques"+value;
				quid=quid1+"_"+qval;
			minihtml2=minihtml2+"<input id=\""+quid+"\" type=\"radio\" name=\""+qval+"\" value=\""+quid1+"\" data-theme=\"b\" ><label for=\""+quid+"\">"+key+"</label>";	
			
			
		
		
		});
		minihtml="<div data-role=\"fieldcontain\"><fieldset data-role=\"controlgroup\" data-type=\"horizontal\" data-role=\"fieldcontain\"  >"+minihtml2+"</fieldset><div>";
	minihtml="<div data-role=\"fieldcontain\"><fieldset data-role=\"none\" data-type=\"horizontal\"   >"+minihtml2+"</fieldset><div>";	
		
		minihtml="<li data-role=\"collapsible\" data-theme=\"b\" id=\""+qval+"\" ><h3>Question "+ (value+1) +"</h3>"+key.qtext+"<h3>Choose Answer</h3>"   +minihtml+"</li>";
		
		fancyhtml=fancyhtml+minihtml;
		
		minihtml2="";
		minihtml="";

	});
	
	

	var html="<div ><h2>Welcome to the Science quiz game</h2><ul data-role=\"listview\" data-theme=\"b\" id=\"questions\" >"+fancyhtml+"</ul></div>";
	$(html).insertBefore("#msg").trigger("create");
	
	console.log("before building answers");

	
	//store the cm array in localStorage
	
	if( window.localStorage ){
	localStorage.setItem("gameanswers",cm);
	console.log("after storing game answers in local storage");
	}
	$("#gamearea  ul").addClass("questionsList");
	//buildAnswers();

	
	$(document).on("click", "#questions li", setQuestionId);

}
/**
Build the specific answer dynamically
**/
function buildAnswers(){
	//see update answer list
	console.log("DDDDDDstarting to build answer list");
	//##########EVENT FIRING CONTROL SECTION############
	//$("#gamearea").children().remove("#answerList");
	//##########END EVENT FIRING CONTROL SECTION############
	if( window.localStorage ){
	var cmans=localStorage.getItem("gameanswers");
	
	}//end of if for local storage
	
	var cmansarray=cmans.split(",");

	var answertext;


	var html="";
	var i=0,len=0;
	len=cmansarray.length;
	console.log(cmansarray);
	
	var aval="the answer is ";
	var qtext="";
	var correctans=""
	minihtml="";
	console.log("before loop ");
	var aid="",ll;
	for (i=0;i<len;i+=3)
	{
		
		
		ll=cmansarray[i].length;
		//if(ll==2 && (cmansarray[i][0]=='q') ){
		aid="aval"+cmansarray[i].substr(1,1);//}
		qtext=$("#"+cmansarray[i]).text();
		
		minihtml=minihtml+"<div  data-theme=\"b\" id=\""+aid+"\" ><h4>Correct Answer:<span>"+cmansarray[i+2]+"</span></h4><p></<p >You answered: </p> <p></p></div>";	
		
	}//end of for loop for cmans array

html="<div id=\"answerList\"><h3><a name=\"answerList\">Answer List:<a></h3><div  data-theme=\"a\">"+minihtml+"</div></div>";

	$(html).insertBefore("#msg").trigger("create");
	html="";
	//fade the answers out
	//$("#answerList").hide();
	$("#answerList #aval0").fadeOut();
	
	console.log("DDDDDD end creating answerlist");
	
}
function buildAnswers3(){
	//see update answer list
	console.log("DDDDDDstarting to build answer list");
	//##########EVENT FIRING CONTROL SECTION############
	//$("#gamearea").children().remove("#answerList");
	//##########END EVENT FIRING CONTROL SECTION############
	if( window.localStorage ){
	var cmans=localStorage.getItem("gameanswers");
	
	}//end of if for local storage
	
	var cmansarray=cmans.split(",");

	var answertext;


	var html="";
	var i=0,len=0;
	len=cmansarray.length;
	console.log(cmansarray);
	
	var aval="the answer is ";
	var qtext="";
	var correctans=""
	minihtml="";
	console.log("before loop ");
	var aid="",ll;
	for (i=0;i<len;i+=3)
	{
		
		
		ll=cmansarray[i].length;
		//if(ll==2 && (cmansarray[i][0]=='q') ){
		aid="aval"+cmansarray[i].substr(1,1);//}
		qtext=$("#"+cmansarray[i]).text();
		
		minihtml=minihtml+"<li  data-theme=\"b\" id=\""+aid+"\" ><h4>Correct Answer:<span>"+cmansarray[i+2]+"</span></h4><p></<p >You answered: </p> <p></p></li>";	
		
	}//end of for loop for cmans array

html="<div id=\"answerList\"><h3><a name=\"answerList\">Answer List:<a></h3><ul data-role=\"listview\" data-theme=\"a\">"+minihtml+"</ul></div>";

	$(html).insertBefore("#msg").trigger("create");
	html="";
	//fade the answers out
	//$("#answerList").hide();
	$("#answerList #aval0").fadeOut();
	
	console.log("DDDDDD end creating answerlist");
	
}
function buildAnswers2(){
	//see update answer list
	if( window.localStorage ){
	var cmans=localStorage.getItem("gameanswers");
	
	}
	
	var cmansarray=cmans.split(",");

	var answertext;


	var html="";
	var i=0,len=0;
	len=cmansarray.length;
	
	var aval="the answer is ";
	var qtext="";
	var correctans=""
	minihtml="";
	console.log("before loop ");
	var aid="",ll;
	for (i=0;i<len;i+=3)
	{
		
		
		ll=cmansarray[i].length;
		//if(ll==2 && (cmansarray[i][0]=='q') ){
		aid="aval"+cmansarray[i].substr(1,1);//}
		qtext=$("#"+cmansarray[i]).text();
		
			
		minihtml=minihtml+"<li data-role=\"collapsible\" data-theme=\"b\" id=\""+aid+"\" ><h4>"+qtext+"</h4><p >You answered: </p><input type=\"text\" id=\"cor"+i+"\"><p>Correct answer: </p><input type=\"text\" value=\"" +cmansarray[i+2]+"\"><p>Score: </p><input type=\"text\" value=\"0\" id=\"run"+i+"\"><p>Total Score: </p><input type=\"text\" value=\"0 \" id=\"tot"+i+"\" ></li>";
	}
	
html="<div id=\"answerList\"><h3><a name=\"answerList\">Answer List:<a></h3><ul data-role=\"listview\" data-theme=\"a\">"+minihtml+"</ul></div>";

	$(html).insertBefore("#msg").trigger("create");
	html="";
	//fade the answers out
	//$("#answerList").hide();
	
	console.log("UUUUU end creating answerlist");
	
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
	//#####END EVENT FIRING CONTROL SECTION########
	
	var qidstate=localStorage.getItem("qidstate");
	if(qidstate=="0"){
	questionId = $(this).attr("id");
	qidstate="1";
	localStorage.setItem("qidstate",qidstate);
	}
	console.log("RRRRRRRRRsetting question id is");
	console.log(questionId);
	
}

//function for when the user
//$(document).on("click", ".questionsList input", function( ev ){
$(document).bind("click", "input[type='radio']",function(ev, ui){	
	
	
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
	//#####END EVENT FIRING CONTROL SECTION########
	console.log("GGGGgetting this");
	
	var xx=$(this).attr("id");
	console.log($(this));
	
	$("input[type='radio']").attr("checked",true).checkboxradio("refresh");
	$("input[type='radio']").attr("data-theme","c").trigger("create");
	//answerText=$('label [for= "ques0_q0"]').text();
	
	 var radioElements = document.getElementsByName("q0");
	 console.log(radioElements);
    for(var i = 0; i < radioElements.length; i++){
        if(radioElements[i].checked == true){
             //do something
			 console.log("found it@@@@@@@@@ checked");
			 console.log(radioElements[i]);
			
				  var pp=$(radioElements[i]).val();
				  var pp1=$(radioElements[i]).prop("name");
				  var pp2=$(radioElements[i]).prop("id");
				// $("label [for=\""+pp1+"\"]").addClass("red").checkboxradio("refresh");
				//  $("label [for='ques3_q0'] .ui-btn-inner").addClass("right").trigger("create");
				 console.log($(radioElements[i]));
			 console.log(pp);
			 console.log(pp1);
			 console.log(pp2);
			
        }
        else{
            console.log("not found it@@@@@@@@@");
			//radioElements[i].checked=true;
			//$(radioElements[i]).checkboxradio("refresh");
        }
    }
	
	
	var scoreSaved;
	//answerId = $('input [type=\"radio\"']).attr("name");
	//answerId =("input[type='radio']:checked").val();
	//answerId=("input[name=\""+questionId+"\" :checked").val();
	//console.log(answerId);
	
	console.log("JJJJJJJHandling questions input");
	var qidstate=localStorage.getItem("qidstate");
	qidstate="0";
	localStorage.setItem("qidstate",qidstate);
	//var getParent=answerId.split("_");
//	console.log("JJJJJJget parent is");
//	console.log(getParent);
	//console.log(answerId);
	//$("#questions li").trigger("click"); //need to trigger click on specific li
	
	//$("#questions #"+getParent[1]).trigger("click");
	
	//increment the number of questions answered
	
	numAnswered=localStorage.getItem("numAnswered");
	numAnswered++;
	localStorage.setItem("numAnswered",numAnswered)
	
	console.log("!!!number answered id is "+numAnswered);
	
	//check and count if the answer was correct
	
	var answerStatus=validateAnswer(answerId);
	
	
	console.log("!!!question id is "+questionId);
	
	//update the answer list dynamic html
	updateAnswerList(answerId);
	//change the li for the question AND the answer background colour to pass or fail
	if(answerStatus){$("#"+questionId).addClass("right");correctAnswers+=1;console.log("added class right ");}//add a green class}
	else{$("#"+questionId).addClass("wrong");incorrectAnswers+=1;console.log("added class wrong ");}//add a red class
	
	//###SHOW THE ANSWER FOR THIS QUESTION#####	
	//("#a"+questionId[1]).show();
	console.log("QQQQQQQQQbefore showing answer list");
	$.mobile.changePage("#answerList");
	$("#answerList").fadeIn('slow');
	//("#a"+questionId[1]).show();
	console.log("QQQQQQQQQchecking answer list");
	//###KLUTZY WORKAROUND TO HANDLE THIS EVENT FIRING TWICE#####
	var twicetot=totalQuestions*2;
	//update scores
	if(numAnswered==twicetot){
		saveScore();}
	
		
	
	
	//###WE ARE SUPPOSED TO SHOW THE SCORES PAGE AND THEN RETURN?#####
	
	$.mobile.changePage("#play");
	
	//###HOUSEKEEPING#####
	currentQuestion="#"+questionId;
	
	$(currentQuestion).addClass(".ui-disabled");
	
	$(currentQuestion).trigger("collapse");
	
	$(currentQuestion+" input[type='radio']").checkboxradio("disable").checkboxradio("refresh");

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
		if(cmansarray[i]==questionId){indx=i; break;}
	}
	
	var expaid=cmansarray[indx+1];
	
	if("ques"+cmansarray[indx+1]+"_"+questionId==id){return true;} else {return false;}
}
function updateAnswerList(id){	
	//******VARIABLE DEFINITION SECTION***********
	var answertext;
	var minihtml="",html="";
	//******END VARIABLE DEFINITION SECTION***********
	//#####EVENT FIRING CONTROL SECTION########
	$("#gamearea").children().remove("#answerList");
	//#####END EVENT FIRING CONTROL SECTION########
	
	//get the value of the answer
	var ansText=getAnswerValue(id);//user answer value
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
	
	//get the text of the current question
	var questionText=$("#"+questionId).text(); //jquery method to extract text
	
	console.log(questionText);
	
	minihtml=minihtml+"<div  data-theme=\"b\" id=\""+aval+"\" ><h4>Correct Answer:<span>"+ +expansText+"</span></h4><p></<p >You answered: </p>"+ansText+" <p></p></div>";
	
	html="<div id=\"answerList\"><h3><a name=\"answerList\">Answer List:<a></h3><div  data-theme=\"a\">"+minihtml+"</div></div>";

	$(html).insertBefore("#msg").trigger("create");


}
function getAnswerValue(id)
{
	//** Read the DOM to get the answer text
	console.log("FFFgetting answer text" + id);
	var answerText="";
	var cc=id.split("_");
	console.log("cc is" + cc[0]);
	
	answerText=$('label [for= "ques0_q0"]').text();
	console.log(answerText);
	//answerText=$('label [for=\"'+id+'\"]').html();
	/*switch(cc[0])
	{
		case"ques0":
		answerText=$('label[for="ques0_q0"]').html();
		console.log(answerText);
		break;
		case"ques1":
		answerText=$('label[for="ques1_q0"]').html();
		console.log(answerText);
		break;
		case "ques2":
		answerText=$('label[for="ques2_q0"]').html();
		console.log(answerText);
		break;
		case "ques3":
		answerText=$('label[for="ques3_q0"]').html();
		console.log(answerText);
		break;
		default:
	}*/
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

		var len=ss.length;
		var j=0;
		for (i=0;i<len;i++)
		{
			console.log("in loop checking name");
			
			if(ss[i].name==username){
				
				console.log("correct answers value");
				console.log(correctAnswers);
				console.log(ss[i].highscore);
				var n=parseInt(ss[i].highscore);
				console.log(n);
				if (n<correctAnswers)
				{ ss[i].highscore=correctAnswers; console.log("setting high score");}
				for (j=0;j<5;j++){
					console.log("in j loop");
					console.log(j);
					console.log(ss[i].scores[j]);
					if (correctAnswers>ss[i].scores[j]){
					ss[i].scores[j]=correctAnswers; j=6;
					}
				}
				ss[i].scores.sort();
				console.log(ss[i].scores);
				console.log("after sorting scores");
				console.log(ss[i].highscore);
				ss[i].date=new Date();
			}
			
		}

	//convert object back to string and store back in  local storage
	console.log("storing back");
		localStorage.setItem("gameusers",JSON.stringify(ss));
	
	
		
	}//end window local storage
	
	//jump to the score page with $.mobile.changePage()
	//when the user indicates that they have completed the game
	$.mobile.changePage("#scores");
	
	scoreSaved=true;	
}

function buildScoresPage(){
	
	
	if( window.localStorage ){
		var s=localStorage.getItem("gameusers");
		var ss=JSON.parse(s);
	}
	console.log(ss);
	
		var pp1="0",pp2="0",pp3="0",html="",minihtml="",min1="",min2="",min3="";
		
	
			ss.forEach(function(key,value){
			
			if(value==0){
		
			
			min1="<div class=\"headers \">PLAYER NAMES</div>";
			min2="<div class=\"headers \">SCORES</div>";
			min3="<div class=\"headers \">DATE</div>";	
			}
			
			min1=min1+"<div class=\"init \"><p class=\"scnames\">"+key.name+"</p></div>";
			min2=min2+"<div class=\"init \"><p class=\"scoring\">"+key.highscore+"</p></div>";
			min3=min3+"<div class=\"init \"><p class=\"scnames\">"+key.date+"</p></div>";
			
		
			
			
		});
		
		var min11="<div class=\"ui-block-a scgeneral\">"+min1+"</div>";
		var min21="<div class=\"ui-block-b scgeneral\">"+min2+"</div>";
		var min31="<div class=\"ui-block-c scgeneral\">"+min3+"</div>";
		
		html="<div class=\"ui-grid-b outer\" data-add-back-btn=\"true\">"+min11+min21+min31+"</div><!-- /grid-b -->";

	
	
	$(html).insertBefore("#recent").trigger("create", function(ev){
		ev.stopPropagation();
		ev.preventDefault();
		});
	console.log("after creating scores page");
	$("#scores").attr("data-add-back-btn",true);
	
	
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
	
	//$(scoresHtml).appendTo(".ui-block-a ul").trigger("create");
	console.log("after creating help page");
	
	
	
}

