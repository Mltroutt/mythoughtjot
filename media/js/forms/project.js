$(document).ready(function() {
	$("form#simple_form").submit(function(e) {
		submit_button = $('input[type=submit]', this);
		submit_button.attr('disabled', 'disabled');
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
				submit_button.removeAttr("disabled");
		  	}
			//console.log(data);
		});
		return false;
	});
});