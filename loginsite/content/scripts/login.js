$(document).ready(function () {
	$("#getLoginInformation").click(function () {
		let person = new Object();
		person.loyaltyID = $('#loyaltyID').val();
		person.password = $('#txtPassword').val();
		$.ajax({
			url: 'https://goodwill-nw2020.herokuapp.com/customer/login',
			type: 'POST',
			dataType: 'json',
			data: person,
			success: function (result) {
				window.location = "donationhistory.html";
				localStorage.accessToken = result.accessToken;

			},
			error: function (textStatus, errorThrown) {
				console.log(errorThrown);
				console.log(textStatus);
			}
		});

	});
});

