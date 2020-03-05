$(document).ready(function () {
	$("#getLoginInformation").click(function () {
		let person = new Object();
		person.loyaltyID = $('#loyaltyID').val();
		person.password = $('#txtPassword').val();
		$.ajax({
			url: 'https://goodwillomaha-nw2020.azurewebsites.net/user/login',
			type: 'POST',
			dataType: 'json',
			data: person,
			success: function (result) {
				window.location = "yearselection.html";
				localStorage.accessToken = result.accessToken;

			},
			error: function (textStatus, errorThrown) {
				console.log(errorThrown);
				console.log(textStatus);
			}
		});

	});
});

