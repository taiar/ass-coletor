<?php

	//require_once ("modulos/rss/rss_fetch.inc");
	//require_once ("lib/Util.class.php");

	require_once ("../rss/rss_fetch.inc");
	require_once ("../../lib/Util.class.php");

	class tjrs {

		var $rss;

		function __construct(){
			$this->url = 'http://www.tj.rs.gov.br/site_php/noticias/news_rss.php';
			$rss = fetch_rss($this->url);

			//indexa título, link e data de publicação
			$this->cont = array();
			$n = 0;
			foreach ($rss->items as $node){
				$quebra = explode(" - ", $node['title']);
				$this->cont[$n]['titulo'] = $quebra[1];
				$this->cont[$n]['link'] = $node['link'];
				$pub = $this->editData($quebra[0]);
				$this->cont[$n]['data'] = $pub;
				$n++;
			}
		}

		/* Essa função é a que limpa o texto das formatações dos sites e retorna o texto puro */
		function editContents($txt){ 
			$a = explode("<span class=texto_geral>", $txt);
			$b = explode("</span>", $a[1]);
			$c = str_replace("\t", "", $b[0]);
			$c = str_replace("\r\n", "", $c);
			$c = str_replace("<HR>", "", $c);
			$c = str_replace("<hr>", "", $c);
			$c = ereg_replace("<P align=center><EM><FONT face=Arial size=2>EXPEDIENTE.*", "", $c);
			$c = ereg_replace("<P align=center><B><FONT face=Arial size=3>.*</FONT></B></P>", "", $c);
			$c = str_replace("<P></P>", "", $c);
			return $c;
		}

		//retorna o unixtime da ultima noticia cadastrada
		function getLast(){
			return $this->cont[0]['data'];
		}

		// edita a data
		function editData($source){
			$d = explode(" ", $source);
			$dma = explode("/", $d[0]);
			$hm = explode(":", $d[1]);
			$data = mktime($hm[0], $hm[1], 0, $dma[1], $dma[0], $dma[2]);
			return $data;
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

 	$stj = new tjrs;
	$stj->getContents();
	echo print_r($stj->cont);

	//echo tjrs::editContents(implode("", file('txt')));

//	strtotime("Wed, 27 Jun 2007 08:15 GMT -0300");

?>