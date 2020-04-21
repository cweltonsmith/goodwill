// Authors: Chase Smith, Sam Eagan - Whole Page
$(document).ready(function() {

	$("#loginformsubmit").submit(function (e) {
		e.preventDefault();
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
			error: (xhr, _, http_status) => {
                if (xhr.responseJSON) {
                    alert(xhr.responseJSON.error)
                }
                else {
                    alert("Unexpected error: " + http_status)
                }
            }
		});

	});
});

