

$(document).ready(function() {
	$('#submit').click(updateData);
	
	//Handle checkbox
	if ($('#lbs').data('checked') == "1")
	{
		$('#lbs').prop("checked", true);
	}
});


function updateData(e)
{
	e.preventDefault();
	
	var id = $('#id').val();
	var varName = $('#name').val();
	var reps = $('#reps').val();
	var weight = $('#weight').val();
	var varDate = $('#date').val();
	var lbs = $('#lbs').is(':checked') ? 1 : 0;
	
	var data = {"id": id,
				"name": varName,
				"reps": reps,
				"weight": weight,
				"date": varDate,
				"lbs": lbs};
				
	if ($.trim(varName)) {	
		$.ajax({
			type: 'POST',
			data: JSON.stringify(data),
			contentType: 'application/json',
			url: 'http://52.41.86.148:3001/update',
			success: function(data) {
				$('#message').text("Exercise " + data.name + " was successfully updated.");
			},
			error: function() {
				$('#message').text("Could not update this exercise.");
			}
		});
	}
	else { alert("You cannot leave 'Name' blank."); }
}