<?

    class yahooFinance
    {
    
        var $conteudo;
        var $dados;
        
        function __construct()
        {
            $this->free();
        }

        function parse($cont)
        {
            $cont = explode("<table id=\"table1\"><tr><td class=\"yfnc_tablehead1\" width=\"48%\">", $cont);
            $cont = $cont[1];
            
            $cont = explode("</td></tr></table></div><div class=\"ft\"><div id=\"ecn_warning\">", $cont);
            $cont = $cont[0];

            $cont = explode("</tr>", $cont);
            
            for ($i = 0; $i < count($cont); $i++)
            {
                $a = explode(":", $cont[$i]);
                $cont[$i] = $a[1];
                $this->dados[] = strip_tags($cont[$i]);
            }
        }
        
        function free()
        {
            $this->conteudo = "";
            $this->dados = array();
        }
        
        function get_detailed($arg)
        {
        }
    
    }

?>
