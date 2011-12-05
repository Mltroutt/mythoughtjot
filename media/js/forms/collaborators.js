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
				//alert(data['collaborators']);
				$("ul#updatesTab").empty();
				//console.log(data['collaborators'])
				$("ul#updatesTab").append('<a class=\"add_collaborator\" href="/canvas/'+canvas+'/add-collaborator/"><img src="/media/images/add.png" alt="Add" title="Add" /> Add a new collaborator</a>');
				for(collaborator in data['collaborators']) {
					//console.log(data['collaborators'][collaborator])
					$("ul#updatesTab").append('<li class=\"update\"><div class=\"collaborator_box\"><img src=\"/media/images/waht.png\" width=\"25px\" height=\"25px\"><a class=\"user_link\" href=\"/user/' + data['collaborators'][collaborator]["name"] + '/\">' + data['collaborators'][collaborator]['name'] + '</a><a class=\"remove_collaborator\" href=\"/canvas/'+canvas+'/remove-collaborator/' + data['collaborators'][collaborator]["id"] + '/\"><img src="/media/images/delete.png\" alt=\"Remove\" title=\"Remove\" /></a></div></li>');
				}
		  	}else{
	  			for (error in data['errors'])
				$("#id_" + error).after(data['errors'][error]);
		  	}
			console.log(data);
		});
		return false;
	});
});