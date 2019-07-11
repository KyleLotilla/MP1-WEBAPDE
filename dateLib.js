function findLastestDate(saleData) {
	var dateLatest = new Date(0);
	for (i in saleData) {
		var dateIndex = new Date(saleData[i]['datetime']);
		if (dateLatest < dateIndex)
			dateLatest = dateIndex;
	}
	return dateLatest;
}

function isEqualDates(date1, date2) {
	if (date1.getMonth() == date2.getMonth() && date1.getDate() == date2.getDate() && date1.getYear() == date2.getYear())
		return true;
	else
		return false;
}

function getAllDates(saleData) {
	var dateIndex = new Date(0);
	var dates = {};
	var datesArrIndex = -1;
	
	for (i in saleData) {
		var saleDateIndex = new Date(saleData[i]['datetime']);
		if (!(isEqualDates(saleDateIndex, dateIndex))) {
			datesArrIndex++;
			dateIndex = saleDateIndex;
			dates[datesArrIndex] = dateIndex;
		}
	}
	
	dates.length = datesArrIndex + 1;
	
	return dates;
}

function displayDateDropDown(dates, selectedDate) {
	var dateDropDown = "<option value = \"" + buildParamURL("selectedDate", buildDateURLParam(selectedDate)) + "\">" + buildDateText(selectedDate) + "</option>";
	
	for (var i = 0; i < dates.length; i++) {
		var dateIndex = dates[i];
		if (!(isEqualDates(selectedDate, dateIndex))) {
			var dateOption = "<option value = \"" + buildParamURL("selectedDate", buildDateURLParam(dateIndex)) + "\">" + buildDateText(dateIndex) + "</option>";
			dateDropDown = dateDropDown + dateOption;
		}
	}
	
	$('#dateDropDownArea').html("<select id = \"dateDropDown\">" + dateDropDown + "</select>");
	dateDropDownZoom();
	
}

function buildDateText(date) {
	var options = {month: "long", day: "2-digit", year: "numeric"};
	return date.toLocaleDateString("en-US", options);
}

function buildDateURLParam(date) {
	var paramValue = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
	return paramValue;
}


function dateDropDownZoom() {
	$("#dateDropDown").change(function () {
		var url = $("#dateDropDown option:selected").val();
		window.location.href = url;				
	});
}

function displayDateNavButton(dates, selectedDate) {
	var prevDate = null;
	var nextDate = null;
	var arrIndex = null;
	var bFound = false;
		
	for (var i = 0; i < dates.length && !bFound; i++) {
		var dateIndex = dates[i];
		if (isEqualDates(dateIndex, selectedDate)) {
			arrIndex = i;
			bFound = true;
		}
		else
			prevDate = dateIndex;
	}
	
	if (arrIndex + 1 < dates.length)
		nextDate = dates[arrIndex + 1];
	
	setDateNavButtonState(prevDate, "prevDateNavButton");
	setDateNavButtonState(nextDate, "nextDateNavButton");
}
	
function setDateNavButtonState(date, id) {
	if (date != null)
		redirectURLOnClick(buildParamURL("selectedDate", buildDateURLParam(date)), id);
	else
		$("#" + id).prop('disabled', true);
}