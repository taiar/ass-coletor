<?php

	/**********************************
		MySQL TAIAR TOOLS
			by:		taiar
		update:		dec/07
	***********************************/

	class DATABASE {

		var $user	= "root";
		var $pass	= "taiar";
		var $db		= "ass";
		var $host	= "localhost";
		
		
		function DATABASE(){
			if(!@mysql_connect($this->host, $this->user, $this->pass)){ return false; }
			if(!@mysql_select_db($this->db)){ return false; }
		}

		function del($table, $cond){
			if(!@mysql_query("delete from " . $table . " where " . $cond . "")){
				return false;
			}else{
				return true;
			}
		}

		function update($table, $array, $key, $id){
			$erro = 0;
			foreach($array as $fild => $val){
				if ( $val != '' )
				{
					if (!mysql_query("UPDATE " . $table . " SET `" . $fild . "` = '" . $val . "' WHERE `" . $key . "` = '" . $id . "'")){ mysql_error(); die; $erro++; }
				}
			}
			if($erro > 0){ return false; }else{ return true; }
		}

		function insert($table, $array){
			$campo = array();
			$valor = array();
			
			foreach($array as $fild => $val){
				if ( $val != '' )
				{
					$campo[] = '`' . $fild . '`';
					$valor[] = $val;
				}
			}

			$valores = implode("', '", $valor);
			$campos = implode(", ", $campo);
			echo $sql;
			if(!@mysql_query("insert into " . $table . " (" . $campos . ") values ('" . $valores . "')")){
				return false;
			}else{
				$id = @mysql_insert_id();
				return $id;
			}
		}

		function find($sql){
			$query = @mysql_query($sql);
			if(!$query){
				return false;
			}else{
				$ret = array();
				$ret['total'] = @mysql_num_rows($query);
				while($l = @mysql_fetch_array($query)){
					foreach($l as $key => $val)
						$l[$key] = utf8_encode($val);
					$ret['dados'][] = $l;
				}
				return $ret;
			}
		}

	} //end class

?>
