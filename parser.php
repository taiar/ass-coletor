#!/usr/bin/php
<?

    include('./lib/Util.class.php');
    
    //$url = "http://finance.yahoo.com/q?s=VALE3.SA";
    $url = "http://localhost/q.html";
    
    $a = Util::carregaCont($url); 
    
    $a = explode("<table id=\"table1\"><tbody><tr><td class=\"yfnc_tablehead1\" width=\"48%\">", $a);
    $a = $a[1];
    
    $a = explode("</td></tr></tbody></table></div><div class=\"ft\"><div id=\"ecn_warning\">", $a);
    $a = $a[0];

    $a = str_replace("</tr>", "\n", $a);
    $a = strip_tags($a);
    $a = explode("\n", $a);
    
    for ($i = 0; $i < count($a); $i++)
        echo "Linha " . $i . ": " . $a[$i] . "\n";
    

?>
