<? 

	include("../../lib/conectar.php");
	$a = mysql_query("select * from noticias order by data_cad DESC");
	while($l = mysql_fetch_row($a)){
		echo "<a href=\"ler.php?id=" . $l[0] . "\">" . $l[3] . "</a> - <a href=\"" . $l[5] . "\">" . $l[1] . "</a><br />";
	}

	include("../../lib/desconectar.php");


?>