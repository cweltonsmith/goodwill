$(document).ready(function () {
	$("#getLoginInformation").click(function () {
		var person = new Object();
		person.loyaltyID = $('#loyaltyID').val();
		person.password = $('#txtPassword').val();
		$.ajax({
			url: 'https://goodwillomaha-nw2020.azurewebsites.net/user/login',
			type: 'POST',
			dataType: 'json',
			data: person,
			success: function (data) {
				window.location = "yearselection.html";
				console.log(data);
			},
			error: function (textStatus, errorThrown) {
				console.log(errorThrown);
				console.log(textStatus);
			}
		});
	});
});

