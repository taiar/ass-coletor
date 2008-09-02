<?

	#doc
	#	classname:	TIME
	#	scope:		PUBLIC
	#
	#/doc
	
	class TIME
	{
		#	internal variables
		var $time;
		var $times;
		
		#	Constructor
		function __construct ($unixtime)
		{
			if (is_int($unixtime))
			{
				$this->time = $unixtime;
				$this->times = array();
				$this->set_times();
				return true;
			}
			$this->__destruct();
			return false;
		}
		###	
		
		function set_times()
		{
			$this->times["hour"] 	= date("H", $this->time);
			$this->times["minute"] 	= date("i", $this->time);
			$this->times["second"] 	= date("s", $this->time);
			$this->times["month"] 	= date("m", $this->time);
			$this->times["day"] 	= date("d", $this->time);
			$this->times["year"] 	= date("Y", $this->time);
			$this->times["week"] 	= date("D", $this->time);
			//$this->times[""] = date("", $this->time);
		}
		
		# Regras de tempo
		function day_rules()
		{
			if(
				$this->times["week"] == "Sat" || 
				$this->times["week"] == "Sun"
			)
				return false;
			return true;
		}
		###
		
		#
		function time_rules()
		{
			$inicio_1 = mktime(10,0,0,date("m"),date("d"),date("Y"));
			$fim_1 = 	mktime(17,0,0,date("m"),date("d"),date("Y"));
			$inico_2 = 	mktime(17,45,0,date("m"),date("d"),date("Y"));
			$fim_2 = 	mktime(19,0,0,date("m"),date("d"),date("Y"));
			
			if(
				(
					$this->time > $inicio_1 && 
					$this->time < $fim_1
				)
				||
				(
					$this->time > $inicio_2 && 
					$this->time < $fim_2
				)
			)
				return true;
			return false;
		}
		###
	
		#
		function holiday_rules()
		{
			return true;
		}
		###
		
		function valid()
		{
			if($this->time_rules() && $this->day_rules())
				return true;
			return false;
		}
		
		function __destruct()
		{
			unset($time);
			unset($times);
		}

	}
	###

?>
