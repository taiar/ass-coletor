<?php

	require_once ("modulos/rss/rss_fetch.inc");
	require_once ("lib/Util.class.php");

	class stf {

		var $rss;

		function __construct(){
			$this->url = 'http://www.stf.gov.br/noticias/imprensa/xml/rss20.xml';
			$rss = fetch_rss($this->url);

			//indexa título, link e data de publicação
			$this->cont = array();
			$n = 0;
			foreach ($rss->items as $node){
				$this->cont[$n]['titulo'] = $node['title'];
				$this->cont[$n]['link'] = $node['link'];
				$pub = strtotime(Util::subdata($node['pubdate']));
				$this->cont[$n]['data'] = $pub;
				$n++;
			}
		}

		/* Essa função é a que limpa o texto das formatações dos sites e retorna o texto puro */
		function editContents($txt){ 
			$a = explode("<TD class=\"texto\">", $txt);
			$b = explode("</td>", $a[1]);
			$c = str_replace("\t", "", $b[0]);
			$c = str_replace("\n", "", $c);
			$d = ereg_replace("([<div]).*</div><br>", "", $c);
			$d = str_replace("</p><p", "</p>\n<p", $d);
			$d = str_replace("align=\"justify\"", "", $d);
			$d = ereg_replace("(<br><img src).*", "", $d);
			return $d;
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

	//echo stf::editContents(implode("", file('txt')));

//	strtotime("Wed, 27 Jun 2007 08:15 GMT -0300");

?>