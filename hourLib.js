function getHourSales() {
	$(document).ready(function() {
		$.ajax({
			url: 'http://localhost:3000/sales',
			dataType: 'json',
			success: function(saleData) {
				selectedDate = getURLParam("selectedDate");
				console.log(saleData);
				if (selectedDate == null)
					selectedDate = findLastestDate(saleData);
				else
					selectedDate = new Date(selectedDate);
						
				dates = getAllDates(saleData);
				displayDateDropDown(dates, selectedDate);
				dateDropDownZoom();
						
				hourSales = getHourDateSales(saleData, selectedDate);
				displayHourDateTable(hourSales);
			}
		})
	});
}

function findLastestDate(saleData) {
	var dateLatest = new Date(0);
	for (i in saleData) {
		var dateIndex = new Date(saleData[i]['datetime']);
		if (dateLatest < dateIndex)
			dateLatest = dateIndex;
	}
	return dateLatest;
}

function getAllDates(saleData) {
	var monthIndex = -1;
	var dayIndex = -1;
	var yearIndex = -1;
	var dates = {};
	var datesArrIndex = -1;
	
	for (i in saleData) {
		var dateIndex = new Date(saleData[i]['datetime']);
		if (dateIndex.getMonth() != monthIndex || dateIndex.getDate() != dayIndex || dateIndex.getYear() != yearIndex) {
			datesArrIndex++;
			monthIndex = dateIndex.getMonth();
			dayIndex = dateIndex.getDate();
			yearIndex = dateIndex.getYear();
			dates[datesArrIndex] = dateIndex;
		}
	}
	
	return dates;
}

function displayDateDropDown(dates, selectedDate) {
	
	var selectedMonth = selectedDate.getMonth();
	var selectedDay = selectedDate.getDate();
	var selectedYear = selectedDate.getYear();
	var options = "<option value = \"" + buildDateParamURL(selectedDate) + "\">" + buildDateText(selectedDate) + "</option>";
	
	for (i in dates) {
		var dateIndex = dates[i];
		if (dateIndex.getMonth() != selectedMonth || dateIndex.getDate() != selectedDay || dateIndex.getYear() != selectedYear) {
			var optionIndex = "<option value = \"" + buildDateParamURL(dateIndex) + "\">" + buildDateText(dateIndex) + "</option>";
			options = options + optionIndex;
		}
	}
	
	$('#dateDropDownArea').html("<select id = \"dateDropDown\">" + options + "</select>");
	
}

function buildDateText(date) {
	var names = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	var stringDate = names[date.getMonth()] + " " + date.getDate() + " " + date.getFullYear();
	return stringDate;
}

function buildDateParamURL(date) {
	var curURL = location.protocol + "//" + location.host + location.pathname;
	var dateURL = curURL + "?selectedDate=" + date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
	return dateURL;
}

function dateDropDownZoom() {
	$("#dateDropDown").change(function () {
		var url = $("#dateDropDown option:selected").val();
		window.location.href = url;				
	});
}
	

function getHourDateSales(saleData, selectedDate) {
	var selectedMonth = selectedDate.getMonth();
	var selectedDay = selectedDate.getDate();
	var selectedYear = selectedDate.getYear();
	var hourSales = {};
	var hourIndex = -1;
	
	for (i in saleData) {
		var dateIndex = new Date(saleData[i]['datetime']);
		if (dateIndex.getMonth() == selectedMonth && dateIndex.getDate() == selectedDay && dateIndex.getYear() == selectedYear) {
			if (dateIndex.getHours() != hourIndex) {
				hourIndex = dateIndex.getHours();
				hourSales[hourIndex] = 0;
			}
			hourSales[hourIndex] += 1;
		}
	}
	
	return hourSales;
}

function displayHourDateTable(hourSales) {
	var hours = Object.keys(hourSales);
	
	$('#dateTableArea').html("<table id =\"dateTable\"> <tr> <th> Hour </th> <th> No. Of Customers </th> </tr>");
	for (i in hours) {
		var row = "<tr> <td> " + convertToAMPM(hours[i]) + "</td> <td> " + hourSales[hours[i]] + "</td></tr>";
		$('#dateTableArea').append(row);
	}
	$('#dateTableArea').append("</table>");
	
}

function convertToAMPM(hour) {
	var period;
	var convertedHour;
	
	if (hour >= 12) {
		hour = hour - 12;
		period = "PM";
	}
	else
		period = "AM";
	
	if (hour == 0)
		convertedHour = "12 " + period;
	else
		convertedHour = hour + " " + period;
	
	return convertedHour;
}

