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
		function __construct ($db_obj)
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
				echo "Você deve especificar para qual ticker está fazendo o fechamento... BURRO\n\n";
				die();
			}
			
			$this->$logs = $this->db->find("select * from ass_logs where ticker_id = '" . $this->ticker_id . "' and data >= '" . $this->time_open . "' and data <= '" . $this->time_close . "' order by data");
		}
		
		function get_fechamento()
		{
			$this->fechamento = $this->logs["dados"][($this->logs["total"]-1)]["valor"];
		}

		function get_abertura()
		{
			$this->fechamento = $this->logs["dados"][0]["valor"];
		}
		
		function get_minimo_maximo()
		{
			
		}

		function get_variacao
		{
		
		}

	}
	###
	
?>
