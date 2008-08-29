<? 

	include("../../lib/conectar.php");
	$a = mysql_query("select * from noticias where id='" . $_GET['id'] . "'");
	while($p = mysql_fetch_array($a)){
		echo "<h1>" . $p['titulo'] . "</h1>" . "<p>" . $p['conteudo'] . "</p>";
	}

	include("../../lib/desconectar.php");


?>