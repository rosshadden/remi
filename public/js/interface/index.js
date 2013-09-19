(function() {
	"use strict";

	$("#database").on("change", function() {
		var database = $(this).val();

		$.get("/data/tables", {
			database: database
		})
		.then(function(tables) {
			var html = tables.reduce(function(html, table) {
				return html += "<option>" + table.Tables_in_surrogate + "</option>";
			}, "");

			$("#table").html(html);
		});
	});
})();
