$(function() {
	$.material.init();

	$.get('/tasks', appendTasksList);

	function appendTasksList(tasks){
		if(tasks.length > 0){
			var list = [];
			var content, task;
			for(var i = 0; i < tasks.length; i++){
				var titleTask = tasks[i].title;
				content = 
					'<a href="/tasks/'+titleTask+'">'+titleTask+'</a>'+
					'<a href="#" data-title="'+titleTask+'">'+
						'<i class="mdi-action-delete"></i>'+
					'</a>';
				list.push($('<li>', { html: content }));	
			}
			$('.tasks-list').append(list);
		}
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