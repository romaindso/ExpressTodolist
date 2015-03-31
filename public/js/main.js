$(function() {
	$.material.init();

	$.get('/tasks', appendTasksList);

	function appendTasksList(tasks){
		var list = [];
		var content, task;
		for(var i in tasks){
			task = tasks[i];
			content = 
				'<a href="/tasks/'+task+'">'+task+'</a>'+
				'<a href="#" data-title="'+task+'">'+
					'<i class="mdi-action-delete"></i>'+
				'</a>';
			list.push($('<li>', { html: content }));	
		}
		$('.tasks-list').append(list);
	}

	$('form').on('submit', function(event) {
		event.preventDefault();
		var form = $(this);
		$('.alert').hide();

		$.ajax(form.attr('action'), {
			type: 'POST',
			data: form.serialize(),
			success: function(result){
				appendTasksList([result]);
			},
			error: function(err){
				$('.alert').show();
			}
		});
	});

	$('.tasks-list').on('click', 'a[data-title]', function(event){
		if(!(confirm('Are you sure ?'))){
			return false;
		}

        var target = $(event.currentTarget);

        $.ajax('/tasks/'+target.data('title'), {
            type: 'DELETE',
            success: function(){
                target.parents('li').remove();
            }
        });
	});
});