// JavaScript Document

/*
jQuery("#myCanvas").drawRect(10, 10, 20, 20, {color:'blue', alpha: .5});
jQuery("#myCanvas").drawPolygon([100, 100, 90, 30], [20, 30, 40, 60], {color:'#00FF00', alpha: .9});
jQuery("#myCanvas").drawEllipse(100, 200, 40, 40, {color:'orange', stroke: 10});
jQuery("#myCanvas").fillArc(50, 200, 40, 40, 90.0, 180.0, {color:'#336699', alpha: .2});
jQuery("#myCanvas").fillPolygon([150, 300, 90, 30], [20, 30, 40, 60], {color:'yellow', alpha: 1});
*/

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

//change color of paintbrush
function changeDrawingSize (width, height) {
    var q = Processing.getInstanceById('testdrawcanvas');
    q.changeSize(width, height);
}

function bringtofront() {
	$(".test1").topZIndex( { increment: 10 } );
}

// make a div draggable
function drag () {
    $(".test1").draggable({ containment: 'parent' });
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
