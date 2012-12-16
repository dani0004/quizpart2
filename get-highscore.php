<?php
//get-highscore.php
/*CREATE TABLE  `mad9014`.`highscores` (
`score_id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY ,
`account` CHAR( 8 ) NOT NULL ,
`username` VARCHAR( 40 ) NOT NULL ,
`score` SMALLINT NOT NULL
) ENGINE = INNODB CHARACTER SET utf8 COLLATE utf8_general_ci
*/
//session_start();

//$dbhost="localhost";
$dbhost="m.edumedia.ca";
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

if( isset($_REQUEST['account']) && strlen($_REQUEST['account'])==8 ){
	$account = trim($_REQUEST['account']);
	
	$strSQL = "SELECT username, score 
						FROM highscores 
						WHERE account=?
						ORDER BY score DESC";
	$rs = $pdo->prepare($strSQL);
	if($rs->execute(array($account)) && $rs->rowCount() > 0 ){
		//successfully ran the query so return the scores as an array
		$numScores = $rs->rowCount();
		echo '{"code":0, "message":"' . $numScores . ' scores found", "scores":[ ';
		$scoreArr = array();
		while($row = $rs->fetch() ){
			$scoreArr[] = '{"username":"' . $row['username'] . '", "score":' . $row['score'] . ' }';
		}
		echo implode(', ', $scoreArr );
		echo ']}';	
	}else{
		//failed to run the query
		echo '{"code":522, "message":"No scores found" }';		
	}
}else{
	//invalid request
	echo '{"code":145, "message":"Invalid account request" }';	
}
$pdo = NULL;
exit();
?>