<?php

	require_once ("modulos/rss/rss_fetch.inc");
	require_once ("lib/Util.class.php");

	//require_once ("../rss/rss_fetch.inc");
	//require_once ("../../lib/Util.class.php");

	class tst {

		var $rss;

		function __construct(){
			$this->url = 'http://ext02.tst.gov.br/pls/no01/no_noticias.rss?p_cod_area_noticia=ASCS';
			$rss = fetch_rss($this->url);

			//indexa título, link e data de publicação
			$this->cont = array();
			$n = 0;
			foreach ($rss->items as $node){
				$this->cont[$n]['titulo'] = $node['title'];
				$this->cont[$n]['link'] = $node['link'];
				
				/* para os que não têm data alguma.. */
				$this->cont[$n]['data'] = Util::hora(6); // basta lembrar de verificar pelo link

				//$pub = strtotime(Util::subdata($node['pubdate']));
				//$this->cont[$n]['data'] = $pub;
				
				/* Não tem data no feed. Tem que fazer uma coisa pra pegar a data */
				//$c = Util::carregaCont($this->cont[$n]['link']);
				//$c = $this->editData($c); // função criada para limpar e fornecer a data em unixtime
				
				/* Quando já tiver conteudo no feed */
				$this->cont[$n]['conteudo'] = $node['description'];

				$n++;
			}
		}

		/* Essa função é a que limpa o texto das formatações dos sites e retorna o texto puro */
		function editContents($txt){ 
			/* $a = explode("<div class=\"conteudo_texto\">", $txt);
			$b = explode("</div>", $a[1]);
			$c = $b[0];
			$c = str_replace("\t", "", $b[0]); */
			$c = str_replace("\n", "<br />", $txt);
			/* $d = ereg_replace("([<div]).*</div><br>", "", $c);
			$d = str_replace("</p><p", "</p>\n<p", $d);
			$d = ereg_replace("(<br><img src).*", "", $d); */
			return $c;
		}

		function editData($source){
			$a = explode("<div class=\"ultima_atualizacao_texto\">", $source);
			$b = explode("</div>", $a[1]);
			$c = str_replace("\t", "", $b[0]);
			$c = str_replace("\r\n", "<br />", $c);
			$c = strip_tags($c);
			$c = str_replace(" ", "", $c);
			$d = explode("-", $c);
			$dma = explode("/", $d[0]);
			$hm = explode("h", $d[1]);
			$data = mktime($hm[0], $hm[1], 0, $dma[1], $dma[0], $dma[2]);
			return $data;
		}

		//retorna o unixtime da ultima noticia cadastrada
		function getLast(){
			return $this->cont[0]['data'];
		}

		//adiciona as noticias à grade
		function getContents(){
			for($i=0;$i<count($this->cont);$i++){
				//$c = $rss->items[$i]['description'];
				$c = addslashes($this->editContents($this->cont[$i]['conteudo']));
				$this->cont[$i]['conteudo'] = $c;
			}
			return $this->cont;
		}
	}

 	/* $stj = new tst;
	echo "<pre>";
	$stj->getContents();
	echo print_r($stj->cont);
	echo "</pre>"; */
	//echo stf::editContents(implode("", file('txt')));

//	strtotime("Wed, 27 Jun 2007 08:15 GMT -0300");

?>