//Edited by pclarke 08/22/08
//Fixed Safari overflow bug

var ag = navigator.userAgent.toLowerCase();
var isIe = ag.indexOf('msie') > -1;
var br = "Safari";
var indexSafari = navigator.userAgent.indexOf(br) > -1;

var loopInc = 0;     //This must always be 0
var loopNumber = 12; //number of parent divs to loop through

function evaluateParents(currentParent)
    {
    var pnode = currentParent;

    for (j = 0; j < loopNumber; j++)
        {
		 if (pnode.nodeName.toUpperCase() == 'BODY')
			{                
            break;
            }
        var currentOverflow;
		try
		{
			if (isIe)
				{		
			
				currentOverflow = pnode.currentStyle.overflow;					
				
				if (currentOverflow == "hidden")
					{
					pnode.style.overflow = 'visible';
					}					
				pnode = pnode.parentNode;			
				}
	
			else
				{
				
				currentOverflow = document.defaultView.getComputedStyle(pnode, "").getPropertyValue("overflow");
							
				if (currentOverflow == "hidden")
					{					
					pnode.style.overflow = 'visible';								
					}
				else if (indexSafari && (currentOverflow == "visible" || currentOverflow == "hidden"))
					{
					pnode.style.overflow = 'visible';	
					}
	
				pnode = pnode.parentNode;
				}
			}catch(e){}
		}	
    }
	
    var divTag = top.document.getElementsByTagName('div');
    var dtl = divTag.length;

    for (i = dtl; divTag.length > 0; i--)
        {
        if (loopInc >= loopNumber)
            {
            break;
            }
			
        loopInc++;

        if (typeof (divTag[i]) != "undefined")
            {
            if (divTag[i].nodeName.toUpperCase() == 'DIV')
                {				
                evaluateParents(divTag[i]);
                break;
                }
            }
        }