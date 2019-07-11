function getSpeciesSales() {
	$(document).ready(function () {
		$.ajax({
			url: 'http://127.0.0.1:3000/species_sales',
			dataType: 'json',
			success: function (speciesSales) {
				displaySpeciesSales(speciesSales);
			}
		});
	});
}

function displaySpeciesSales(speciesSales) {
	var species = Object.keys(speciesSales);
	$('#speciesTableArea').html("<table id =\"speciesTable\"> <tr> <th> Species </th> <th> No. Of Customers </th> </tr>");
	
	for (i in species) {
		var speciesIndex = toTitleCase(species[i]);
		console.log(speciesIndex);
		var row = "<tr><td>" + speciesIndex + "</td><td>" + speciesSales[species[i]] + "</td></tr>";
		$('#speciesTableArea').append(row);
	}
	$('#speciesTableArea').append("</table>");
}

function toTitleCase(str) {
	return str.replace(/\w\S*/g, function (i) {
			return i.charAt(0).toUpperCase() + i.substr(1).toLowerCase();
	});
}