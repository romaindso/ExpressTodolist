$(function() {

	$.get('/tasks', appendTasksList);

	function appendTasksList(tasks){
		for(var i=0; i<tasks.length;i++){
			$('.tasks-list').append('<li>'+tasks[i]+'</li>');
		}		
	}
});