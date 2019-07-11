function getHourSales() {
  $(document).ready(function() {
    $.ajax({
      url: 'http://localhost:3000/sales',
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
        
        hourSales = getHourDateSales(saleData, selectedDate);
        displayHourDateTable(hourSales);
      }
    })
  });
}
  
function getHourDateSales(saleData, selectedDate) {
  var options = {hour: "numeric", hour12: true};
  var hourSales = {};
  var hourIndex = -1;
  
  for (i in saleData) {
    var dateIndex = new Date(saleData[i]['datetime']);
    if (isEqualDates(selectedDate, dateIndex)) {
      if (dateIndex.toLocaleString("en-US", options) != hourIndex) {
        hourIndex = dateIndex.toLocaleString("en-US", options);
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
    var row = "<tr> <td> " + hours[i] + "</td> <td> " + hourSales[hours[i]] + "</td></tr>";
    $('#dateTableArea').append(row);
  }
  $('#dateTableArea').append("</table>");
  
}