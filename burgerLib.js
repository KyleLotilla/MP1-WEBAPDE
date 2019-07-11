function getBurgerSales() {
	$(document).ready(function () {
		$.ajax({
			url: 'http://localhost:3000/burger_sales',
			dataType: 'json',
			success: function (burgerSales) {
				displayBurgerSales(burgerSales);
			}
		});
	});
}

function displayBurgerSales(burgerSales) {
	var burgers = Object.keys(burgerSales);
	$('#burgerTableArea').html("<table id =\"burgerTable\"> <tr> <th> Burger </th> <th> No. Of Burgers Sold </th> </tr>");
	
	for (i in burgers) {
		var row = "<tr><td>" + burgers[i] + "</td><td>" + burgerSales[burgers[i]] + "</td></tr>";
		$('#burgerTableArea').append(row);
	}
	$('#burgerTableArea').append("</table>");
}