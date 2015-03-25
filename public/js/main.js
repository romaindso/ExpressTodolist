$(function() {
	$.material.init();

	$.get('/tasks', appendTasksList);

	function appendTasksList(tasks){
		for(var i=0; i<tasks.length;i++){
			$('.tasks-list').append(
				'<li>'+tasks[i]+' <a href="#" data-title="'+tasks[i]+'"><i class="mdi-action-delete"></i></a></li>'
			);
		}		
	}

	$('form').on('submit', function(event) {
		event.preventDefault();
		var form = $(this);

		$.ajax(form.attr('action'), {
			type: 'POST',
			data: form.serialize(),
			success: function(result){
				appendTasksList([result]);
			},
			error: function(err){
				console.log(err);
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