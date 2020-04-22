# Low Level Design
 Ajax calls to the API 
## Get Customer Login Information
	$("#BUTTON").submit(function () {
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
## Get Customer History Based On Year Selection
    $.ajax({
		url: 'https://goodwill-nw2020.herokuapp.com/customer/history',
		headers: {
			"Authorization": "Bearer " + accessToken
		},
		type: 'GET',
		success: function (result) {
			let listItems = '<option selected="selected" value="0">- Select -</option>';
			for (let i = 0; i < result.taxYears.length; i++) {
				listItems += "<option value='" + result.taxYears[i] + "'>" 
        + result.taxYears[i] + "</option>";
			}
			$("#selYear").html(listItems);
		},
    
## Get Customer Info
    $.ajax({
		url: 'https://goodwill-nw2020.herokuapp.com/customer/info',
		headers: {
			"Authorization": "Bearer " + accessToken
		},
		type: 'GET',
		success: function (result) {
			console.log(result)
			$('#loyaltyID2').append(result.loyaltyID)
			$('#FullName').append(result.firstName + ' ' + result.lastName)
			$('#phone').append(result.phone)
			$('#address').append(result.address.line1 + ' ' + result.address.line2 + ' ' + '<br />' +
			 result.address.city + ', ' + result.address.state + ' ' + result.address.zip)
		},
  
## Get Customer Donation History
    $("#getSelectedYear").click(function () {
		$.ajax({
			url: 'https://goodwill-nw2020.herokuapp.com/customer/history/year/' + $("#selYear").val(),
			headers: {
				"Authorization": "Bearer " + accessToken
			},
			type: 'GET',
			success: function (result) {
				console.log(result);
				donationTable = $("#donations tbody")
				donationTable.empty()
				if (result.history.length == 0) {
              POPULATE DONATION TABLE HERE
					}
				}

			},
  
