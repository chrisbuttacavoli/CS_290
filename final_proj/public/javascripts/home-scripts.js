

$(document).ready(function() {
	$('#submit').click(insertData);
	$('a:contains("Delete")').click(deleteRow);
});


function insertData(e)
{
	e.preventDefault();
	
	var varName = $('#name').val();
	var reps = $('#reps').val();
	var weight = $('#weight').val();
	var varDate = $('#date').val();
	var lbs = $('#lbs').is(':checked') ? 1 : 0;
	
	console.log('Attempting to insert record');
	
	if ($.trim(varName))
	{
		var data = {"name": varName,
					"reps": reps,
					"weight": weight,
					"date": varDate,
					"lbs": lbs};
		
		$.ajax({
			type: 'POST',
			data: JSON.stringify(data),
			contentType: 'application/json',
			url: 'http://52.41.86.148:3001/insert',
			success: function(data) {
				addData(data);
			}
		});
	}
	else
	{
		alert("Please enter an exercise name");
	}
}


function addData(json)
{
	var row = $('<tr>' + 
				'<td style="display:none">' + json.id + '</td>' +
				'<td>' + json.name + '</td>' +
				'<td>' + json.reps + '</td>' +
				'<td>' + json.weight + '</td>' +
				'<td>' + json.date + '</td>' +
				'<td>' + json.lbs + '</td>' +
				'<td><a href="http://52.41.86.148:3001/edit?id=' + json.id + '">Update</a></td>' +
				'<td><a href="#">Delete</a></td>' +
				'</tr>')
	$('#dataTable tbody').append(row);
	$('a:contains("Delete")').click(deleteRow);
}


function deleteRow(e)
{
	e.preventDefault();
	
	var row = $(this).parent().parent();
	var idCell = row.children('td:first');
	var id = idCell.text();
	
	console.log('Attempting to delete ID: ' + id);
	$.ajax({
		type: 'POST',
		data: JSON.stringify({"id": id}),
		contentType: 'application/json',
		url: 'http://52.41.86.148:3001/delete',
		success: function(data) {
			$(row).remove();
		}
	});
}