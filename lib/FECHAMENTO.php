<?php

	#doc
	#	classname:	FECHAMENTO
	#	scope:		PUBLIC
	#
	#/doc

	class FECHAMENTO 
	{
		#	internal variables

		var $time_open;
		var $time_close;
		var $time_date;

		var $ticker_id;
		var $logs;
		
		var $fechamento;
		var $abertura;
		var $minimo;
		var $maximo;
		var $volume;
		var $variacao;

		var $macd;
		var $a;
		var $mme;

		var $db;

		#	Constructor
		function FECHAMENTO ($db_obj)
		{
			$this->db = $db_obj;
		
			$this->time_open = mktime(08, 00, 00, date("m"), date("d"), date("Y"));
			$this->time_close = mktime(20, 00, 00, date("m"), date("d"), date("Y"));
			$this->time_date = date("d-m-Y");
			
			$this->logs = array();
		}
		###	
		
		function got_closed(){
			$res = $this->db->find("select (*) from ass_fechamentos where data=" . $this->time_date . " limit 1");
			if($res["total"] > 0)
				return true;
			return false;
		}
		
		function set_ticker_by_id($id)
		{
			$this->ticker_id = $id;
		}
		
		function get_logs_of_the_day()
		{
			if(!isset($this->ticker_id))
			{
				echo "Especifique para qual ticker está fazendo o fechamento... BURRO\n\n";
				die();
			}
			
			$this->$logs = $this->db->find("select * 
				from 
					ass_logs 
				where 
					ticker_id = '" . $this->ticker_id . "' and 
					data >= '" . $this->time_open . "' and 
					data <= '" . $this->time_close . "' 
				order 
				by data");
		}
		
		function get_fechamento()
		{
			$this->fechamento = $this->logs["dados"][($this->logs["total"]-1)]["valor"];
		}

		function get_abertura()
		{
			$this->abertura = $this->logs["dados"][0]["valor"];
		}
		
		function get_minimo_maximo()
		{
			$min = 0;
			$max = 0;
	
			for ($i = 0; $i < $this->logs["total"]; $i++)
			{
				if($this->logs["dados"][$i]["valor"] > $max) $max = $this->logs["dados"][$i]["valor"];
				if($this->logs["dados"][$i]["valor"] < $min) $min = $this->logs["dados"][$i]["valor"];
			}

			$this->minimo = $min;
			$this->maximo = $max;
		}

		function get_variacao()
		{
			$this->variacao = $this->abertura - $this->fechamento;
		}

		function set_all_values()
		{
			$this->get_logs_of_the_day();
			$this->get_fechamento();
			$this->get_abertura();
			$this->get_minimo_maximo();
			$this->get_variacao();
		}
		
		function save_all()
		{
			$ins = array(
				"ticker_id" 		=> $this->ticker-id,
				"data" 				=> $this->time_date,
				"fechamento" 		=> $this->fechamento,
				"abertura" 			=> $this->abertura,
				"minimo" 			=> $this->minimo,
				"maximo" 			=> $this->maximo,
				"volume_financeiro" => NULL,			// nao implementado
				"variacao" 			=> $this->variacao,
			);
			if(!$this->db->insert("ass_fechamentos", $ins))
			{
				echo mysql_error();
				die();
			}
		}
		
		function get_and_save_all()
		{
			$this->set_all_values();
			$this->save_all();
		}
	}
	###
	
?>
