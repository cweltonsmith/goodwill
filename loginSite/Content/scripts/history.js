$(document).ready(function () {
	let accessToken = localStorage.getItem('accessToken');
	$.ajax({
		url: 'https://goodwill-nw2020.herokuapp.com/customer/history',
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
					trow = $("<tr>")

					textCell = $("<td>")
					textCell.text("ERROR")
					trow.append(textCell)

					itemCellQuant = $("<td>")
					itemCellQuant.text("NO")
					trow.append(itemCellQuant)

					itemCellUnit = $("<td>")
					itemCellUnit.text("RECORDS")
					trow.append(itemCellUnit)

					itemCellType = $("<td>")
					itemCellType.text("FOUND")
					trow.append(itemCellType)

					itemCellDesc = $("<td>")
					itemCellDesc.text("TRY A DIFFERENT TAX YEAR!")
					trow.append(itemCellDesc)

					donationTable.append(trow)
				}
				for (let i = 0; i < result.history.length; i++) {
					trow = $("<tr>")

					dateCell = $("<td>")
					dateCell.text(result.history[i].date)
					trow.append(dateCell)

					for (let j = 0; j < result.history[i].items.length; j++) {
						itemCellQuant = $("<td>")
						itemCellQuant.text(result.history[i].items[j].quantity)
						trow.append(itemCellQuant)

						itemCellUnit = $("<td>")
						itemCellUnit.text(result.history[i].items[j].unit)
						trow.append(itemCellUnit)

						itemCellType = $("<td>")
						itemCellType.text(result.history[i].items[j].itemType)
						trow.append(itemCellType)

						itemCellDesc = $("<td>")
						itemCellDesc.text(result.history[i].items[j].description)
						trow.append(itemCellDesc)

					}
					donationTable.append(trow)
				}

			},
			error: function (textStatus, errorThrown) {
				console.log(errorThrown);
				console.log(textStatus);
			}
		});
	});
});


