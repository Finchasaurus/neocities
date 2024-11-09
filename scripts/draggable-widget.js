let closed = [];
let highestZIndex = 1;

const FIX_FORMATTING_MIN = 768;
const container = document.getElementsByClassName("widget-container")[0];
const placeholders = new Map();

function drag(element) {
	let currentX = 0;
	let currentY = 0;
	let previousX = 0;
	let previousY = 0;
	let offsetX = 0;
	let offsetY = 0;
	let hadPlayAnimation = false;
	let placeholder = null;

	function dragMouseDown(e) {
		if (window.innerWidth < FIX_FORMATTING_MIN) return;
		e.preventDefault();

		currentX = previousX - e.clientX;
		currentY = previousY - e.clientY;
		previousX = e.clientX;
		previousY = e.clientY;

		const rect = element.getBoundingClientRect();
		offsetX = e.clientX - rect.left;
		offsetY = e.clientY - rect.top;
		element.style.position = "absolute";

		highestZIndex++;
		element.style.zIndex = highestZIndex;

		hadPlayAnimation = element.classList.contains("play-animation");
		element.classList.remove("play-animation");

		if (!placeholders.has(element)) {
			placeholder = document.createElement("div");
			placeholder.style.width = `${rect.width}px`;
			placeholder.style.height = `${rect.height}px`;
			placeholder.style.visibility = "hidden";
			placeholder.classList.add("widget-placeholder");

			container.insertBefore(placeholder, element);
			placeholders.set(element, placeholder);
		}

		document.onmouseup = closeDragElement;
		document.onmousemove = elementDrag;
	}

	function closeDragElement() {
		document.onmouseup = null;
		document.onmousemove = null;

		if (hadPlayAnimation) element.classList.add("play-animation");
	}

	function elementDrag(e) {
		e.preventDefault();

		currentX = previousX - e.clientX;
		currentY = previousY - e.clientY;
		previousX = e.clientX;
		previousY = e.clientY;

		const newX = e.clientX - offsetX;
		const newY = e.clientY - offsetY;

		if (window.innerWidth < FIX_FORMATTING_MIN) return;

		element.style.left = newX + "px";
		element.style.top = newY + "px";
	}

	const header = element.querySelector(".widget-header");
	if (header) header.onmousedown = dragMouseDown;
	else element.onmousedown = dragMouseDown;
}

function exit(element) {
	const exit = element.querySelector("button");
	if (!exit) return;

	function closeElement() {
		closed.push(element);
		element.remove();
	}

	exit.onclick = closeElement;
}

function click(element) {
	for (const widget of closed) {
		container.appendChild(widget);
	}
	closed = [];
}

const widgets = document.getElementsByClassName("widget");
for (let widget of widgets) {
	drag(widget);
	exit(widget);
}

const displayButtons = document.getElementsByClassName("display-widgets");
for (let button of displayButtons) {
	button.onclick = click;
}

const resizeObserver = new ResizeObserver(() => {
	if (window.innerWidth >= FIX_FORMATTING_MIN) return;
	for (let widget of widgets) {
		widget.style.left = 0;
		widget.style.top = 0;
		widget.style.position = "relative";
	}
});

resizeObserver.observe(container);
