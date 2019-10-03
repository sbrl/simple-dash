"use strict";

window.addEventListener("load", async (event) => {
	let config = ION.parse(await fetch("config.toml"));
	
});

var request = new XMLHttpRequest();
request.overrideMimeType("application/json");
request.open("GET", 'config.json');
request.onload = function () {
	if (request.status >= 200 && request.status < 400) {
		var config = JSON.parse(this.response);
		console.log(config);
		document.title = config.title;

		var itemlistHTML = '';
		for (var i = 0; i < config.items.length; i++) {
			var item = config.items[i];
			itemlistHTML += '<a href="'+item.link+'" title="'+item.alt+'"><i class="'+item.icon+' fa-fw"></i></a>';
		}
		document.getElementById("itemlist").innerHTML = itemlistHTML;
	} else {
		var error_text = "Error: "+request.status;
		console.error(error_text);
		document.title = error_text;
	}
}
request.send(null);

function addTriangleTo(target) {
	var dimensions = target.getClientRects()[0];
	var pattern = Trianglify({
		width: dimensions.width,
		height: dimensions.height
	});

	target.style['background-image'] = 'url(' + pattern.png() + ')';
	target.style['background-size'] = 'cover';
	target.style['-webkit-background-size'] = 'cover';
	target.style['-moz-background-size'] = 'cover';
	target.style['-o-background-size'] = 'cover';
}

var resizeTimer;
window.addEventListener("resize", function () {
	clearTimeout(resizeTimer);
	resizeTimer = setTimeout(function() {
		addTriangleTo(homepage);
	}, 400);
})

addTriangleTo(homepage);
