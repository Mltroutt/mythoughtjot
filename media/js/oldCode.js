
// These functions were rendering SVG text. 
/*	
	$("#canvas").mousedown(function(e){
	    var X1 = (e.pageX - this.offsetLeft) - 8;
	    var Y1 = (e.pageY - this.offsetTop) - 20;

	    $("#canvas").append('<div id="labelPreview"></div>');
	    $("#labelPreview").css('left', X1).css('top', Y1);
	    
	    $("#canvas").mousemove(function(e){
	    	
      var positionX = ((e.pageX - this.offsetLeft) - 8);
      var positionY = ((e.pageY - this.offsetTop) - 20);
      	   
	      //$("#showBoxTable").height(height).width(width);
	    $("#labelPreview").css('left', positionX).css('top', positionY);
    });

	    $(this).mouseup(function(e){
	    	 var X2 = (e.pageX);
	        var Y2 = (e.pageY)-8;
	    	$(this).unbind('mousemove');
	    	$("#labelPreview").remove();
	    	$(this).unbind('mouseup');
	$("#canvas").append('<input type="text" id="textLabel" class="foo"></input>');
	$("#textLabel").css('left', X2).css('top', Y2);
	$('#textLabel').clearable();
	$('#textLabel').css({'border-width': '0px', 'outline': 'none'})
    .wrap('<div id="sq" class="divclearable"></div>')
    .parent()
    .attr('class', $(this).attr('class') + ' divclearable')
    .append('<a class="clearlink" href="javascript:"></a>');

 
$('.clearlink')
    .attr('title', 'Click to clear this textbox')
    .click(function() {
 
        $(this).prev().val('').focus();
 $(".foo").draggable({ containment: "parent" });
      });
    });     
    
    $(this).unbind('mousedown');
 $('#textLabel').live("keypress", function(e) {
            //key pressed
            if (e.keyCode == 13) {
               var label = document.getElementById("textLabel").value;
              // var text = '<div id="tempTextBox"><p>' + label + '</p></div>'
              // $("#canvas").append(text);
             renderText(label); 
             // $("#textLabel").remove();
            }
        });

function renderText(textToRender){

    var label = '<svg><text id="c" >' + textToRender + '</text></svg>'
    $('#canvasSvg').append($(label));
    attr = {font: "50px Helvetica", opacity: 0.5,};
	$('text[id="c"]').attr('width', '120').attr(attr).attr({fill: "#000"}).css("position", "absolute");
	*/

/*
    var hldr = textToRender,
        text = hldr.innerHTML.replace(/^\s+|\s+$|<[^>]+>/g, "");
    hldr.innerHTML = "";
    var R = Raphael("tempTextBox"),
        txt = [],
        attr = {font: "50px Helvetica", opacity: 0.5,};
    txt[0] = R.text(100, 160, text).attr(attr).attr({fill: "#000"}).attr('width', 'auto');
*/
 /*
    $("#canvas svg text").draggable({ containment: "parent" });
    var cnt = $("#tempTextBox").contents()
$("#tempTextBox").replaceWith(cnt);
$('#canvas svg').click(function(e) {
 	$('#canvas svg').css("border", "dashed 2px #F00");
 });
}
  }); 
}
*/





/*
//creating shapes
var drawNodes = []; 
var sketchpad = null; 
var start = null; 
var outline = null; 
var offset = null; 
 
$('#canvas').svg({onLoad: function(svg) { 
        sketchpad = svg; 
        var surface = svg.rect(0, 0, '100%', '100%', {id: 'surface', fill: 'white'}); 
        $(surface).mousedown(startDrag).mousemove(dragging).mouseup(endDrag); 
        resetSize(svg, '100%', '100%'); 
    } 
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
} */




/*
//this was going to be efficient...
var iconString = [];
iconString = ["pencil","bubble","flipv","barchart","users","search","mail","settings"];
	for(var s = 0; s < 7; s++){
		renderIcon(iconString[s]);
	}
*/
}







/*
<div id="drawingTools">
		<div class="row">
			<span class="drawOpt">Shape</span>
			<span class="drawOpt"><select id="shape">
				<option value="rect">Rectangle</option><option value="circle">Circle</option>
				<option value="ellipse">Ellipse</option><option value="line">Line</option>

				<option value="polyline">Polyline</option><option value="polygon">Polygon</option>
			</select></span><br>
			<span class="drawOpt">Fill</span>
			<span class="drawOpt"><select id="fill">
				<option value="red">red</option><option value="yellow">yellow</option>
				<option value="green">green</option><option value="blue">blue</option>

				<option value="white">white</option><option value="gray">gray</option>
				<option value="black">black</option><option value="none">none</option></select></span><br>
		</div>
		<div class="row">
			<span class="drawOpt">Stroke width</span>
			<span class="drawOpt"><select id="swidth">

				<option value="1">1</option><option value="2">2</option>
				<option value="3">3</option><option value="4">4</option>
				<option value="5">5</option><option value="6">6</option>
				<option value="7">7</option><option value="8">8</option>
				<option value="9">9</option><option value="10">10</option></select></span><br>

			<span class="drawOpt">Stroke</span>
			<span class="drawOpt"><select id="stroke">
				<option value="red">red</option><option value="yellow">yellow</option>
				<option value="green">green</option><option value="blue" selected="selected">blue</option>
				<option value="white">white</option><option value="gray">gray</option>

				<option value="black">black</option><option value="none">none</option></select></span>
		</div>
		<div class="row">
			<span class="drawOpt">&nbsp;</span>
			<span class="drawOpt"><button type="button" id="undo">Undo</button></span>
			<span class="drawOpt"><button type="button" id="clear2">Clear</button></span>
			<span class="drawOpt"><button type="button" id="toSVG">To SVG</button></span>

		</div>
		<input type="button" onclick="whattodo();" value="Create Shape"/>
	  </div>	<!-- end sketchpad -->
 */




/*
function drawshape(){
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
    	
    	var shape = '<svg><circle id="c" cx="' + X1 + '" cy="' + Y1 + '" r="' + width/2 + '" fill="green" /></svg>'
        
        $('#canvas').append($(shape));
        $("#canvas svg").draggable({ containment: "parent" });
        //$("#canvas").append(svgCanvas);
         //$("svg").append('<rect x="100" y="50" width="100" height="50"style="fill:blue;stroke-width:5;stroke:black" /> ');
	//<rect x="10" y="10" width="30" height="50"/>
	});
	$(this).unbind('mousedown');
	 
  });
}


var idIncS = 1;
function newshapeBox() {
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
		start = {X: event.clientX - X1 - 50, Y: event.clientY - Y1 - 50};
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
			width: Math.abs(event.clientX - X1 - start.X),
			height: Math.abs(event.clientY - Y1 - start.Y)});
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
	        event.clientX - X1, event.clientY - Y1); 
	    start = null; 
	    event.preventDefault(); 
	} 
			
	    });  // end mouseup
	 
	}); // end mousedown
		    $('.help p').remove();
			$('.help').append('<p>Select a shape and its appearance and then drag in the panel to create it.<p>');
			$('.help p').css('color', '#a3ed9b');
			$("#svgsketch").append('<div class="close" style="padding:4px;" onclick="removeShapebox();"></div>');
			$("#svgsketch").draggable({ containment: "parent" });
			//$(".wysiwyg").resizable();

	}  // end if
	 
}

function removeShapebox() {
	$('#svgsketch').remove();
	idIncS = 1;
	defaultMessage();
}

*/