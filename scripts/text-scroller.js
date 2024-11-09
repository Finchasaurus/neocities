const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";

document.querySelectorAll(".play-animation.text-scroll").forEach((element) => {
	setInterval(() => {
		element.innerText = element.innerText
			.split("")
			.map((c, i) => {
				return letters[Math.floor(Math.random() * letters.length)];
			})
			.join("");
	}, 30);
});
