function updateJSON() {
	$(document).ready (function() {
		$("#submit").click(function() {
			var jsonFile = document.getElementById('jsonFile').files[0];
			if (jsonFile) {
				var reader = new FileReader();
				reader.onload = function() {
					var readJsonFile = JSON.parse(reader.result);
					updateBurgerSales(readJsonFile);
				}
				reader.readAsText(jsonFile);
			}
		})
	})
}

function updateBurgerSales(jsonFile) {
	$.ajax({
		url: 'http://127.0.0.1:3000/burger_sales',
		dataType: 'json',
		success: function (burgerSales) {
			var updatedBurgerSales = countBurgerSales(burgerSales, jsonFile);
			var updatedBurgerSaleJSON = buildBurgerSaleJSON(updatedBurgerSales);
			$.ajax({
				type: "PUT",
				url: 'http://127.0.0.1:3000/burger_sales',
				data: updatedBurgerSaleJSON,
				contentType: 'application/json',
				success: function () {
					updateSpeciesSales(jsonFile);
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
	return updatedBurgerSaleJSON;
}

function updateSpeciesSales(jsonFile) {
	$.ajax({
		url: 'http://127.0.0.1:3000/species_sales',
		dataType: 'json',
		success: function (speciesSales) {
			var updatedSpeciesSales = countSpeciesSales(speciesSales, jsonFile);
			var updatedSpeciesSalesJSON = buildSpeciesSaleJSON(updatedSpeciesSales);
			$.ajax({
				type: "PUT",
				url: 'http://127.0.0.1:3000/species_sales',
				data: updatedSpeciesSalesJSON,
				contentType: 'application/json',
				success: function () {
					updateBurgerSpeciesSales(jsonFile);
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
	return updatedSpeciesSaleJSON;
}

function updateBurgerSpeciesSales(jsonFile) {
	$.ajax({
		url: 'http://127.0.0.1:3000/burger_by_species',
		dataType: 'json',
		success: function (burgerSpeciesSales) {
			var updatedBurgerSpeciesSales = countBurgerSpeciesSales(burgerSpeciesSales, jsonFile);
			var updatedBurgerSpeciesJSON = buildBurgerSpeciesJSON(updatedBurgerSpeciesSales);
			$.ajax({
				type: "PUT",
				url: 'http://127.0.0.1:3000/burger_by_species',
				data: updatedBurgerSpeciesJSON,
				contentType: 'application/json',
				success: function () {
					updateSales(jsonFile);
				}
			});
		}
	});
}

function countBurgerSpeciesSales(burgerSpeciesSales, jsonFile) {
	var updatedBurgerSpeciesSales = {};
	updatedBurgerSpeciesSales['Krabby Pattie'] = burgerSpeciesSales['Krabby Pattie'];
	updatedBurgerSpeciesSales['Krusty Combo'] = burgerSpeciesSales['Krusty Combo'];
	updatedBurgerSpeciesSales['Krusty Deluxe'] = burgerSpeciesSales['Krusty Deluxe'];
	
	for (i in jsonFile)
		updatedBurgerSpeciesSales[jsonFile[i]['burger']][jsonFile[i]['species']] += 1;
	
	console.log(updatedBurgerSpeciesSales);
	return updatedBurgerSpeciesSales;
}

function buildBurgerSpeciesJSON(burgerSpeciesSales) {
	var updatedBurgerSpeciesJSON = "{\"Krusty Combo\": " + "{\"leatherback turtle\": " + burgerSpeciesSales['Krusty Combo']['leatherback turtle'] + ", \"salmon\": " + burgerSpeciesSales['Krusty Combo']['salmon'] 
	+ ", \"seahorse\": " + burgerSpeciesSales['Krusty Combo']['seahorse'] + ", \"coral\": " + burgerSpeciesSales['Krusty Combo']['coral'] + ", \"giant clam\": " + burgerSpeciesSales['Krusty Combo']['giant clam']
	+ ", \"gray whale\": " + burgerSpeciesSales['Krusty Combo']['gray whale'] + ", \"sea lion\": " + burgerSpeciesSales['Krusty Combo']['sea lion'] + "}, ";
	
	updatedBurgerSpeciesJSON = updatedBurgerSpeciesJSON + "\"Krabby Pattie\": " + "{\"leatherback turtle\": " + burgerSpeciesSales['Krabby Pattie']['leatherback turtle'] + ", \"salmon\": " + burgerSpeciesSales['Krabby Pattie']['salmon'] 
	+ ", \"seahorse\": " + burgerSpeciesSales['Krabby Pattie']['seahorse'] + ", \"coral\": " + burgerSpeciesSales['Krabby Pattie']['coral'] + ", \"giant clam\": " + burgerSpeciesSales['Krabby Pattie']['giant clam']
	+ ", \"gray whale\": " + burgerSpeciesSales['Krabby Pattie']['gray whale'] + ", \"sea lion\": " + burgerSpeciesSales['Krabby Pattie']['sea lion'] + "}, ";
	
	updatedBurgerSpeciesJSON = updatedBurgerSpeciesJSON + "\"Krusty Deluxe\": " + "{\"leatherback turtle\": " + burgerSpeciesSales['Krusty Deluxe']['leatherback turtle'] + ", \"salmon\": " + burgerSpeciesSales['Krusty Deluxe']['salmon'] 
	+ ", \"seahorse\": " + burgerSpeciesSales['Krusty Deluxe']['seahorse'] + ", \"coral\": " + burgerSpeciesSales['Krusty Deluxe']['coral'] + ", \"giant clam\": " + burgerSpeciesSales['Krusty Deluxe']['giant clam']
	+ ", \"gray whale\": " + burgerSpeciesSales['Krusty Deluxe']['gray whale'] + ", \"sea lion\": " + burgerSpeciesSales['Krusty Deluxe']['sea lion'] + "}}";
	
	return updatedBurgerSpeciesJSON;
}

function updateSales(jsonFile) {
	$.ajax({
		type: "PATCH",
		url: 'http://127.0.0.1:3000/sales',
		data: JSON.stringify(jsonFile),
		contentType: 'application/json',
		success: function () {
			alert("JSON Data Uploaded to Database");
		}
	});
}