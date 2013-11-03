(function() {
	"use strict";

	$("#run").on("click", function() {
		var query = $("#query").val();
		$.post("", { query: query })
			.then(function(res) {
				console.log("res", res);
			});
	});
})();
