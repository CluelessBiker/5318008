// VARIABLES : from DOM
const themeButton = document.getElementById("themeButton");

// VARIABLES :
let isLightTheme = true;

/**
 * Switch themes
 */
const switchTheme = () => {
	const themeStyleSheet = document.getElementById("themeStyleSheet");

	const newStyleSheet = isLightTheme
		? "assets/css/dark.css"
		: "assets/css/light.css";

	themeStyleSheet.setAttribute("href", newStyleSheet);

	themeButton.innerHTML = isLightTheme
		? `<i class="fa-solid fa-sun"></i>`
		: `<i class="fa-solid fa-moon"></i>`

	isLightTheme = !isLightTheme;
};

themeButton.addEventListener("click", switchTheme);