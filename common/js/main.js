"use strict";
// HACK: Extract the TOML parser from fast-toml sinceit's not es6 module compatible
window.module = {};
window.addEventListener("load", async (event) => {
	window.TOML = window.module.exports;
	let response = await fetch("config.toml");
	if(!response.ok) {
		document.title = `Error: ${response.status} ${response.statusText}`;
		throw new Error(document.title);
	}
	
	let config = TOML.parse(await response.text());
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
	let itemlist = document.querySelector(".itemlist");
	
	// Clear out the old ones
	for(let child of itemlist.children)
		itemlist.removeChild(child);
	
	// Generate the new list
	if(typeof config.folders !== "undefined")
		itemlist.appendChild(create_folder_list(config.folders));
	if(typeof config.items !== "undefined")
		itemlist.appendChild(create_item_list(config.items));
}

function create_folder_list(folders) {
	let result = document.createDocumentFragment();
	for(let folder of folders) {
		result.appendChild(create_folder(folder));
	}
	return result;
}

function create_folder(folder) {
	let result = document.createElement("span");
	result.classList.add("folder");
	result.addEventListener("click", handle_folder_click);
	let container = document.createElement("span");
	result.appendChild(container);
	if(typeof folder.items !== "undefined")
		container.appendChild(create_item_list(folder.items));
	return result;
}

function create_item_list(items) {
	let fragment = document.createDocumentFragment();
	for(let item_spec of items) {
		fragment.appendChild(create_item(item_spec));
	}
	return fragment;
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

function handle_folder_click(event) {
	let target = event.target.closest(".folder");
	let contains = target.classList.contains("active");
	target.classList.toggle("active");
	if(!contains) {
		event.stopPropagation();
		event.preventDefault();
		return false;
	}
}
