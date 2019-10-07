"use strict";
window.module = {}; // HACK: Get ion-parser to work without Rollup

window.addEventListener("load", async (event) => {
	let response = await fetch("config.toml");
	if(!response.ok) {
		document.title = `Error: ${response.status} ${response.statusText}`;
		throw new Error(document.title);
	}
	
	let config = ION.parse(await response.text());
	apply_config(config);
});

function apply_config(config) {
	console.log("Applying config", config);
	document.title = config.title;
	
	document.getElementById("icon_link").href = config.favicon_url;
	
	apply_item_list(config);
	apply_background(config);
}

function apply_item_list(config) {
	let itemlist = document.getElementById("itemlist");
	
	// Clear out the old ones
	for(let child of itemlist.children)
		itemlist.removeChild(child);
	
	// Generate the new list
	let fragment = document.createDocumentFragment();
	for(let item_spec of config.items) {
		
		fragment.appendChild(create_item(item_spec));
	}
	itemlist.appendChild(fragment);
}

function create_item(item_spec) {
	// Create the hyperlink
	let item_html = document.createElement("a");
	item_html.setAttribute("href", item_spec.link);
	item_html.setAttribute("title", item_spec.label);
	
	// Render the icon
	let icon_mode = item_spec.icon_mode || "fontawesome";
	let icon = null;
	switch(icon_mode) {
		case "fontawesome":
			icon = document.createElement("span");
			icon.classList.add("fa-fw", ...item_spec.icon.split(" "));
			break;
		case "image":
			icon = document.createElement("img");
			icon.src = item_spec.icon;
			break;
	}
	
	// Put it all together and return it
	item_html.appendChild(icon);
	return item_html;
}


function apply_background(config) {
	switch(config.background.mode) {
		case "triangles":
			addTriangleTo(homepage);
			window.addEventListener("resize", triangle_handle_resize);
			break;
		
		case "static":
			document.body.style.backgroundImage = `url('${config.background.url}')`;
			break;
		
		default:
			alert(`Error: Unknown background mode ${config.background.mode}`);
	}
	
}

function addTriangleTo(target) {
	let dimensions = target.getClientRects()[0];
	let pattern = Trianglify({
		width: dimensions.width,
		height: dimensions.height
	});

	target.style['background-image'] = 'url(' + pattern.png() + ')';
	target.style['background-size'] = 'cover';
	target.style['-webkit-background-size'] = 'cover';
	target.style['-moz-background-size'] = 'cover';
	target.style['-o-background-size'] = 'cover';
}

function triangle_handle_resize() {
	clearTimeout(window.resizeTimer);
	window.resizeTimer = setTimeout(function() {
		addTriangleTo(homepage);
	}, 400);
}
