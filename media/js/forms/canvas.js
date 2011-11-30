$(document).ready(function() {
	$("form#simple_form").submit(function(e) {
		project = $("#id_project").val();
		title = $("#id_title").val();
		public_option = $("#id_public").val();
		guest_option = $("#id_allow_guest").val();
		csrf = $("input[name=csrfmiddlewaretoken]").val();
		$.post('', {'project' : project, 'title' : title, 'public' : public_option, 'allow_guests' : guest_option, 'csrfmiddlewaretoken': csrf}, function(data) {
			$('ul.errorlist').remove();
			if(data['success']) {
				$('#messages').html(data['messages']);
				$("#messages").css('display','block');
		  	}else{
	  			for (error in data['errors'])
				$("#id_" + error).after(data['errors'][error]);
		  	}
			console.log(data);
		});
		return false;
	});
	$("form#ajax_form").submit(function(e) {
		project = $("#id_project").val();
		title = $("#id_title").val();
		public_option = $("#id_public").val();
		guest_option = $("#id_allow_guest").val();
		csrf = $("input[name=csrfmiddlewaretoken]").val();
		$.post('/canvas/create_modal/', {'project' : project, 'title' : title, 'public' : public_option, 'allow_guests' : guest_option, 'csrfmiddlewaretoken': csrf}, function(data) {
			$('ul.errorlist').remove();
			if(data['success']) {
				$('#messages').html(data['messages']);
				$("#messages").css('display','block');
				window.location.href = data['redirect'];

		  	}else{
	  			for (error in data['errors'])
				$("#id_" + error).after(data['errors'][error]);
		  	}
			console.log(data);
		});
		return false;
	});
});