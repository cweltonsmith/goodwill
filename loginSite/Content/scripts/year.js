$(document).ready(function () {
	$("#getSelectedYear").click(function () {
        var accessToken = localStorage.getItem('accessToken');
		$.ajax({
            url: 'https://goodwillomaha-nw2020.azurewebsites.net/user/taxYears?accessToken='
                + encodeURIComponent(accessToken),
			type: 'GET',
			success: function (result) {
                window.location = "donationhistory.html";			

			},
			error: function (textStatus, errorThrown) {
				console.log(errorThrown);
				console.log(textStatus);
			}
		});
	});
});

