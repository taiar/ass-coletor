#!/usr/bin/php
<?php

    require('./lib/DB.php');
    require('./lib/UTIL.php');
    
    $db = new DATABASE();
    
    $arr = file("../docs/acoes.txt");
    $arr = explode("-", $arr[0]);
    
    for ($i = 0; $i < count($arr); $i++)
    {
        $ins = array(
            "id" => "",
            "ticker" => $arr[$i],
            "razao" => "sem nome",
            "link" => ""
        );

        $db->insert("ass_tickers", $ins);

    }

?>
