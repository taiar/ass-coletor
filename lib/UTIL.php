<?php

	class UTIL{

		function hora(){
			return time();
		}
		
		/* ****************************************************
			UPLOAD FILES

			Util::upload($_FILES['arquivo'], "./teste2.txt");

			nao esquecer do enctype="multipart/form-data"
		******************************************************* */
		function upload($file, $loc, $size='', $ext=''){
			//checka se o tamanho é adequado
			if($size != ""){
				if($file['size'] > $size){
					return false;
					exit;
				}
			}
			//checka se a extensao do arquivo é adequada
			if(is_array($ext)){
				$ver = 0;
				for($i=0;$i<count($ext);$i++)
					if(!ereg("." . $ext[0] . "$", $file['name'])) $ver++;
				if($ver > 0) return false;
			}
			//checka se o arquivo realmente existe...
			if(!empty($file['name']) and is_file($file['tmp_name'])){
				if(copy($file['tmp_name'], $loc)){
					return true;
				}else{
					echo "cuh";
					return false;
					exit;
				}
			}else{
				return false;
				exit;
			}
		}

		function veArray($arr){
			
			echo "<pre>";
			echo print_r($arr);
			echo "</pre>";

		}

		function float2money($float, $um=''){
			$float = number_format($float, 2);
			$float = str_replace(",", "@", $float);
			$float = str_replace(".", ",", $float);
			$float = str_replace("@", ".", $float);
			if(!empty($um)) $float = $um . " " . $float;
			return $float;
		}

		function money2float($money){
			$money = ereg_replace("([^0-9.,]*)", "", $money);
			$money = str_replace(",", "@", $money);
			$money = str_replace(".", "", $money);
			$money = str_replace("@", ".", $money);
			return $money; 
		}

		function c($str){
			return base64_encode($str);
		}

		function dc($str){
			return base64_decode($str);
		}

		/* Faz alguns tratamentos antes de inserir os dados no banco de dados */
		function checkData($str){
			$str = strip_tags($str);
			$str = addslashes($str);
			return $str;
		}
		
		function carregaCont($url){
			$contents = "";

			////versão FOPEN
			
			/* $fp = fopen($url, "r");
			while(!feof($fp)){
				$contents = $contents . fread($fp, 1024);
			}
			fclose($fp); */

			//versão CURL
			
			$ch = curl_init();
			if(!$ch)
			{
				echo "ERRO: PHP_CURL não está instalado...\n";
				exit;
			}
				
			$timeout = 0; 
			curl_setopt ($ch, CURLOPT_URL, $url);
			curl_setopt ($ch, CURLOPT_RETURNTRANSFER, 1);
			curl_setopt ($ch, CURLOPT_CONNECTTIMEOUT, $timeout);
			$contents = curl_exec($ch);
			curl_close($ch);
			
			return $contents;
		}

	} //end class

?>
