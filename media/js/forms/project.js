$(document).ready(function() {
	$("form#simple_form").submit(function(e) {
		title = $("#id_title").val();
		description = $("#id_description").val();
		csrf = $("input[name=csrfmiddlewaretoken]").val();
		$.post('', {'title' : title, 'description' : description, 'csrfmiddlewaretoken': csrf}, function(data) {
			$('ul.errorlist').remove();
			if(data['success']) {
				$('#messages').html(data['messages']);
				$("#messages").css('display','block');
                if(data['redirect'])
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