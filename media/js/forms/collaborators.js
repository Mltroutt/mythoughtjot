$(document).ready(function() {
	$("form").submit(function(e) {
		user = $("#id_user").val();
		canvas = $("#id_canvas").val();
		csrf = $("input[name=csrfmiddlewaretoken]").val();
		$.post('/canvas/'+canvas+'/add-collaborator/', {'user' : user, 'canvas' : canvas, 'csrfmiddlewaretoken': csrf}, function(data) {
			$('ul.errorlist').remove();
			if(data['success']) {
				$('#messages').html(data['messages']);
				$("#messages").css('display','block');
				//window.location.href = data['redirect'];

		  	}else{
	  			for (error in data['errors'])
				$("#id_" + error).after(data['errors'][error]);
		  	}
			console.log(data);
		});
		return false;
	});
});