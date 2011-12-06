$(document).ready(function() {
	$("form").submit(function(e) {
		submit_button = $('input[type=submit]', this);
		submit_button.attr('disabled', 'disabled');
		user = $("#id_user").val();
		canvas = $("#id_canvas").val();
		csrf = $("input[name=csrfmiddlewaretoken]").val();
		$.post('/canvas/'+canvas+'/add-collaborator/', {'user' : user, 'canvas' : canvas, 'csrfmiddlewaretoken': csrf}, function(data) {
			$('ul.errorlist').remove();
			if(data['success']) {
				$('#messages').html(data['messages']);
				$("#messages").slideDown();
				//window.location.href = data['redirect'];
				//alert(data['collaborators']);
				$("ul#updatesTab").empty();
				//console.log(data['collaborators'])
				$("ul#updatesTab").html('&nbsp').load('/canvas/'+canvas+'/load_mini_collaborators/');
				setTimeout(function() {
				      $("#messages").slideUp();
				      $("#messages").empty();
				      submit_button.removeAttr("disabled");
				      $("#id_user").val("");
				}, 2000);	
		  	}else{
	  			for (error in data['errors'])
				$("#id_" + error).after(data['errors'][error]);
				submit_button.removeAttr("disabled");
		  	}
			//console.log(data);
		});
		$('#add_collaborators').dialog("close");
		return false;
	});
});