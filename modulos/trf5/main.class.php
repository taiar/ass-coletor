<?php

	require_once ("modulos/rss/rss_fetch.inc");
	require_once ("lib/Util.class.php");

	//require_once ("../rss/rss_fetch.inc");
	//require_once ("../../lib/Util.class.php");

	class trf5 {

		var $rss;

		function __construct(){
			$this->url = 'http://www.trf5.gov.br/noticias/rss.php';
			$rss = fetch_rss($this->url);

			//indexa título, link e data de publicação
			$this->cont = array();
			$n = 0;
			foreach ($rss->items as $node){
				$this->cont[$n]['titulo'] = $node['title'];
				$this->cont[$n]['link'] = $node['link'];
				$pub = strtotime($node['pubdate']);
				$this->cont[$n]['data'] = $pub;
				$n++;
			}
		}

		/* Essa função é a que limpa o texto das formatações dos sites e retorna o texto puro */
		function editContents($txt){ 
			$a = explode("<td class=\"noticia_paragrafo\" valign=\"top\">", $txt);
			$b = explode("</span><br><br>", $a[1]);
			$c = str_replace("\t", "", $b[0]);
			$c = str_replace("\r\n", "", $c);
			$c = str_replace("class=\"noticia_paragrafo\" align=\"justify\"", "", $c);
			$c = str_replace("<p >", "<p>", $c);
			$c = str_replace("<span style=\"font-family: Arial; font-size: 10px; font-style: italic\">", "", $c);
			$c = str_replace("<p></p>", "", $c);
			return $c;
		}

		//retorna o unixtime da ultima noticia cadastrada
		function getLast(){
			return $this->cont[0]['data'];
		}

		//adiciona as noticias à grade
		function getContents(){
			for($i=0;$i<count($this->cont);$i++){
				$c = Util::carregaCont($this->cont[$i]['link']);
				$c = addslashes($this->editContents($c));
				$this->cont[$i]['conteudo'] = $c;
			}
			return $this->cont;
		}
	}
 
/* 	$stj = new trf5;
	echo "<pre>";
	$stj->getContents();
	echo print_r($stj->cont);
	echo "</pre>"; */

	//echo trf5::editContents(implode("", file('texto.txt')));

//	strtotime("Wed, 27 Jun 2007 08:15 GMT -0300");

?>