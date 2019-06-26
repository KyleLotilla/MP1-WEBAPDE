function updateJSON() {
	$(document).ready (function() {
		$("#submit").click(function() {
			var jsonFile = document.getElementById('jsonFile').files[0];
			if (jsonFile) {
				var reader = new FileReader();
				reader.onload = function() {
					var readJsonFile = JSON.parse(reader.result);
					console.log(readJsonFile);
					updateBurgerSales(readJsonFile);
					updateSpeciesSales(readJsonFile);
				}
				reader.readAsText(jsonFile);
			}
		})
	})
}

function updateBurgerSales(jsonFile) {
	$.ajax({
		url: 'http://localhost:3000/burger_sales',
		dataType: 'json',
		success: function (burgerSales) {
			var updatedBurgerSales = countBurgerSales(burgerSales, jsonFile);
			var updatedBurgerSaleJSON = buildBurgerSaleJSON(updatedBurgerSales);
			$.ajax({
				type: "PUT",
				url: 'http://localhost:3000/burger_sales',
				data: updatedBurgerSaleJSON,
				contentType: 'application/json',
				success: function () {
					alert("Its Working");
				}
			});
		}
	});
}

function countBurgerSales(burgerSales, jsonFile) {
	var updatedBurgerSales = {};
	updatedBurgerSales['Krabby Pattie'] = burgerSales['Krabby Pattie'];
	updatedBurgerSales['Krusty Combo'] = burgerSales['Krusty Combo'];
	updatedBurgerSales['Krusty Deluxe'] = burgerSales['Krusty Deluxe'];
	
	for (i in jsonFile)
		updatedBurgerSales[jsonFile[i]['burger']] += 1;
	
	return updatedBurgerSales;
}

function buildBurgerSaleJSON(burgerSales) {
	var updatedBurgerSaleJSON = "{\"Krusty Combo\": " + burgerSales['Krusty Combo'] + ", \"Krusty Deluxe\": " + burgerSales['Krusty Deluxe'] 
	+ ", \"Krabby Pattie\": " + burgerSales['Krabby Pattie'] + "}";
	console.log(updatedBurgerSaleJSON);
	return updatedBurgerSaleJSON;
}

function updateSpeciesSales(jsonFile) {
	$.ajax({
		url: 'http://localhost:3000/species_sales',
		dataType: 'json',
		success: function (speciesSales) {
			var updatedSpeciesSales = countSpeciesSales(speciesSales, jsonFile);
			var updatedSpeciesSalesJSON = buildSpeciesSaleJSON(updatedSpeciesSales);
			$.ajax({
				type: "PUT",
				url: 'http://localhost:3000/species_sales',
				data: updatedSpeciesSalesJSON,
				contentType: 'application/json',
				success: function () {
					alert("Its Working");
				}
			});
		}
	});
}

function countSpeciesSales(speciesSales, jsonFile) {
	var updatedSpecieSales = {};
	updatedSpecieSales['leatherback turtle'] = speciesSales['leatherback turtle'];
	updatedSpecieSales['salmon'] = speciesSales['salmon'];
	updatedSpecieSales['seahorse'] = speciesSales['seahorse'];
	updatedSpecieSales['coral'] = speciesSales['coral'];
	updatedSpecieSales['giant clam'] = speciesSales['giant clam'];
	updatedSpecieSales['gray whale'] = speciesSales['gray whale'];
	updatedSpecieSales['sea lion'] = speciesSales['sea lion'];
	
	for (i in jsonFile)
		updatedSpecieSales[jsonFile[i]['species']] += 1;
	
	return updatedSpecieSales;
}

function buildSpeciesSaleJSON(speciesSales) {
	var updatedSpeciesSaleJSON = "{\"leatherback turtle\": " + speciesSales['leatherback turtle'] + ", \"salmon\": " + speciesSales['salmon'] 
	+ ", \"seahorse\": " + speciesSales['seahorse'] + ", \"coral\": " + speciesSales['coral'] + ", \"giant clam\": " + speciesSales['giant clam']
	+ ", \"gray whale\": " + speciesSales['gray whale'] + ", \"sea lion\": " + speciesSales['sea lion'] + "}";
	console.log(updatedSpeciesSaleJSON);
	return updatedSpeciesSaleJSON;
}
