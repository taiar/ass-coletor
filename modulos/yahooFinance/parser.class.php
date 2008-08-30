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
            $cont = explode("<table id=\"table1\"><tbody><tr><td class=\"yfnc_tablehead1\" width=\"48%\">", $cont);
            $cont = $cont[1];
            
            $cont = explode("</td></tr></tbody></table></div><div class=\"ft\"><div id=\"ecn_warning\">", $cont);
            $cont = $cont[0];

            $cont = str_replace("</tr>", "\n", $cont);
            $cont = strip_tags($cont);
            $cont = explode("\n", $cont);
            
            for ($i = 0; $i < count($cont); $i++)
            {
                $a = explode(":", $cont[$i]);
                $cont[$i] = $a[1];
                $this->dados[] = $cont[$i];
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
