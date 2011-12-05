var idIncD = 1;
var turn = 0;
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

	// } // end turn if 
	});

  }//end if

}

function removeTextbox() {
	$('.wysiwyg').remove();
	$('#wysiwyg').remove();
	idIncT = 1;
	defaultMessage();
}

//using this one
var n = 0;
var limitL = 0;

function createLabel() {
	n++;
	if (limitL < 1){	
		limitL++;
	$('.help p').remove();
	$('.help').append('<p>Now click on the canvas where you want your label to be.<p>');
	$('.help p').css('color', '#feb6b6');
	
	$("#canvas").click(function(e){
	var X1 = (e.pageX - this.offsetLeft) - 8;
	var Y1 = (e.pageY - this.offsetTop) - 20;
	
	var label = document.getElementById("addlabel").value;
             renderText(label); 
             $(this).unbind('click');
             
         $("#addlabel").each(function() {
        switch(this.type) {
            case 'password':
            case 'select-multiple':
            case 'select-one':
            case 'text':
            case 'textarea':
                $(this).val('');
                break;
            case 'checkbox':
            case 'radio':
                this.checked = false;
        }
    });
     
function renderText(textToRender){
	n++;
	var id = '"' + '#' + 'labelHeading' + n + '"';
	var id2 = 'labelHeading'+n;
    var label = '<span onhover="test1()" id="' + id2 + '">' + textToRender + '</span>';	
    $('#canvas').append($(label));
    attr = {font: "50px Helvetica", opacity: 0.5,};
    var classV = '"' + '.' + 'label' + '"';
	$('#' + id2).attr('width', 'auto').attr(attr).attr({fill: "#000"}).css("position", "absolute")
	.css('left', X1).css('top', Y1).addClass("label").draggable({ containment: "parent" });
	 limitL--;
  }
 });
 } // end if

}

$('.help').click(function(e) {
	console.log("hello");
	//$(this).css("border", "dashed 2px #F00");
});

function drawCircle(){
	$("#canvas").mousedown(function(e){
    var X1 = (e.pageX - this.offsetLeft) - 8;
    var Y1 = (e.pageY - this.offsetTop) - 8;
    var X12 = (e.pageX) - 8;
    var Y12 = (e.pageY) - 8;
    $("#canvas").append('<div id="showBox"></div>');
    $("#showBox").css('left', X1).css('top', Y1);
    $("#canvas").mousemove(function(e){
  var width = ((e.pageX - this.offsetLeft) - 8) - X1;
  var height = ((e.pageX - this.offsetLeft) - 8) - X1;
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
		var paper = Raphael(X12, Y12, width, width);
		var circle = paper.circle(width/2, width/2, width/2.2);
		 $('svg').draggable({ containment: "#canvas" });
	});
	$(this).unbind('mousedown');
  });	
}

function drawEllipse(){
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
       	
		var paper = Raphael(X12, Y12, width, height);
		var ellipse = paper.ellipse(width/2, height/2, width/2.2, height/2.2 );
		 $('svg').draggable({ containment: "#canvas" });
	});
	$(this).unbind('mousedown');
  });	
}

function drawRect(){
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
		var paper = Raphael(X12, Y12, width+2, width+2);
		var rect = paper.rect(1, 1, width, height);
		 $('svg').draggable({ containment: "#canvas" });
	});
	$(this).unbind('mousedown');
  });	
}

function drawRectwithRound(){
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
		var paper = Raphael(X12, Y12, width+2, width+2);
		var rect = paper.rect(1, 1, width, height, 25);
		 $('svg').draggable({ containment: "#canvas" });
	});
	$(this).unbind('mousedown');
  });	
}

function drawLine(){
	$("#canvas").mousedown(function(e){
    var X1 = (e.pageX - this.offsetLeft) - 8;
    var Y1 = (e.pageY - this.offsetTop) - 8;
    var X12 = (e.pageX) - 8;
    var Y12 = (e.pageY) - 8;
    $("#canvas").mousemove(function(e){
    	$('#canvas svg').remove();
  var width = ((e.pageX - this.offsetLeft) - 8) - X1;
  var height = ((e.pageY - this.offsetTop) - 8) - Y1;
		var paper = Raphael(X12, Y12, e.pageX, e.pageY);
		var stringPath = "M" + 0 + " " + 0 + "L" + width + " " + height;
		var path = paper.path(stringPath);
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
		var paper = Raphael(X12, Y12, width, width);
		var stringPath = "M" + 0 + " " + 0 + "L" + width + " " + height;
		var path = paper.path(stringPath);
		 $('svg').draggable({ containment: "#canvas" });
	});
	$(this).unbind('mousedown');
  });	
}




var inIncT = 1;
function newTable(){
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
	    	
      var positionX = ((e.pageX - this.offsetLeft) - 8);
      var positionY = ((e.pageY - this.offsetTop) - 8);
      	   
	      //$("#showBoxTable").height(height).width(width);
	    $("#showBoxTable").css('left', positionX).css('top', positionY);
    });

	    $(this).mouseup(function(e){
	    	 var X2 = (e.pageX);
	        var Y2 = (e.pageY)-8;
	    	$(this).unbind('mousemove');
	    	$("#showBoxTable").remove();
	    	$(this).unbind('mouseup');
	    	
			$("#canvas").append('<div id="canvasTable"><table><caption><h3>My Table</h3></caption><thead><tr><td>sdfsd</td><th>sdfsdf</th></tr></thead><tbody><tr><th></th><td></td></tr></tbody></table></div>');
			//position the new drawing canvas correctly
			$("#canvasTable").css('left', X2).css('top', Y2);
			//$('#canvasTable td').editable();

			$('.help p').remove();
			$('.help').append('<p>Awesome, now you can begin editting your table!<p>');
			$('.help p').css('color', '#a3ed9b');
			//$("#canvasTable").draggable({ containment: "parent" });	
			$(this).unbind('mouseup');	
	        });
	         $(this).unbind('mousedown');      	
	});
		         
 
} // end if
} // end newDrawing

function removeTable() {
	$('#table').remove();
	idIncT = 1;
	defaultMessage();
}

function addtablerow() {
$('#table tbody>tr:last').clone(true).insertAfter('#canvasTable tbody>tr:last');
}

function addtablecolumn() {
$('#table tr:first ').append("<td class='TableHeading'></td>");    

 $('#table tr:not(:first)').each(function(){
       $(this).append("<td class='tdMiddleCells'></td>");
 });

}

function newTableTitle() {
	$('#table caption h3').remove();
	var newTitle = document.getElementById("addtabletitle").value;
	$('#table caption').append("<h3>" + newTitle + "</h3>");
}

function clearCanvas() {
	$('#canvas > *').remove();	
}

function isEmpty(str) {
    return (!str || 0 === str.length);
}

var some = $("#title").text();
console.log(some);

function barGraph(){
	 $("table td").click(function () {
		//var value = $('#table input:first').val();		
		var $td= $(this).closest('tr').children('td');
		var n = 0;
		var value=new Array();
		while(1){
		value[n]= $td.eq(n).text();
			//$td.eq(n).css(border: '2px solid #ccc);
			var isempty = isEmpty(value[n]);
			n++;
			if(isempty){break;}
			
		}
		n--;
		value[n] = $('#table input:first').val();
		n++;
		for (var s = 0; s < n; s++){
			console.log(value[s]);	
		}
	});
}

