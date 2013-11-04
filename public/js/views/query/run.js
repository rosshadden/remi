(function() {
	"use strict";

	var tableTemplate = Handlebars.compile($("#tableTemplate").text());

	KeyboardJS.on("ctrl+enter", function() {
		$("#run").trigger("click");
	});

	$("#run").on("click", function() {
		var query = $("#query").val();
		$.post("", { query: query })
			.then(function(res) {
				$("#results").html(tableTemplate({
					rows: res.rows,
					cols: res.cols
				}));
			});
	});
})();
