<?php
//set-highscore.php
/*CREATE TABLE  `mad9014`.`highscores` (
`score_id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY ,
`account` CHAR( 8 ) NOT NULL ,
`username` VARCHAR( 40 ) NOT NULL ,
`score` SMALLINT NOT NULL
) ENGINE = INNODB CHARACTER SET utf8 COLLATE utf8_general_ci
*/
//session_start();

$dbhost="localhost";
//$dbhost="m.edumedia.ca";
$dbname="mad9014";
$dbuser="mad9014";
$dbpass="4109dam";
$pdo = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);
$pdo->exec("SET NAMES utf8"); 
$pdo->exec("SET CHARACTER SET utf8");
//make sure PHP handles text in utf8
mb_internal_encoding("UTF-8");
mb_http_output( "UTF-8" );
header("Content-Type: application/json");

if( isset($_REQUEST['account']) && isset($_REQUEST['username']) && isset($_REQUEST['score']) && ctype_digit($_REQUEST['score']) ){
	$account = trim($_REQUEST['account']);
	$username = trim($_REQUEST['username']);
	$score = intval($_REQUEST['score']);
	$strSQL = "INSERT INTO highscores(account, username, score) VALUES(?, ?, ?)";
	$rs = $pdo->prepare($strSQL);
	if($rs->execute(array($account, $username, $score))){
		//successfully ran the query
		echo '{"code":0, "message":"Score saved" }';	
	}else{
		//failed to run the query
		echo '{"code":422, "message":"Unable to save the score submission" }';		
	}
}else{
	//invalid request
	echo '{"code":123, "message":"invalid score submission" }';	
}
$pdo = NULL;
exit();
?>