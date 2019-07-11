function getFullDataSales() {
	$(document).ready(function() {
		$.ajax({
			url: 'http://127.0.0.1:3000/sales',
			dataType: 'json',
			success: function(saleData) {
				selectedDate = getURLParam("selectedDate");
				if (selectedDate == null)
					selectedDate = findLastestDate(saleData);
				else
					selectedDate = new Date(selectedDate);
						
				dates = getAllDates(saleData);
				displayDateNavButton(dates, selectedDate);
				displayDateDropDown(dates, selectedDate);
				
				fullDataSales = getFullDataDateSales(saleData, selectedDate);
				displayFullDataSalesTable(fullDataSales);
			}
		})
	});
}
	
function getFullDataDateSales(saleData, selectedDate) {
	var options = {hour: "numeric", hour12: true};
	var fullDataSales = {};
		
	for (i in saleData) {
		var dateIndex = new Date(saleData[i]['datetime']);
		if (isEqualDates(selectedDate, dateIndex))
				fullDataSales[i] = saleData[i];
	}
	
	console.log(fullDataSales);
	return fullDataSales;
}


function displayFullDataSalesTable(fullDataSales) {
	var options = {month: "short", day: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit"};
	
	$('#dateTableArea').html("<table id =\"dateTable\"> <tr> <th> ID </th> <th> Date/Time </th> <th> Species </th> <th> Burger Bought </th> </tr>");
	for (i in fullDataSales) {
		var row = "<tr> <td> " + i + "</td> <td> " + (new Date(fullDataSales[i]['datetime'])).toLocaleDateString("en-US", options) + "</td><td>" + toTitleCase(fullDataSales[i]['species']) + "</td><td>" + fullDataSales[i]['burger'] + "</td></tr>";
		$('#dateTableArea').append(row)
	}
	$('#dateTableArea').append("</table>");
	
}
