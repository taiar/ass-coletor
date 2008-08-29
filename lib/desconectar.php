<?php

	if(!@mysql_close()){
		echo "Erro: " . mysql_error();
		die();
	}

?>