var idIncD = 1;
//var turn = 0;
var divID = "canvas";
var specChar = '"';
var specChar2 = '#';

$("#canvas").click(function ()
	{
		$('.help p').remove();
		$('.help').append('<p>This is your canvas!<p>');
		$('.help p').css('color', '#a3ed9b');
	});

function newDrawing(){
	//if(turn == 0){
	//turn++;
	idIncD++;
	$('.help p').remove();
	$('.help').append('<p>Hold and drag to create a new drawing box.<p>');
	$('.help p').css('color', '#feb6b6');
	if(idIncD < 3){
	var uniqueID = specChar + specChar2 + divID + idIncD + specChar;
	var uniqueIDSC = specChar + divID + idIncD + specChar;
	var width = 0;
	var height = 0;

	$("#canvas").mousedown(function(e){
	    var X1 = (e.pageX - this.offsetLeft) - 8;
	    var Y1 = (e.pageY - this.offsetTop) - 8;
	    var X12 = (e.pageX) - 6;
	    var Y12 = (e.pageY) - 6;
	    $("#canvas").append('<div id="showBox"></div>');
	    $("#showBox").css('left', X1).css('top', Y1);
	    
	    $("#canvas").mousemove(function(e){
	    	
      var width = ((e.pageX - this.offsetLeft) - 8) - X1;
      var height = ((e.pageY - this.offsetTop) - 8) - Y1;
      	   
	      $("#showBox").height(height).width(width);
    });

	    $(this).mouseup(function(e){
	    	$("#showBox").remove();
	    	$(this).unbind('mousemove');
	        var X2 = (e.pageX) - 8;
	        var Y2 = (e.pageY) - 8;
	        //alert(X1 + " " + X2 + " " + Y1 + " " + Y2);
	        $(this).unbind('mouseup');
	        //turn--;
	       	width = X2 - X12;
	    	height = Y2 - Y12;	
	    	var assembleF = '<div class="canvasNode" id=';
	    	var assembleB = '></div>';
			var newCanvasdiv = assembleF + uniqueIDSC + assembleB;
			
			$("#canvas").append(newCanvasdiv);
			$("#canvas2").ink(
			{
				mode: "write",
				rightMode: "select",
			});
			//$("#canvas2").ink("option", "backgroundColor", "transparent");
			initWindow();
			drawSize(width, height);
			
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
			$('#changeColor').click(function ()
				{
					$("#canvas2").ink("option", "strokeColor", "blue");
				});
		
			// button responsible for canvas clearing
			$('#clearButton')
			.button()
			.click(function () { $("#canvas2").ink('clear'); });
		
			// initial refresh
			refresh();
			
			//position the new drawing canvas correctly
			$("#canvas2").css('left', X12).css('top', Y12);
			
			$('.help p').remove();
			$('.help').append('<p>Awesome, now you are ready to start drawing!<p>');
			$('.help p').css('color', '#a3ed9b');
			$("#canvas2").append('<div class="close" onclick="removeDrawing();"></div>');
			$("#canvas2").draggable({ containment: "parent" });
			 //$("#canvas2").resizable();
			var newwidth = width + 2;
			var newheight = height + 2;
			$('#canvas2').width(newwidth).height(newheight);
	        });
	         $(this).unbind('mousedown');
	         	
	});
		         
 } // end if
//} // end if
 
} // end newDrawing

function removeDrawing() {
	//$('#canvas2').fadeOut('slow');
	$('#canvas2').remove();
	idIncD = 1;
	defaultMessage();
}


var idIncT = 1;
//create a textbox
function createTextbox() {
	//if(turn == 0){
	//turn++;
	idIncT++;
	$('.help p').remove();
	$('.help').append('<p>Hold and drag to create a new text box.<p>');
	$('.help p').css('color', '#feb6b6');
	if(idIncT < 3){
	$("#canvas").mousedown(function(e){
	    
	    var X1 = (e.pageX - this.offsetLeft) - 8;
	    var Y1 = (e.pageY - this.offsetTop) - 8;
	   	var X12 = (e.pageX) - 8;
	    var Y12 = (e.pageY) - 8;
	    $("#canvas").append('<div id="showBox"></div>');
	    $("#showBox").css('left', X1).css('top', Y1);
	    
	    $("#canvas").mousemove(function(e){
	    	
      var width = ((e.pageX - this.offsetLeft) - 8) - X1;
      var height = ((e.pageY - this.offsetTop) - 8) - Y1;

	      $("#showBox").height(height).width(width);
    });
	    $(this).mouseup(function(e){
	    	$("#showBox").remove();
	    	$(this).unbind('mousemove');
	        var X2 = (e.pageX - this.offsetLeft) - 8;
	        var Y2 = (e.pageY - this.offsetTop) - 8;
	        //alert(X1 + " " + X2 + " " + Y1 + " " + Y2);
	        $(this).unbind('mouseup');
	       
	       	width = X2 - X1;
	    	height = Y2 - Y1;	
	        
	        $("#canvas").append('<textarea name="wysiwyg" id="wysiwyg" rows="5" cols="103"></textarea>');
     		$('#wysiwyg').wysiwyg();
			$(".wysiwyg").attr("id", "canvasNode");
			
			$(".wysiwyg").height(height).width(width);
			
			//position the new drawing canvas correctly
			$(".wysiwyg").css('left', X12).css('top', Y12);
		    $('.help p').remove();
			$('.help').append('<p>Alright, now you can begin writing a piece of your mind!<p>');
			$('.help p').css('color', '#a3ed9b');
			$(".wysiwyg").append('<div class="close" style="padding:4px;" onclick="removeTextbox();"></div>');
			$(".wysiwyg").draggable({ containment: "parent" });
			//$(".wysiwyg").resizable();
		});
	  $(this).unbind('mousedown');
	});
	//}//end if
 // turn--;
  }//end if

}

function removeTextbox() {
	$('.wysiwyg').remove();
	$('#wysiwyg').remove();
	idIncT = 1;
	defaultMessage();
}

var idIncS = 1;
function newshapeBox() {
	//if(turn == 0){
	//turn++;
	idIncS++;
	$('.help p').remove();
	$('.help').append('<p>Hold and drag to create a new text box.<p>');
	$('.help p').css('color', '#feb6b6');
	if(idIncS < 3){
	$("#canvas").mousedown(function(e){
	    
	    var X1 = (e.pageX - this.offsetLeft) - 8;
	    var Y1 = (e.pageY - this.offsetTop) - 8;
	    var X12 = (e.pageX) - 8;
	    var Y12 = (e.pageY) - 8;
	    $("#canvas").append('<div id="showBox"></div>');
	    $("#showBox").css('left', X1).css('top', Y1);
	    
	    $("#canvas").mousemove(function(e){
	    	
      var width = ((e.pageX - this.offsetLeft) - 8) - X1;
      var height = ((e.pageY - this.offsetTop) - 8) - Y1;

	      $("#showBox").height(height).width(width);
    });
	    $(this).mouseup(function(e){
	    	$("#showBox").remove();
	    	$(this).unbind('mousemove');
	        var X2 = (e.pageX - this.offsetLeft) - 8;
	        var Y2 = (e.pageY - this.offsetTop) - 8;
	        //alert(X1 + " " + X2 + " " + Y1 + " " + Y2);
	        $(this).unbind('mouseup');
	       
	       	width = X2 - X1;
	    	height = Y2 - Y1;	
	        
	        $("#canvas").append('<div id="svgsketch" class="canvasNode" ></div>');
	        $("#svgsketch").height(height).width(width);
			$("#svgsketch").css('left', X12).css('top', Y12);
			$("#svgsketch").append('<div class="close" style="padding:4px;" onclick="removeShapebox();"></div>');
			//$("#svgsketch").draggable({ containment: "parent" });
			
	 	 $(this).unbind('mousedown');
			// Drawing Shapes
			var drawNodes = [];
			var sketchpad = null;
			var start = null;
			var outline = null;
			var offset = null;
		
		/*  go to http://keith-wood.name/svgRef.html   for more information.
		
			$('#svgsketch').svg({onLoad: function(svg) {
					sketchpad = svg;
					var surface = svg.rect(0, 0, '100%', '100%', {id: 'surface', fill: 'transparent'});
					$(surface).mousedown(startDrag).mousemove(dragging).mouseup(endDrag);
					resetSize(svg, '100%', '100%');
				}
			});     */
				$('#svgsketch').svg();
var svg = $('#svgsketch').svg('get'); 

			sketchpad = svg;
			var surface = svg.rect(0, 0, '100%', '100%', {id: 'surface', fill: 'transparent'});
			$(surface).mousedown(startDrag).mousemove(dragging).mouseup(endDrag);
			resetSize(svg, '100%', '100%');
			// Remove the last drawn element
			$('#undo').click(function() {
				if (!drawNodes.length) {
					return;
				}
				sketchpad.remove(drawNodes[drawNodes.length - 1]);
				drawNodes.splice(drawNodes.length - 1, 1);
			});

			// Clear the canvas
			$('#clear2').click(function() {
				while (drawNodes.length) {
					$('#undo').trigger('click');
				}
			});
			// Convert to text
			$('#toSVG').click(function() {
				alert(sketchpad.toSVG());
			});
	 
	// Remember where we started 
	function startDrag(event) { 
	    offset = ($.browser.msie ? {left: 0, top: 0} : $('#canvas').offset()); 
	    if (!$.browser.msie) { 
	        offset.left -= document.documentElement.scrollLeft || document.body.scrollLeft; 
	        offset.top -= document.documentElement.scrollTop || document.body.scrollTop; 
	    } 
	    start = {X: event.clientX - offset.left, Y: event.clientY - offset.top}; 
	    event.preventDefault(); 
	} 
	 
	// Provide feedback as we drag 
	function dragging(event) { 
	    if (!start) { 
	        return; 
	    } 
	    if (!outline) { 
	        outline = sketchpad.rect(0, 0, 0, 0, 
	            {fill: 'none', stroke: '#c0c0c0', strokeWidth: 1, strokeDashArray: '2,2'}); 
	        $(outline).mouseup(endDrag); 
	    } 
	    sketchpad.change(outline, {x: Math.min(event.clientX - offset.left, start.X), 
	        y: Math.min(event.clientY - offset.top, start.Y), 
	        width: Math.abs(event.clientX - offset.left - start.X), 
	        height: Math.abs(event.clientY - offset.top - start.Y)}); 
	    event.preventDefault(); 
	} 
	 
	// Draw where we finish 
	function endDrag(event) { 
	    if (!start) { 
	        return; 
	    } 
	    $(outline).remove(); 
	    outline = null; 
	    drawShape(start.X, start.Y, 
	        event.clientX - offset.left, event.clientY - offset.top); 
	    start = null; 
	    event.preventDefault(); 
	} 
	 
	// Draw the selected element on the canvas 
	function drawShape(x1, y1, x2, y2) { 
	    var left = Math.min(x1, x2); 
	    var top = Math.min(y1, y2); 
	    var right = Math.max(x1, x2); 
	    var bottom = Math.max(y1, y2); 
	    var settings = {fill: $('#fill').val(), stroke: $('#stroke').val(), 
	        strokeWidth: $('#swidth').val()}; 
	    var shape = $('#shape').val(); 
	    var node = null; 
	    if (shape == 'rect') { 
	        node = sketchpad.rect(left, top, right - left, bottom - top, settings); 
	    } 
	    else if (shape == 'circle') { 
	        var r = Math.min(right - left, bottom - top) / 2; 
	        node = sketchpad.circle(left + r, top + r, r, settings); 
	    } 
	    else if (shape == 'ellipse') { 
	        var rx = (right - left) / 2; 
	        var ry = (bottom - top) / 2; 
	        node = sketchpad.ellipse(left + rx, top + ry, rx, ry, settings); 
	    } 
	    else if (shape == 'line') { 
	        node = sketchpad.line(x1, y1, x2, y2, settings); 
	    } 
	    else if (shape == 'polyline') { 
	        node = sketchpad.polyline([[(x1 + x2) / 2, y1], [x2, y2], 
	            [x1, (y1 + y2) / 2], [x2, (y1 + y2) / 2], [x1, y2], 
	            [(x1 + x2) / 2, y1]], $.extend(settings, {fill: 'none'})); 
	    } 
	    else if (shape == 'polygon') { 
	        node = sketchpad.polygon([[(x1 + x2) / 2, y1], [x2, y1], [x2, y2], 
	            [(x1 + x2) / 2, y2], [x1, (y1 + y2) / 2]], settings); 
	    } 
	    drawNodes[drawNodes.length] = node; 
	    $(node).mousedown(startDrag).mousemove(dragging).mouseup(endDrag); 
	    $('#canvas').focus(); 
	}; 
	 
	// Remove the last drawn element 
	$('#undo').click(function() { 
	    if (!drawNodes.length) { 
	        return; 
	    } 
	    sketchpad.remove(drawNodes[drawNodes.length - 1]); 
	    drawNodes.splice(drawNodes.length - 1, 1); 
	}); 
	 
	// Clear the canvas 
	$('#clear2').click(function() { 
	    while (drawNodes.length) { 
	        $('#undo').trigger('click'); 
	    } 
	}); 
	 
	 //Drawing Shapes
	// Remember where we started
	function startDrag(event) {
		offset = ($.browser.msie ? {left: 0, top: 0} : $('#canvas').offset());
		if (!$.browser.msie) {
			offset.left -= document.documentElement.scrollLeft || document.body.scrollLeft;
			offset.top -= document.documentElement.scrollTop || document.body.scrollTop;
		}
		start = {X: event.clientX - offset.left, Y: event.clientY - offset.top};
		event.preventDefault();
	}
	
	// Provide feedback as we drag
	function dragging(event) {
		if (!start) {
			return;
		}
		if (!outline) {
			outline = sketchpad.rect(0, 0, 0, 0,
				{fill: 'none', stroke: '#c0c0c0', strokeWidth: 1, strokeDashArray: '2,2'});
			$(outline).mouseup(endDrag);
		}
		sketchpad.change(outline, {x: Math.min(event.clientX - offset.left, start.X),
			y: Math.min(event.clientY - offset.top, start.Y),
			width: Math.abs(event.clientX - offset.left - start.X),
			height: Math.abs(event.clientY - offset.top - start.Y)});
		event.preventDefault();
	}
			
	    });  // end mouseup
	}); // end mousedown
		    $('.help p').remove();
			$('.help').append('<p>Select the Shape you want, then press and drag to create!<p>');
			$('.help p').css('color', '#a3ed9b');
			$("#svgsketch").append('<div class="close" style="padding:4px;" onclick="removeShapebox();"></div>');
			$("#svgsketch").draggable({ containment: "parent" });
			//$(".wysiwyg").resizable();

	}  // end if
//turn--;
//}  // end if
}

function removeShapebox() {
	$('#svgsketch').remove();
	idIncS = 1;
	defaultMessage();
}

var inIncT = 1;
function newTable(){
	//if(turn == 0){
	turn++;
	idIncT++;
	$('.help p').remove();
	$('.help').append('<p>Click anywhere to create a new Table.<p>');
	$('.help p').css('color', '#feb6b6');
	if(idIncT< 3){
	$("#canvas").mousedown(function(e){
	    var X1 = (e.pageX - this.offsetLeft) - 8;
	    var Y1 = (e.pageY - this.offsetTop) - 8;
	    var X12 = (e.pageX) - 8;
	    var Y12 = (e.pageY) - 8;
	    $("#canvas").append('<div id="showBoxTable"></div>');
	    $("#showBoxTable").css('left', X1).css('top', Y1);
	    
	    $("#canvas").mousemove(function(e){
	    	
      var positionX = ((e.pageX - this.offsetLeft) - 8) - X1;
      var positionY = ((e.pageY - this.offsetTop) - 8) - Y1;
      	   
	      //$("#showBoxTable").height(height).width(width);
	    $("#showBoxTable").css('left', positionX).css('top', positionY);
    });

	    $(this).mouseup(function(e){
	    	$("#showBoxTable").remove();
	    	$(this).unbind('mousemove');
	
			$("#canvas").append('<div id="canvasTable"><table><caption><h3>My Table</h3></caption><thead><tr><td></td><th></th></tr></thead><tbody><tr><th></th><td></td></tr></tbody></table></div>');
			//position the new drawing canvas correctly
			$("#canvasTable").css('left', X12).css('top', Y12);
			
			$('.help p').remove();
			$('.help').append('<p>Awesome, now you can begin editting your table!<p>');
			$('.help p').css('color', '#a3ed9b');
			$("#canvasTable").append('<div class="close" onclick="removeTable();"></div>');
			$("#canvasTable").draggable({ containment: "parent" });	
			$(this).unbind('mouseup');	
	        });
	         $(this).unbind('mousedown');
	         	
	});
		         
// } // end if
//turn--;
} // end if
} // end newDrawing

function removeTable() {
	$('#canvasTable').remove();
	idIncT = 1;
	defaultMessage();
}

function addtablerow() {
$('#canvasTable tbody>tr:last').clone(true).insertAfter('#canvasTable tbody>tr:last');
}

function addtablecolumn() {
$('#canvasTable tr:first ').append("<td class='TableHeading'>second</td>");    

 $('#canvasTable tr:not(:first)').each(function(){
       $(this).append("<td class='tdMiddleCells'>second</td>");
 });

}

function newTableTitle() {
	$('#canvasTable caption h3').remove();
	var newTitle = document.getElementById("addtabletitle").value;
	$('#canvasTable caption').append("<h3>" + newTitle + "</h3>");
}