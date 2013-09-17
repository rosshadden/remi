(function() {
	"use strict";

	$("#database").on("change", function() {
		$.get("/data/tables")
		.then(function(tables) {
			var html = tables.reduce(function(html, table) {
				return html += "<option>" + table.Tables_in_surrogate + "</option>";
			}, "");

			$("#table").html(html);
		});
	});
})();
