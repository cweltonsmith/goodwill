$(document).ready(function () {
	let accessToken = localStorage.getItem('accessToken');
	$.ajax({
		url: 'https://goodwill-nw2020.herokuapp.com/customer/taxYears',
		headers: {
			"Authorization": "Bearer " + accessToken
		},
		type: 'GET',
		success: function (result) {
			let listItems = '<option selected="selected" value="0">- Select -</option>';
			for (let i = 0; i < result.taxYears.length; i++) {
				listItems += "<option value='" + result.taxYears[i] + "'>" + result.taxYears[i] + "</option>";
			}
			$("#selYear").html(listItems);

		},
		error: function (textStatus, errorThrown) {
			console.log(errorThrown);
			console.log(textStatus);
		}
	});

	$("#getSelectedYear").click(function () {
		$.ajax({
			url: 'https://goodwill-nw2020.herokuapp.com/customer/history/' + $("#selYear").val(),
			headers: {
				"Authorization": "Bearer " + accessToken
			},
			type: 'GET',
			success: function (result) {
				/* Stuff Here */
			},
			error: function (textStatus, errorThrown) {
				console.log(errorThrown);
				console.log(textStatus);
			}
		});
	});
});


