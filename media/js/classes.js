

var anode = {
    type: "drawing",
    newDrawing: function (){

 /*$("#canvas").mousedown(function(e){
	    var X1 = (e.pageX - this.offsetLeft) - 8;
	    var Y1 = (e.pageY - this.offsetTop) - 8;
	    
	    $("#canvas").mouseup(function(e){
	    var X2 = (e.pageX - this.offsetLeft) - 8;
	    var Y2 = (e.pageY - this.offsetTop) - 8;
	    
	 
	     
	   //alert(X1 + " , " + Y1 + " , " + X2 + " , " +  Y2);
*/

var width = 0;
var height = 0;
unset();
$("#canvas").mousedown(function(e){
        var X1 = (e.pageX - this.offsetLeft) - 8;
        var Y1 = (e.pageY - this.offsetTop) - 8;

        $(this).mouseup(function(e){
            var X2 = (e.pageX - this.offsetLeft) - 8;
            var Y2 = (e.pageY - this.offsetTop) - 8;
            //alert(X1 + " " + X2 + " " + Y1 + " " + Y2);
            $(this).unbind('mouseup');
           
           	width = X2 - X1;
	    	height = Y2 - Y1;
			
			drawSize(width, height);
        });
         $(this).unbind('mousedown');
         set();
});
if (ready){
		var div = '"#canvas2"';
		$("#canvas").append('<div id="canvas2"></div>');
		$('#canvas2').ink(
		{
			mode: "write",
			rightMode: "select",
		});
		
		initWindow();
		
	
		$('#writingRadio').click(function ()
			{
				$("#canvas2").ink('option', 'mode', "write");
			});
		
		$('#erasingRadio').click(function ()
			{
				$("#canvas2").ink('option', 'mode', "erase");
			});
	
		$('#selectingRadio').click(function ()
			{
				$("#canvas2").ink('option', 'mode', "select");
			});
	
		// button responsible for canvas clearing
		$('#clearButton')
		.button()
		.click(function () { $("#canvas2").ink('clear'); });
	
		// initial refresh
		refresh();
    $("#canvas").unbind('mouseup');
	   ready--;

	}  // end if
 	 },
 	 
	//more properties

}


