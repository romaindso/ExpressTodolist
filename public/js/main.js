$(function() {

	$.get('/tasks', appendTasksList);

	function appendTasksList(tasks){
		for(var i=0; i<tasks.length;i++){
			$('.tasks-list').append('<li>'+tasks[i]+'</li>');
		}		
	}

	$('form').on('submit', function(event) {
		event.preventDefault();
		var form = $(this);

		$.ajax(form.attr('action'), {
			type: 'POST',
			data: form.serialize(),
			success: function(result){
				form.remove();
				appendTasksList([result]);
			},
			error: function(err){
				console.log(err);
			}
		});
	});
});