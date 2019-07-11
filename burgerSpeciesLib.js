function getBurgerSpeciesSales() {
	$(document).ready(function() {
		$.ajax({
			url: "http://127.0.0.1:3000/burger_by_species",
			dataType: "json",
			success: function(burgerSpeciesSales) {
				selectedBurger = getURLParam("selectedBurger");
				if (selectedBurger == null)
					selectedBurger = "Krabby Pattie";
				else
					selectedBurger = selectedBurger.replace("-", " ");
				displayBurgerDropDown(selectedBurger);
				
				var selectedBurgerSpeciesSales = burgerSpeciesSales[selectedBurger];
				displaySpeciesSales(selectedBurgerSpeciesSales);
			}
		});
	});
}

function displayBurgerDropDown(selectedBurger) {
	var burgers = ["Krabby Pattie",  "Krusty Combo", "Krusty Deluxe"];
	var burgerDropDown = "<option>" + selectedBurger + "</option>";
	
	for (i in burgers)
		if (burgers[i] != selectedBurger) {
			var burgerOption = "<option>" + burgers[i] + "</option>";
			burgerDropDown = burgerDropDown + burgerOption;
		}
	
	$("#burgerDropDownArea").html("<select id = \"burgerDropDown\">" + burgerDropDown + "</select>");
	burgerDropDownZoom();
}

function burgerDropDownZoom() {
	$("#burgerDropDown").change(function() {
		var selectedBurger = $("#burgerDropDown option:selected").val();
		var url = buildParamURL("selectedBurger", selectedBurger.replace(" ", "-"));
		window.location.href = url;
	});
}