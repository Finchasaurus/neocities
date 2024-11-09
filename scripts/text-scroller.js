const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";

document.querySelectorAll(".play-animation.text-scroll").forEach((element) => {
	setInterval(() => {
		Array.from(element.childNodes).forEach((node) => {
			if (node.nodeType === Node.TEXT_NODE) {
				node.textContent = node.textContent
					.split("")
					.map(() => letters[Math.floor(Math.random() * letters.length)])
					.join("");
			}
		});
	}, 30);
});
