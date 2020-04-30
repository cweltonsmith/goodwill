// Authors: Chase Smith, Sam Eagan - Whole Page
$(document).ready(function () {
	//Getting Access Token
	let accessToken = localStorage.getItem('accessToken');
	//Next two Ajax calls automatic on page loading
	$.ajax({
		url: 'https://goodwill-nw2020.herokuapp.com/customer/history',
		headers: {
			//Sending accessToken for specific user
			"Authorization": "Bearer " + accessToken
		},
		type: 'GET',
		//On success populates year selection drop down menu with users tax years
		success: function (result) {
			let listItems = '<option selected="selected" value="0">- Select -</option>';
			//Adds year to drop down menu
			for (let i = 0; i < result.taxYears.length; i++) {
				listItems += "<option value='" + result.taxYears[i] + "'>" + result.taxYears[i] + "</option>";
			}
			$("#selYear").html(listItems);

		},
		//Else print error
		error: (xhr, _, http_status) => {
			if (xhr.responseJSON) {
				alert(xhr.responseJSON.error)
			}
			else {
				alert("Unexpected error: " + http_status)
			}
		}
	});
	//Automatic ajax call on apge loading
	$.ajax({
		url: 'https://goodwill-nw2020.herokuapp.com/customer/info',
		headers: {
			//Sending accessToken for specific user
			"Authorization": "Bearer " + accessToken
		},
		type: 'GET',
		//On success populates user information on Donation History page in the user wrapper
		success: function (result) {
			$('#loyaltyID2').append(result.loyaltyID)
			$('#FullName').append(result.firstName + ' ' + result.lastName)
			$('#phone').append(result.phone)
			$('#address').append(result.address.line1 + ' ' + result.address.line2 + ' ' + '<br />' +
			 result.address.city + ', ' + result.address.state + ' ' + result.address.zip)
		},
		//Else prints error
		error: (xhr, _, http_status) => {
			if (xhr.responseJSON) {
				alert(xhr.responseJSON.error)
			}
			else {
				alert("Unexpected error: " + http_status)
			}
		}
	});
	//Performs Ajax call on click of getSelectedYear button on Donation History Page
	$("#getSelectedYear").click(function () {
		$.ajax({
			//URL adds year selection to get history for that specific year
			url: 'https://goodwill-nw2020.herokuapp.com/customer/history/year/' + $("#selYear").val(),
			headers: {
				"Authorization": "Bearer " + accessToken
			},
			type: 'GET',
			//ON Success populations donation history table
			success: function (result) {
				//Creating empty table
				count = 0;
				donationTable = $("#donations tbody")
				donationTable.empty()
				//Prints Error Message in table if their is no history
				if (result.history.length == 0) {
					trow = $("<tr>")

					//Date Cell
					textCell = $("<td>")
					textCell.text("ERROR")
					trow.append(textCell)

					//Quantity Cell
					itemCellQuant = $("<td>")
					itemCellQuant.text("NO")
					trow.append(itemCellQuant)

					//Unit Cell
					itemCellUnit = $("<td>")
					itemCellUnit.text("RECORDS")
					trow.append(itemCellUnit)

					//Type Cell
					itemCellType = $("<td>")
					itemCellType.text("FOUND")
					trow.append(itemCellType)

					//Description Cell
					itemCellDesc = $("<td>")
					itemCellDesc.text("TRY A DIFFERENT TAX YEAR!")
					trow.append(itemCellDesc)

					donationTable.append(trow)
				}
				
				//Looping through table for multiple items
				//This populates the table with data if length > 0
				for (let i = 0; i < result.history.length; i++) {
					// this assumes result.history[i].items.length >= 1
					for (let j = 0; j < result.history[i].items.length; j++) {
						dateCell = $("<td>")
						//If first cell include date
						if(j==0){
							dateCell.text(result.history[i].date)
						}
						//Changes color based on transaction
						if (i%2== 0) {
							trow = $("<tr class='rowcolor2'>")
						}
						else{
							trow = $("<tr class='rowcolor'>")
						}
						trow.append(dateCell)
						//Quantity Cell
						itemCellQuant = $("<td>")
						itemCellQuant.text(result.history[i].items[j].quantity)
						trow.append(itemCellQuant)

						//Unit Cell
						itemCellUnit = $("<td>")
						itemCellUnit.text(result.history[i].items[j].unit)
						trow.append(itemCellUnit)

						//Type Cell
						itemCellType = $("<td>")
						itemCellType.text(result.history[i].items[j].itemType)
						trow.append(itemCellType)

						//Description Cell
						itemCellDesc = $("<td>")
						itemCellDesc.text(result.history[i].items[j].description)
						trow.append(itemCellDesc)

						//Adds row(whole transaction) to table
						donationTable.append(trow)
							
					}
					

				}


			},
			//Else Prints Error
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
