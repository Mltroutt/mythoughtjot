// JavaScript Document

/*
jQuery("#myCanvas").drawRect(10, 10, 20, 20, {color:'blue', alpha: .5});
jQuery("#myCanvas").drawPolygon([100, 100, 90, 30], [20, 30, 40, 60], {color:'#00FF00', alpha: .9});
jQuery("#myCanvas").drawEllipse(100, 200, 40, 40, {color:'orange', stroke: 10});
jQuery("#myCanvas").fillArc(50, 200, 40, 40, 90.0, 180.0, {color:'#336699', alpha: .2});
jQuery("#myCanvas").fillPolygon([150, 300, 90, 30], [20, 30, 40, 60], {color:'yellow', alpha: 1});
*/

function line(x1, y1, x2, y2) {
    c = $(document.body);
    var dx = Math.abs(x2-x1);
    var dy = Math.abs(y2-y1);
    var d = Math.max(dx, dy);
    var i=0;
    for(i=0; i < d; i++) {
        var img = $(document.createElement('img')).attr('src', 'blank.gif');
        var div = $(document.createElement('div')).width(1).height(1).css({'background-color': '#f00', position: 'absolute', left: Math.min(x1,x2)+(i*dx/d), top: Math.min(y1,y2)+(i*dy/d) });
        div.append(img);
        c.append(div);
    }
}
function circle(x, y, r) {
    c = $(document.body);
    var l = 2 * Math.PI * r;
    var i=0;
    for(i=0; i < l * (1+((10-Math.log(r+1))/10)); i++) {
        var x2 = r * Math.sin(360 * i/l);
        var y2 = r * Math.cos(360 * i/l);
        var img = $(document.createElement('img')).attr('src', 'blank.gif');
        var div = $(document.createElement('div')).width(1).height(1).css({'background-color': '#f00', position: 'absolute', left: x+x2, top: y+y2 });
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

// create a shape
function addText () {
	$("#canvas").append('<span id="textbox" class="editText">This is a textbox, click here to edit this text!</span></div><script type="text/javascript" src="js/instantedit.js"></script><script type="text/javascript">setVarsForm("pageID=profileEdit&userID=11");</script>');
}

function bringtofront() {
	$(".test1").topZIndex( { increment: 10 } );
}

// make a div draggable
function drag () {
	      jQuery(document).ready(function() {
    jQuery("#textbox").draggable({ containment: 'parent' });
  });
}

//change canvas background
function changeCanvasBackground (x) {
   if (x == 1){
    $("#canvas").css('background', '#FFF url(images/canvasNote.png) 40px 40px');}
   if (x == 2){
    $("#canvas").css('background-image', 'url(images/canvasGraph.png)');}
   if (x == 3){
    $("#canvas").css('background-image', 'url(images/canvasDrawing.png)');}    

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
	$("#jqxMenu").jqxMenu({ width: '120',  mode: 'vertical', theme: theme });
});
