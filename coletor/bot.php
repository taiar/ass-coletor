#!/usr/bin/php
<?php

	/* limpa o maldito CACHE */

	$dir = opendir("./cache/");
	while((false !== ($file = readdir($dir)))){
		if(filetype("./cache/" . $file) !== "dir"){
			unlink("./cache/" . $file);
		}
	}
	echo "Cache limpo!<hr />";
	
	include("lib/conectar.php");

	/*****************************************
	****				STF				******
	******************************************/
 	/* require_once 'modulos/stf/main.class.php';
	$stf = new stf();
	
	//data da ultima noticia cadastrada desse �rg�o.
	$last = implode("", mysql_fetch_row(mysql_query("select data_cad from noticias where orgao='stf' order by data_cad desc limit 1")));
	
	if($stf->getLast()> $last){
		$c = $stf->getContents();
		for($i=0;$i<count($c);$i++){
			if($c[$i]['data'] > $last){
				if(!mysql_query("insert into noticias (orgao, data_cad, titulo, conteudo, url) values ('stf', '" . $c[$i]['data'] . "', '" . $c[$i]['titulo'] . "', '" . $c[$i]['conteudo'] . "', '" . $c[$i]['link'] . "')")){
					echo "Erro <a href=\"" . $c[$i]['link'] . "\">aqui</a>: " . mysql_error();
					die();
				}else{
					echo "STF, ok!
\n";
				}
			}
		}
	}else{
		echo "STF, sem novidades...
\n";
	} */

	/*****************************************
	****				STJ				******
	******************************************/
 	require_once 'modulos/stj/main.class.php';
	$stj = new stj();
	
	//data da ultima noticia cadastrada desse �rg�o.
	$last = implode("", mysql_fetch_row(mysql_query("select data_cad from noticias where orgao='stj' order by data_cad desc limit 1")));
	
	if($stj->getLast()> $last){
		$c = $stj->getContents();
		for($i=0;$i<count($c);$i++){
			if($c[$i]['data'] > $last){
				if(!mysql_query("insert into noticias (orgao, data_cad, titulo, conteudo, url) values ('stj', '" . $c[$i]['data'] . "', '" . $c[$i]['titulo'] . "', '" . $c[$i]['conteudo'] . "', '" . $c[$i]['link'] . "')")){
					echo "Erro <a href=\"" . $c[$i]['link'] . "\">aqui</a>: " . mysql_error();
					die();
				}else{
					echo "STJ, ok!
\n";
				}
			}
		}
	}else{
		echo "STJ, sem novidades...
\n";
	}

	/*****************************************
	****				TST				******
	******************************************/
	require_once 'modulos/tst/main.class.php';
	$tst = new tst();
	$c = $tst->getContents();

	for($i=0;$i<count($c);$i++){
		$q = mysql_query("select count(*) from noticias where url='" . $c[$i]['link'] . "' limit 1");
		$l = mysql_fetch_row($q);
		if($l[0] == 0){
			if(!mysql_query("insert into noticias (orgao, data_cad, titulo, conteudo, url) values ('tst', '" . $c[$i]['data'] . "', '" . $c[$i]['titulo'] . "', '" . $c[$i]['conteudo'] . "', '" . $c[$i]['link'] . "')")){
				echo "Erro <a href=\"" . $c[$i]['link'] . "\">aqui</a>: " . mysql_error();
				die();
			}else{
				echo "TST, ok!
\n";
			}
		}else{
			echo "TST, sem 9-dades...
\n";
		}
	}

	/*****************************************
	****				TRF5				******
	******************************************/
 	require_once 'modulos/trf5/main.class.php';
	$trf5 = new trf5();
	
	//data da ultima noticia cadastrada desse �rg�o.
	$last = implode("", mysql_fetch_row(mysql_query("select data_cad from noticias where orgao='trf5' order by data_cad desc limit 1")));
	
	if($trf5->getLast()> $last){
		$c = $trf5->getContents();
		for($i=0;$i<count($c);$i++){
			if($c[$i]['data'] > $last){
				if(!mysql_query("insert into noticias (orgao, data_cad, titulo, conteudo, url) values ('trf5', '" . $c[$i]['data'] . "', '" . $c[$i]['titulo'] . "', '" . $c[$i]['conteudo'] . "', '" . $c[$i]['link'] . "')")){
					echo "Erro <a href=\"" . $c[$i]['link'] . "\">aqui</a>: " . mysql_error();
					die();
				}else{
					echo "TRF5, ok!
\n";
				}
			}
		}
	}else{
		echo "TRF5, sem novidades...
\n";
	}

	include("lib/desconectar.php");
	//fim
?>
