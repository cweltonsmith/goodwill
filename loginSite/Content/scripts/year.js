$(document).ready(function () {
		let accessToken = localStorage.getItem('accessToken');
		$.ajax({
			url: 'https://goodwillomaha-nw2020.azurewebsites.net/user/taxYears?accessToken='
				+ encodeURIComponent(accessToken),
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
            url: 'https://goodwillomaha-nw2020.azurewebsites.net/user/history/'+ $("#selYear").val() + '?accessToken='
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


