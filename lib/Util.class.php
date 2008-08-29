<?php

	require("_config.php");
	
	class Util {

		function redir($targ) {
			header("location:" . $targ);
			die();
		}

		/* função que gera a a hora correta de acordo com o fuso horário definido. (UNIXTIME) */
		function hora($corr='', $form='') {
			$corr = $diferenca_de_horas; // $diferenca_de_horas se encontra em _config.php
			if($form == "") {
				$tmp = time() + (3600 * $corr);
			}
			return $tmp;
		}

		/* estripulias com a data de nascimento */
		function data($dia, $mes, $ano, $sep='/', $inv=0) {
			if(empty($dia) || empty($mes) || empty($ano)) { return false; }
			else{
				if(strlen($dia) == 1){ $dia = "0" . $dia; }
				if(strlen($mes) == 1){ $mes = "0" . $mes; }
				if($inv == 1){ $data = $ano . $sep . $mes . $sep . $dia; }
				else{ $data = $dia . $sep . $mes . $sep . $ano; }
				return $data;
			}
		}
		
		function data2data($data){
			$d = explode("-", $data);
			$n = $d[2] . "/" . $d[1] . "/" . $d[0];
			return $n;
		}

		function up($str) {
		  $stre = strtoupper($str);
		  $stre = str_replace("â", "Â", $stre);
		  $stre = str_replace("á", "Á", $stre);
		  $stre = str_replace("ã", "Ã", $stre);
		  $stre = str_replace("à", "A", $stre);
		  $stre = str_replace("ê", "Ê", $stre);
		  $stre = str_replace("é", "É", $stre);
		  $stre = str_replace("Î", "I", $stre);
		  $stre = str_replace("í", "Í", $stre);
		  $stre = str_replace("ó", "Ó", $stre);
		  $stre = str_replace("õ", "Õ", $stre);
		  $stre = str_replace("ô", "Ô", $stre);
		  $stre = str_replace("ú", "Ú", $stre);
		  $stre = str_replace("û", "U", $stre);
		  $uuu = str_replace("ç", "Ç", $stre);
		  return ($uuu);
		}

		function subdata($dai){
			
			$d = str_replace("Seg", "Mon", $dai);
			$d = str_replace("Ter", "Tue", $d);
			$d = str_replace("Qua", "Wed", $d);
			$d = str_replace("Qui", "Thu", $d);
			$d = str_replace("Sex", "Fri", $d);
			$d = str_replace("Sab", "Sat", $d);
			$d = str_replace("Dom", "Sun", $d);

			$d = str_replace("Jan", "Jan", $d);
			$d = str_replace("Fev", "Feb", $d);
			$d = str_replace("Mar", "Mar", $d);
			$d = str_replace("Abr", "Apr", $d);
			$d = str_replace("Mai", "May", $d);
			$d = str_replace("Jun", "Jun", $d);
			$d = str_replace("Jul", "Jul", $d);
			$d = str_replace("Ago", "Aug", $d);
			$d = str_replace("Set", "Sep", $d);
			$d = str_replace("Out", "Oct", $d);
			$d = str_replace("Nov", "Nov", $d);
			$dai = str_replace("Dez", "Dec", $d);

			return $dai;
		}

		function carregaCont($url){
			$contents = "";

			//versão local
			/* $fp = fopen($url, "r");
			while(!feof($fp)){
				$contents = $contents . fread($fp, 1024);
			}
			fclose($fp); */

			//versão dreamhost
			 
			$ch = curl_init();
			$timeout = 0; 
			curl_setopt ($ch, CURLOPT_URL, $url);
			curl_setopt ($ch, CURLOPT_RETURNTRANSFER, 1);
			curl_setopt ($ch, CURLOPT_CONNECTTIMEOUT, $timeout);
			$contents = curl_exec($ch);
			curl_close($ch);
			
			return $contents;
		}

	} // class END
?>
