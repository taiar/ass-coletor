<?php

	/* mod on 16/1/2008 11:33:04 */

	class database{

		/* var $user	= "rcj_site";
		var $pass	= "rcj12569db";
		var $db		= "rcj";
		var $host	= "mysql.rcj.com.br"; */

		var $user	= "root";
		var $pass	= "";
		var $db		= "rcj";
		var $host	= "localhost";

		function __construct(){
			if(!mysql_connect($this->host, $this->user, $this->pass)){ return false; }
			if(!mysql_select_db($this->db)){ return false; }
		}

		function __destruct(){
			mysql_close();
		}

		function del($table, $cond){
			if(!mysql_query("delete from " . $table . " where " . $cond . "")){
				return false;
			}else{
				return true;
			}
		}

		function update($table, $array, $key, $id){
			$erro = 0;
			foreach($array as $fild => $val){
				if(!mysql_query("update " . $table . " set " . $fild . "='" . $val . "' where " . $key . "='" . $id . "'")){ $erro++; }
			}
			if($erro > 0){ return false; }else{ return true; }
		}

		function insert($table, $array){
			$campo = array();
			$valor = array();
			
			foreach($array as $fild => $val){
				$campo[] = $fild;
				$valor[] = $val;
			}

			$valores = implode("', '", $valor);
			$campos = implode(", ", $campo);
			echo $sql;
			if(!mysql_query("insert into " . $table . " (" . $campos . ") values ('" . $valores . "')")){
				return false;
			}else{
				$id = mysql_insert_id();
				return $id;
			}
		}

		function find($sql){
			$query = mysql_query($sql);
			if(!$query){
				return false;
			}else{
				$ret = array();
				$ret['total'] = mysql_num_rows($query);
				while($l = mysql_fetch_array($query)){
					$ret['dados'][] = $l;
				}
				return $ret;
			}
		}

	} //end class


?>