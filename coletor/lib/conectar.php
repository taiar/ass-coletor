<?php

	require "_config.php";
	
	if(!@mysql_connect($host ,$usr ,$pass )){
		echo "Erro: " . mysql_error();
		die();
	}

	if(!@mysql_select_db($db)){
		echo "Erro: " . mysql_error();
		die();
	}

?>