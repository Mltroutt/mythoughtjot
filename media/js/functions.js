// JavaScript Document

/*
jQuery("#myCanvas").drawRect(10, 10, 20, 20, {color:'blue', alpha: .5});
jQuery("#myCanvas").drawPolygon([100, 100, 90, 30], [20, 30, 40, 60], {color:'#00FF00', alpha: .9});
jQuery("#myCanvas").drawEllipse(100, 200, 40, 40, {color:'orange', stroke: 10});
jQuery("#myCanvas").fillArc(50, 200, 40, 40, 90.0, 180.0, {color:'#336699', alpha: .2});
jQuery("#myCanvas").fillPolygon([150, 300, 90, 30], [20, 30, 40, 60], {color:'yellow', alpha: 1});
*/

var ready = 0;

function set(){
	ready++;
}
function unset(){
	ready--;
}


function line(cx1, cy1, cx2, cy2) {
    c = $(document.body);
    var dx = Math.abs(cx2-cx1);
    var dy = Math.abs(cy2-cy1);
    var d = Math.max(dx, dy);
    var i=0;
    for(i=0; i < d; i++) {
        var img = $(document.createElement('img')).attr('src', 'blank.gif');
        var div = $(document.createElement('div')).width(1).height(1).css({'background-color': '#f00', position: 'absolute', left: Math.min(cx1,cx2)+(i*dx/d), top: Math.min(cy1,cy2)+(i*dy/d) });
        div.append(img);
        c.append(div);
    }
}
function circle(x, y, r) {
    c = $(document.body);
    var l = 2 * Math.PI * r;
    var i=0;
    for(i=0; i < l * (1+((10-Math.log(r+1))/10)); i++) {
        var cx2 = r * Math.sin(360 * i/l);
        var cy2 = r * Math.cos(360 * i/l);
        var img = $(document.createElement('img')).attr('src', 'blank.gif');
        var div = $(document.createElement('div')).width(1).height(1).css({'background-color': '#f00', position: 'absolute', left: x+cx2, top: y+cy2 });
        div.append(img);
        c.append(div);
    }
}

function draw () {
	$("#canvas").append('<canvas data-processing-sources="js/processingPlugin.js"></canvas>');
	
}

// create a shape
function createShape () {
	$("#canvas").append('<div onclick="bringtofront()" onmouseover="drag()" class="test1">Drag Me!!!</div>');
}

// add text
function addText () {
	$("#canvas").append('<span id="textbox" class="editText">This is a textbox.</span></div><script type="text/javascript" src="js/instantedit.js"></script><script type="text/javascript">setVarsForm("pageID=profileEdit&userID=11");</script>');
}

//erase a drawing
function erase () {
    var p = Processing.getInstanceById('testdrawcanvas');
    p.clearDrawing();
}

//change size of the paintbrush canvas
function changeDrawingSize (width, height) {
    var q = Processing.getInstanceById('testdrawcanvas');
    q.changeSize(width, height);
}
//change color of paintbrush
function changeColor (color) {
    var c = Processing.getInstanceById('testdrawcanvas');
    c.changecolor(color);
}

function bringtofront() {
	$(".test1").topZIndex( { increment: 10 } );
}

// make a div draggable
function drag () {
    $(".test1")
}

//change canvas background
function changeCanvasBackground (x) {
   if (x == 1){
    $("#canvas").css('background', '#FFF url(../media/images/canvasNote.png) 40px 40px');}
   if (x == 2){
    $("#canvas").css('background', '#FFF url(../media/images/canvasGraph.png)');}
   if (x == 3){
    $("#canvas").css('background', '#FFF url(../media/images/canvasDrawing.png)');}  
   if (x == 4){
    $("#canvas").css('background-image', 'none');}    
   if (x == 5){
   	$("#canvas").css('background-image', 'none');
   	$("#canvas").css('color', '#ffffff');
    $("#canvas").css('background-color', '#26211c');}    

}

// right sliding widget
$(function(){
	 
    $('.slideoutMenu').tabSlideOut({
        tabHandle: '.handle',                     //class of the element that will become your tab
        //pathToTabImage: '', //path to the image for the tab //Optionally can be set using css
        imageHeight: '122px',                     //height of tab image           //Optionally can be set using css
        imageWidth: '40px',                       //width of tab image            //Optionally can be set using css
        tabLocation: 'right',                      //side of screen where tab lives, top, right, bottom, or left
        speed: 300,                               //speed of animation
        action: 'click',                          //options: 'click' or 'hover', action to trigger animation
        topPos: '0px',                          //position from the top/ use if tabLocation is left or right
        leftPos: '20px',                          //position from left/ use if tabLocation is bottom or top
        fixedPosition: false                      //options: true makes it stick(fixed position) on scroll
    });
 
});

$(function(){
    $('.slideoutMenu2').tabSlideOut({
        tabHandle: '.handle2',                     //class of the element that will become your tab
        //pathToTabImage: '', //path to the image for the tab //Optionally can be set using css
        imageHeight: '122px',                     //height of tab image           //Optionally can be set using css
        imageWidth: '40px',                       //width of tab image            //Optionally can be set using css
        tabLocation: 'right',                      //side of screen where tab lives, top, right, bottom, or left
        speed: 300,                               //speed of animation
        action: 'click',                          //options: 'click' or 'hover', action to trigger animation
        topPos: '200px',                          //position from the top/ use if tabLocation is left or right
        leftPos: '20px',                          //position from left/ use if tabLocation is bottom or top
        fixedPosition: false                      //options: true makes it stick(fixed position) on scroll
    });
   
});

function close() {
	$('.slideoutMenu2').removeClass();
	$('.slideoutMenu2 open').addClass("slideoutMenu2");
}

//jQuery right menu
$(document).ready(function () {
    var theme = $.data(document.body, 'theme');
	if (theme == null || theme == undefined) theme = '';
 
        // Create a jqxMenu
	$("#jqxMenu").jqxMenu({ mode: 'vertical', theme: theme });
});

// create graph from data
function createGraph (id, title, type) {
	if (type == 'bar') {$(id).visualize({type: 'bar', title: title});  };
	if (type == 'pie') {$(id).visualize({type: 'pie', pieMargin: 10, title: title});   };
	if (type == 'line') {$(id).visualize({type: 'line', title: title});  };
	if (type == 'area') {$(id).visualize({type: 'area', title: title});  };
};

//draw polygon
function drawPoly () {
	$("#canvas").drawPolygon([100, 100, 90, 30], [20, 30, 40, 60], {color:'#00FF00', alpha: .9});
	//$("#myCanvas").drawRect(10, 10, 20, 20, {color:'blue', alpha: .5});
	//$("#myCanvas").drawPolygon([100, 100, 90, 30], [20, 30, 40, 60], {color:'#00FF00', alpha: .9});
	//$("#myCanvas").drawEllipse(100, 200, 40, 40, {color:'orange', stroke: 10});
	//$("#myCanvas").fillArc(50, 200, 40, 40, 90.0, 180.0, {color:'#336699', alpha: .2});
	//$("#myCanvas").fillPolygon([150, 300, 90, 30], [20, 30, 40, 60], {color:'yellow', alpha: 1});
}

function drawRectangle() {
	$(document).ready(function() {
	$('#about').click(function() {
		
	                   window.location.href = 'http://motyar.blogspot.com/2010/02/draw-rectangle-with-jquery.html';
	}
	)
	var rx1,rx2,ry1,ry2;
	$(document).mousedown(function(e) {
	$("#current").attr({ id: '' })
	box = $('<div style="border:1px #FF00FF solid;position:fixed;">').hide();
	$(document.body).append(box);
	
	rx1 = e.pageX;
	ry1 = e.pageY;
	
	box.attr({id: 'current'}).css({
	top: e.pageY , //offsets
	left: e.pageX //offsets
	}).fadeIn();
	});
	$(document).mousemove(function(e) {
	$("#current").css({
	width:Math.abs(e.pageX - rx1), //offsets
	height:Math.abs(e.pageY - ry1) //offsets
	}).fadeIn();
	});
	
	$(document).mouseup(function() {
	$("#current").attr({ id: '' })
	});
	
	});
}

function drawCircle() {
		$(document).ready(function() {
	
	var cx1,cx2,cy1,cy2;
	$(document).mousedown(function(e) {
	$("#current").attr({ id: '' })
	box = $('<div style="border:1px #FF00FF solid;position:fixed;">').hide();
	$(document.body).append(box);
	
	cx1 = e.pageX;
	cy1 = e.pageY;
	
	box.attr({id: 'current'}).css({
	top: e.pageY , //offsets
	left: e.pageX //offsets
	}).fadeIn();
	});
	$(document).mousemove(function(e) {
	$("#current").css({
	width:Math.abs(e.pageX - cx1), //offsets
	height:Math.abs(e.pageY - cy1),//offsets
	'border-radius':Math.abs(Math.abs(e.pageX - cx1) / 2),
	'-moz-border-radius':Math.abs(Math.abs(e.pageX - cx1) / 2),
	'-webkit-border-radius':Math.abs(Math.abs(e.pageX - cx1) / 2)
	}).fadeIn();
	});
	
	$(document).mouseup(function() {
	$("#current").attr({ id: '' })
	});
	
	});
}


//creating shapes
var drawNodes = []; 
var sketchpad = null; 
var start = null; 
var outline = null; 
var offset = null; 
 
$('#svgsketch').svg({onLoad: function(svg) { 
        sketchpad = svg; 
        var surface = svg.rect(0, 0, '100%', '100%', {id: 'surface', fill: 'white'}); 
        $(surface).mousedown(startDrag).mousemove(dragging).mouseup(endDrag); 
        resetSize(svg, '100%', '100%'); 
    } 
}); 
 
// Remember where we started 
function startDrag(event) { 
    offset = ($.browser.msie ? {left: 0, top: 0} : $('#svgsketch').offset()); 
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
    $('#svgsketch').focus(); 
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
	offset = ($.browser.msie ? {left: 0, top: 0} : $('#svgsketch').offset());
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

// NOT FINISHED alert
function notfinishedyet() {
	alert("Oops! mythoughtjot is still in its alpha version! This functionality will be available soon!");
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
	$('#svgsketch').focus();
};

//createSomethingCool
function createIT() { 
	$("#canvas").append('<div id="canvas_container"></div> ');
	
    var paper = new Raphael(document.getElementById('canvas_container'), 500, 500);  
    var paper = new Raphael(document.getElementById('canvas_container'), 500, 500);  
    
    var circle = paper.circle(100, 100, 80);  
    for(var i = 0; i < 5; i+=1) {  
    var multiplier = i*5;  
    paper.circle(250 + (2*multiplier), 100 + multiplier, 50 - multiplier);  
} 
}  

//icon generator
function chooseIcon(tool) {
	switch (tool) {
		case "pencil":
		renderPencilI();
		break;
		
		case "text":
		renderTextI();
		break;
		
		case "shape":
		renderShapeI();
		break;
		
		case "graph":
		renderGraphI();
		break;
		
		case "share":
		renderShareI();
		break;
		
		case "search":
		rendersearchI();
		break;
		
		case "canvas":
		renderCanvasI();
		break;
		
		case "add":
		renderAddI();
		break;
		
		case "subtract":
		renderSubtractI();
		break;
		
		case "messages":
		renderMessagesI();
		break;
	}
}

function renderPencilI() {
var icon = {
	pencil: "M25.31,2.872l-3.384-2.127c-0.854-0.536-1.979-0.278-2.517,0.576l-1.334,2.123l6.474,4.066l1.335-2.122C26.42,4.533,26.164,3.407,25.31,2.872zM6.555,21.786l6.474,4.066L23.581,9.054l-6.477-4.067L6.555,21.786zM5.566,26.952l-0.143,3.819l3.379-1.787l3.14-1.658l-6.246-3.925L5.566,26.952z",
    },
   
        x = 0,
        y = 0,
        fill = {fill: "#fff", stroke: "none"},
        stroke = {stroke: "#ff8400", "stroke-width": 3, "stroke-linejoin": "round", opacity: 0},
        selected,
        path = document.getElementById("drawButton"),
        none = {fill: "#000", opacity: 0};
    for (var name in icon) {
        var r = Raphael(path, 40, 40),
            s = r.path(icon[name]).attr(stroke).translate(4, 4),
            Icon = r.path(icon[name]).attr(fill).translate(4, 4);
        (function (icon, path, s) {
            r.rect(0, 0, 32, 32).attr(none).click(function () {
               // selected && selected.attr(fill);
               // selected = icon.attr({fill: "90-#0050af-#002c62"});
                //Path.value = path;
                //Path.select();
            }).hover(function () {
                s.stop().animate({opacity: 1}, 200);
            }, function () {
                s.stop().attr({opacity: 0});
            });
        })(Icon, icon[name], s);
        x += 37;
        if (x > 450) {
            x = 0;
            y += 37;
        }
    }
}

function renderShapeI() {
var icon = {
	flip: "M15.5,21.082h1.001v-2.001H15.5V21.082zM15.5,25.082h1.001v-2H15.5V25.082zM15.5,29.082h1.001v-2H15.5V29.082zM15.5,32.127h1.001v-1.045H15.5V32.127zM15.5,17.083h1.001v-2H15.5V17.083zM15.5,1.083h1.001v-2H15.5V1.083zM15.5,5.083h1.001v-2H15.5V5.083zM15.5,9.083h1.001v-2H15.5V9.083zM15.5,13.083h1.001v-2H15.5V13.083zM18.832,1.203v25.962h14.093L18.832,1.203zM19.832,5.136l11.41,21.03h-11.41V5.136zM13.113,27.165V1.203L-0.979,27.165H13.113z",
    },
   
        x = 0,
        y = 0,
        fill = {fill: "#fff", stroke: "none"},
        stroke = {stroke: "#ff8400", "stroke-width": 3, "stroke-linejoin": "round", opacity: 0},
        selected,
        path = document.getElementById("shapeButton"),
        none = {fill: "#000", opacity: 0};
    for (var name in icon) {
        var r = Raphael(path, 40, 40)
            s = r.path(icon[name]).attr(stroke).translate(4, 4),
            Icon = r.path(icon[name]).attr(fill).translate(4, 4);
        (function (icon, path, s) {
            r.rect(0, 0, 32, 32).attr(none).click(function () {
               // selected && selected.attr(fill);
               // selected = icon.attr({fill: "90-#0050af-#002c62"});
                //Path.value = path;
                //Path.select();
            }).hover(function () {
                s.stop().animate({opacity: 1}, 200);
            }, function () {
                s.stop().attr({opacity: 0});
            });
        })(Icon, icon[name], s);
        x += 37;
        if (x > 450) {
            x = 0;
            y += 37;
        }
    }
}

function renderTextI() {
var icon = {
	bubble: "M16,5.333c-7.732,0-14,4.701-14,10.5c0,1.982,0.741,3.833,2.016,5.414L2,25.667l5.613-1.441c2.339,1.317,5.237,2.107,8.387,2.107c7.732,0,14-4.701,14-10.5C30,10.034,23.732,5.333,16,5.333z",
    },
   
        x = 0,
        y = 0,
        fill = {fill: "#fff", stroke: "none"},
        stroke = {stroke: "#ff8400", "stroke-width": 3, "stroke-linejoin": "round", opacity: 0},
        selected,
        path = document.getElementById("textButton"),
        none = {fill: "#000", opacity: 0};
    for (var name in icon) {
        var r = Raphael(path, 40, 40)
            s = r.path(icon[name]).attr(stroke).translate(4, 4),
            Icon = r.path(icon[name]).attr(fill).translate(4, 4);
        (function (icon, path, s) {
            r.rect(0, 0, 32, 32).attr(none).click(function () {
               // selected && selected.attr(fill);
                //selected = icon.attr({fill: "90-#0050af-#002c62"});
                //Path.value = path;
                //Path.select();
            }).hover(function () {
                s.stop().animate({opacity: 1}, 200);
            }, function () {
                s.stop().attr({opacity: 0});
            });
        })(Icon, icon[name], s);
        x += 37;
        if (x > 450) {
            x = 0;
            y += 37;
        }
    }
}

function renderGraphI() {
var icon = {
	barchart: "M21.25,8.375V28h6.5V8.375H21.25zM12.25,28h6.5V4.125h-6.5V28zM3.25,28h6.5V12.625h-6.5V28z",
    },
   
        x = 0,
        y = 0,
        fill = {fill: "#fff", stroke: "none"},
        stroke = {stroke: "#ff8400", "stroke-width": 3, "stroke-linejoin": "round", opacity: 0},
        selected,
        path = document.getElementById("graphButton"),
        none = {fill: "#000", opacity: 0};
    for (var name in icon) {
        var r = Raphael(path, 40, 40)
            s = r.path(icon[name]).attr(stroke).translate(4, 4),
            Icon = r.path(icon[name]).attr(fill).translate(4, 4);
        (function (icon, path, s) {
            r.rect(0, 0, 32, 32).attr(none).click(function () {
               // selected && selected.attr(fill);
               // selected = icon.attr({fill: "90-#0050af-#002c62"});
                //Path.value = path;
                //Path.select();
            }).hover(function () {
                s.stop().animate({opacity: 1}, 200);
            }, function () {
                s.stop().attr({opacity: 0});
            });
        })(Icon, icon[name], s);
        x += 37;
        if (x > 450) {
            x = 0;
            y += 37;
        }
    }
}

function renderShareI() {
var icon = {
users: "M21.053,20.8c-1.132-0.453-1.584-1.698-1.584-1.698s-0.51,0.282-0.51-0.51s0.51,0.51,1.02-2.548c0,0,1.414-0.397,1.132-3.68h-0.34c0,0,0.849-3.51,0-4.699c-0.85-1.189-1.189-1.981-3.058-2.548s-1.188-0.454-2.547-0.396c-1.359,0.057-2.492,0.792-2.492,1.188c0,0-0.849,0.057-1.188,0.397c-0.34,0.34-0.906,1.924-0.906,2.321s0.283,3.058,0.566,3.624l-0.337,0.113c-0.283,3.283,1.132,3.68,1.132,3.68c0.509,3.058,1.019,1.756,1.019,2.548s-0.51,0.51-0.51,0.51s-0.452,1.245-1.584,1.698c-1.132,0.452-7.416,2.886-7.927,3.396c-0.511,0.511-0.453,2.888-0.453,2.888h26.947c0,0,0.059-2.377-0.452-2.888C28.469,23.686,22.185,21.252,21.053,20.8zM8.583,20.628c-0.099-0.18-0.148-0.31-0.148-0.31s-0.432,0.239-0.432-0.432s0.432,0.432,0.864-2.159c0,0,1.199-0.336,0.959-3.119H9.538c0,0,0.143-0.591,0.237-1.334c-0.004-0.308,0.006-0.636,0.037-0.996l0.038-0.426c-0.021-0.492-0.107-0.939-0.312-1.226C8.818,9.619,8.53,8.947,6.947,8.467c-1.583-0.48-1.008-0.385-2.159-0.336C3.636,8.179,2.676,8.802,2.676,9.139c0,0-0.72,0.048-1.008,0.336c-0.271,0.271-0.705,1.462-0.757,1.885v0.281c0.047,0.653,0.258,2.449,0.469,2.872l-0.286,0.096c-0.239,2.783,0.959,3.119,0.959,3.119c0.432,2.591,0.864,1.488,0.864,2.159s-0.432,0.432-0.432,0.432s-0.383,1.057-1.343,1.439c-0.061,0.024-0.139,0.056-0.232,0.092v5.234h0.575c-0.029-1.278,0.077-2.927,0.746-3.594C2.587,23.135,3.754,22.551,8.583,20.628zM30.913,11.572c-0.04-0.378-0.127-0.715-0.292-0.946c-0.719-1.008-1.008-1.679-2.59-2.159c-1.584-0.48-1.008-0.385-2.16-0.336C24.72,8.179,23.76,8.802,23.76,9.139c0,0-0.719,0.048-1.008,0.336c-0.271,0.272-0.709,1.472-0.758,1.891h0.033l0.08,0.913c0.02,0.231,0.022,0.436,0.027,0.645c0.09,0.666,0.21,1.35,0.33,1.589l-0.286,0.096c-0.239,2.783,0.96,3.119,0.96,3.119c0.432,2.591,0.863,1.488,0.863,2.159s-0.432,0.432-0.432,0.432s-0.053,0.142-0.163,0.338c4.77,1.9,5.927,2.48,6.279,2.834c0.67,0.667,0.775,2.315,0.746,3.594h0.48v-5.306c-0.016-0.006-0.038-0.015-0.052-0.021c-0.959-0.383-1.343-1.439-1.343-1.439s-0.433,0.239-0.433-0.432s0.433,0.432,0.864-2.159c0,0,0.804-0.229,0.963-1.841v-1.227c-0.001-0.018-0.001-0.033-0.003-0.051h-0.289c0,0,0.215-0.89,0.292-1.861V11.572z",
    },
   
        x = 0,
        y = 0,
        fill = {fill: "#fff", stroke: "none"},
        stroke = {stroke: "#ff8400", "stroke-width": 3, "stroke-linejoin": "round", opacity: 0},
        selected,
        path = document.getElementById("shareButton"),
        none = {fill: "#000", opacity: 0};
    for (var name in icon) {
        var r = Raphael(path, 40, 40)
            s = r.path(icon[name]).attr(stroke).translate(4, 4),
            Icon = r.path(icon[name]).attr(fill).translate(4, 4);
        (function (icon, path, s) {
            r.rect(0, 0, 32, 32).attr(none).click(function () {
               // selected && selected.attr(fill);
               // selected = icon.attr({fill: "90-#0050af-#002c62"});
                //Path.value = path;
                //Path.select();
            }).hover(function () {
                s.stop().animate({opacity: 1}, 200);
            }, function () {
                s.stop().attr({opacity: 0});
            });
        })(Icon, icon[name], s);
        x += 37;
        if (x > 450) {
            x = 0;
            y += 37;
        }
    }
}

function rendersearchI() {
var icon = {
search: "M29.772,26.433l-7.126-7.126c0.96-1.583,1.523-3.435,1.524-5.421C24.169,8.093,19.478,3.401,13.688,3.399C7.897,3.401,3.204,8.093,3.204,13.885c0,5.789,4.693,10.481,10.484,10.481c1.987,0,3.839-0.563,5.422-1.523l7.128,7.127L29.772,26.433zM7.203,13.885c0.006-3.582,2.903-6.478,6.484-6.486c3.579,0.008,6.478,2.904,6.484,6.486c-0.007,3.58-2.905,6.476-6.484,6.484C10.106,20.361,7.209,17.465,7.203,13.885z",
    },
   
        x = 0,
        y = 0,
        fill = {fill: "#fff", stroke: "none"},
        stroke = {stroke: "#ff8400", "stroke-width": 3, "stroke-linejoin": "round", opacity: 0},
        selected,
        path = document.getElementById("searchButton"),
        none = {fill: "#000", opacity: 0};
    for (var name in icon) {
        var r = Raphael(path, 40, 40)
            s = r.path(icon[name]).attr(stroke).translate(4, 4),
            Icon = r.path(icon[name]).attr(fill).translate(4, 4);
        (function (icon, path, s) {
            r.rect(0, 0, 32, 32).attr(none).click(function () {
                //selected && selected.attr(fill);
               // selected = icon.attr({fill: "90-#0050af-#002c62"});
                //Path.value = path;
                //Path.select();
            }).hover(function () {
                s.stop().animate({opacity: 1}, 200);
            }, function () {
                s.stop().attr({opacity: 0});
            });
        })(Icon, icon[name], s);
        x += 37;
        if (x > 450) {
            x = 0;
            y += 37;
        }
    }
}

function renderCanvasI() {
var icon = {
settings: "M26.834,14.693c1.816-2.088,2.181-4.938,1.193-7.334l-3.646,4.252l-3.594-0.699L19.596,7.45l3.637-4.242c-2.502-0.63-5.258,0.13-7.066,2.21c-1.907,2.193-2.219,5.229-1.039,7.693L5.624,24.04c-1.011,1.162-0.888,2.924,0.274,3.935c1.162,1.01,2.924,0.888,3.935-0.274l9.493-10.918C21.939,17.625,24.918,16.896,26.834,14.693z",
    },
   
        x = 0,
        y = 0,
        fill = {fill: "#fff", stroke: "none"},
        stroke = {stroke: "#ff8400", "stroke-width": 3, "stroke-linejoin": "round", opacity: 0},
        selected,
        path = document.getElementById("canvasButton"),
        none = {fill: "#000", opacity: 0};
    for (var name in icon) {
        var r = Raphael(path, 40, 40)
            s = r.path(icon[name]).attr(stroke).translate(4, 4),
            Icon = r.path(icon[name]).attr(fill).translate(4, 4);
        (function (icon, path, s) {
            r.rect(0, 0, 32, 32).attr(none).click(function () {
                //selected && selected.attr(fill);
                //selected = icon.attr({fill: "90-#0050af-#002c62"});
                //Path.value = path;
                //Path.select();
            }).hover(function () {
                s.stop().animate({opacity: 1}, 200);
            }, function () {
                s.stop().attr({opacity: 0});
            });
        })(Icon, icon[name], s);
        x += 37;
        if (x > 450) {
            x = 0;
            y += 37;
        }
    }
}

function renderAddI() {
var icon = {
add: "M25.979,12.896 19.312,12.896 19.312,6.229 12.647,6.229 12.647,12.896 5.979,12.896 5.979,19.562 12.647,19.562 12.647,26.229 19.312,26.229 19.312,19.562 25.979,19.562z",
    },
   
        x = 0,
        y = 0,
        fill = {fill: "#fff", stroke: "none"},
        stroke = {stroke: "#ff8400", "stroke-width": 3, "stroke-linejoin": "round", opacity: 0},
        selected,
        path = document.getElementById("addButton"),
        none = {fill: "#000", opacity: 0};
    for (var name in icon) {
        var r = Raphael(path, 40, 40)
            s = r.path(icon[name]).attr(stroke).translate(4, 4),
            Icon = r.path(icon[name]).attr(fill).translate(4, 4);
        (function (icon, path, s) {
            r.rect(0, 0, 32, 32).attr(none).click(function () {
               // selected && selected.attr(fill);
                //selected = icon.attr({fill: "90-#0050af-#002c62"});
                //Path.value = path;
                //Path.select();
            }).hover(function () {
                s.stop().animate({opacity: 1}, 200);
            }, function () {
                s.stop().attr({opacity: 0});
            });
        })(Icon, icon[name], s);
        x += 37;
        if (x > 450) {
            x = 0;
            y += 37;
        }
    }
}

function renderSubtractI() {
var icon = {
subtract: "M25.979,12.896,19.312,12.896,5.979,12.896,5.979,19.562,25.979,19.562z",
    },
   
        x = 0,
        y = 0,
        fill = {fill: "#fff", stroke: "none"},
        stroke = {stroke: "#ff8400", "stroke-width": 3, "stroke-linejoin": "round", opacity: 0},
        selected,
        path = document.getElementById("subtractButton"),
        none = {fill: "#000", opacity: 0};
    for (var name in icon) {
        var r = Raphael(path, 40, 40)
            s = r.path(icon[name]).attr(stroke).translate(4, 4),
            Icon = r.path(icon[name]).attr(fill).translate(4, 4);
        (function (icon, path, s) {
            r.rect(0, 0, 32, 32).attr(none).click(function () {
                //selected && selected.attr(fill);
                //selected = icon.attr({fill: "90-#0050af-#002c62"});
               // Path.value = path;
                //Path.select();
            }).hover(function () {
                s.stop().animate({opacity: 1}, 200);
            }, function () {
                s.stop().attr({opacity: 0});
            });
        })(Icon, icon[name], s);
        x += 37;
        if (x > 450) {
            x = 0;
            y += 37;
        }
    }
}

function renderMessagesI() {
var icon = {
	messages: "M28.516,7.167H3.482l12.517,7.108L28.516,7.167zM16.74,17.303C16.51,17.434,16.255,17.5,16,17.5s-0.51-0.066-0.741-0.197L2.5,10.06v14.773h27V10.06L16.74,17.303z",
    },
   
        x = 0,
        y = 0,
        fill = {fill: "#fff", stroke: "none"},
        stroke = {stroke: "#ff8400", "stroke-width": 3, "stroke-linejoin": "round", opacity: 0},
        selected,
        path = document.getElementById("messagesButton"),
        none = {fill: "#000", opacity: 0};
    for (var name in icon) {
        var r = Raphael(path, 40, 40)
            s = r.path(icon[name]).attr(stroke).translate(4, 4),
            Icon = r.path(icon[name]).attr(fill).translate(4, 4);
        (function (icon, path, s) {
            r.rect(0, 0, 32, 32).attr(none).click(function () {
                //selected && selected.attr(fill);
               // selected = icon.attr({fill: "90-#0050af-#002c62"});
                //Path.value = path;
                //Path.select();
            }).hover(function () {
                s.stop().animate({opacity: 1}, 200);
            }, function () {
                s.stop().attr({opacity: 0});
            });
        })(Icon, icon[name], s);
        x += 37;
        if (x > 450) {
            x = 0;
            y += 37;
        }
    }
}

//render Text for headers
function renderHeader(div, header) {
		 var paper = Raphael(div, 100, 100);
	var t = paper.text(50, 10, header);
	
	var letters = paper.print(50, 50, header, paper.getFont("Vegur"), 40);
	
	letters[4].attr({fill:"orange"});
	for (var i = 5; i < letters.length; i++) {
	  letters[i].attr({fill: "#3D5C9D", "stroke-width": "2", stroke: "#3D5C9D"});
	}

}

//change toolbar
function changeToolbar(div) {
	$(div).topZIndex( { increment: 10 } );
}

//newDrawing

function initButtons(){
			// make radios looking like buttons
    $('#modeRadio').buttonset();

    // make checkbox look like buttons
    $('#tabletCheckbox').button();

	// don't cache which radio is checked (Firefox issue)
	$('#modeRadio > input[type=radio]').attr('autocomplete', "off");
}



var drawinit = 0;
var shapeinit = 0;

function setGlobal(set) {
	switch (set) {
		case "draw":
		drawinit = 1;
		case "shape":
		shapeinit = 1;
  }
}
function initDraw() {drawinit = 1;}
function initShape() {shapeinit = 1;}

function pointless() {
		$("#canvas").bind('mousemove',function(e){ 
            $("#canvas").text("e.pageX: " + e.pageX + ", e.pageY: " + e.pageY); 
	});
}

function drawSize(w, h)
{
	$("#canvas2")
	.width(w)
	.height(h)
	.ink('resize', false)
	.ink('fit', 'both', true);
}
function refresh(div)
{
	$("#canvas2")
	.fillVertically(window)
	.ink('resize');
}

function initWindow()
{
	// handle window changes properly
	window.onresize = refresh;
	window.onorientationchange = refresh;
}

function trythefuckagain(){
		// Drawing Shapes

}

//select what to do based on what was clicked

function whattodo() {
	if (drawinit)
	newDrawing();
	if (shapeinit)
	createShape();
}

//display some help dialog at the top based on what the user is doing
var c;
window.onload = function() {
	$('.help').append('Select a tool to get started!');
}
function message(count){
	if(count == 1 && c<2) {
	$('.help').append('Select a tool to get started!');
	c++;
	}
}

// draw shapes
function createShape() {
	  $("#canvas").off(anode.newDrawing())

		if (shapeinit) {
	$('#canvas').append('<div id="svgsketch" class="svgdiv" style="width: 100%; height: 300px;"></div>');
	
		// Drawing Shapes
		var drawNodes = [];
		var sketchpad = null;
		var start = null;
		var outline = null;
		var offset = null;
		
		$('#svgsketch').svg({onLoad: function(svg) {
				sketchpad = svg;
				var surface = svg.rect(0, 0, '100%', '100%', {id: 'surface', fill: 'transparent'});
				$(surface).mousedown(startDrag).mousemove(dragging).mouseup(endDrag);
				resetSize(svg, '100%', '100%');
			}
		});
		
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
	shapeinit = 0;
  }
}

function dragBox() {

}

//removing table td
$(document).ready(function(){
        $('#table1 td').click(function(){
                $(this).parent().remove();
        });
});
$(document).ready(function(){
        $('#table2 td img.delete').click(function(){
                $(this).parent().parent().remove();
        });
})