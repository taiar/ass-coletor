#!/usr/bin/php
<?php

    echo "Carregando coletor...\n";
    require('./lib/DB.php');
    require('./lib/UTIL.php');
    
    /********

        O proximo passo, depois desse coletor estar implementado, ser� verificar
        a data e hora em que o programa estara sendo executado, antes de fazer a
        varredura pelos servidores atras de informa��o (em certo caso, inutil)

    ********/
    
    echo "Carregando m�dulo Yahoo Finance...\n";
    //carrega o modulo de parser a ser utilizado
    require('./modulos/yahooFinance/parser.class.php');
    $parser = new yahooFinance();
    
    //captura segundo a tabela de tickes
    $db = new DATABASE();
    
    echo "Procurando Tickers a serem pesquisados...\n";
    $tickers = $db->find("select * from ass_tickers");
    
    echo "Come�ando a coleta:\n";
    for ($i = 0; $i < $tickers["total"]; $i++)
    {
        echo "\n\tTicker " . $i . ": " . $tickers["dados"][$i]["ticker"] . " - " . $tickers["dados"][$i]["razao"] . "\n";
        // caso o ticker esteja ligado a uma URL especifica
        if(!empty($tickers["dados"][$i]["link"]))
            $url = $tickers["dados"][$i]["link"];
        else
            $url = "http://finance.yahoo.com/lookup?s=" . $tickers["dados"][$i]["ticker"] . ".SA";
       
       echo "\t\tColetando os dados...";
       $conteudo = UTIL::carregaCont($url);
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
       
       if($db->insert("ass_logs", $ins))
            echo "\t\t\t[  ok  ]\n";
       else
            echo "\t\t\t[  erro  ]\n";
       
       echo "\t\tLimpando buffer...";
       $parser->free();
       echo "\t\t\t[  ok  ]\n";
    }
    
    echo "\n\n\nColeta finalizada!\n\n"

?>
