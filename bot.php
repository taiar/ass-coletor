#!/usr/bin/php
<?php

    echo "Carregando coletor...\n";

    require('./lib/DB.php');
    require('./lib/UTIL.php');
    require('./lib/TIME.php');
    require('./lib/FECHAMENTO.php');
    
	$db = new DATABASE();
	$closes = new FECHAMENTO($db);
    
    echo "Verificando expediente dos pregões...\n";
    $time = new TIME(UTIL::hora());
    if(!$time->valid())
    {
    	echo "Fora de expediente.\n";
    	echo "Verificando se houve fechamento do dia.\n";
    	if($closes->got_closed())
    	{
    		echo "O fechamento diário já foi feito...\n";
    		echo "Nada pra fazer... zzZzZzZzZzZzZzzz.......\n\n";
    	}else{
    		//Faz o fechamento do dia
    	}
    }
   	else
   	{
   	
   		echo "Expediente válido! Começar coleta!\n";
   	
		echo "Carregando módulo Yahoo Finance...\n";
		//carrega o modulo de parser a ser utilizado
		require('./modulos/yahooFinance/parser.class.php');
		$parser = new yahooFinance();
		
		//captura segundo a tabela de tickers
		echo "Procurando Tickers a ser pesquisados...\n";
		$tickers = $db->find("select * from ass_tickers");
		
		echo "Começando a coleta:\n";
		for ($i = 0; $i < $tickers["total"]; $i++)
		{
		    // caso o ticker esteja ligado a uma URL especifica
		    if(!empty($tickers["dados"][$i]["link"]))
		        $url = $tickers["dados"][$i]["link"];
		    else
		        $url = "http://finance.yahoo.com/q?s=" . $tickers["dados"][$i]["ticker"] . ".SA";

		    echo "\n\tTicker " . $i . ": " . $tickers["dados"][$i]["ticker"] . " - " . $tickers["dados"][$i]["razao"] . " (" . $url . ")\n";

		   echo "\t\tColetando os dados...";
		   $conteudo = UTIL::carregaCont($url);
		   if(!$conteudo)
		   {
		   		echo "\n\nERRO: PHP_CURL não está instalado...\n";
		   		die();
		   }		   
		   echo "\t\t\t[  ok  ]\n";

		   echo "\t\tIniciando o parsing dos dados...";
		   $parser->parse($conteudo);
		   echo "\t[  ok  ]\n";

		   echo "\t\tArmazenando dados...";
		   $ins = array(
		        "id"            => "",
		        "ticker_id"     => $tickers["dados"][$i]["id"],
		        "data"          => UTIL::hora(),
		        "valor"         => $parser->dados[0]
		   );
		   
		   echo "\n\n------------------->> " . $parser->dados[0] . "\n\n";
		   
		   if($db->insert("ass_logs", $ins))
		        echo "\t\t\t[  ok  ]\n" . mysql_error();
		   else
		        echo "\t\t\t[  erro  ]\n";
		   
		   echo "\t\tLimpando buffer...";
		   $parser->free();
		   echo "\t\t\t[  ok  ]\n";
		}
		
		echo "\n\n\nColeta finalizada!\n\n";

	}

?>
