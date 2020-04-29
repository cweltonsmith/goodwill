// Authors: Chase Smith, Sam Eagan - Whole Page
$(document).ready(function() {
	//Performs Ajax call on submission of form with id=loginformsubmit 
	$("#loginformsubmit").submit(function (e) {
		e.preventDefault();
		// Create new person and assign user input to values
		let person = new Object();
		person.loyaltyID = $('#loyaltyID').val();
		person.password = $('#txtPassword').val();
		//Ajax call to url of type post sending the person object
		$.ajax({
			url: 'https://goodwill-nw2020.herokuapp.com/customer/login',
			type: 'POST',
			dataType: 'json',
			data: person,
			// On success accessToken will be stored locally and user will be sent to next page
			success: function (result) {
				window.location = "donationhistory.html";
				localStorage.accessToken = result.accessToken;

			},
			//Else Print Error
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

