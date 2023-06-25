document.addEventListener("DOMContentLoaded", function () {
	// BUTTON VALUES :
	const digits = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0, "."];
	const operators = [
		{ key: "8", value: "*", display: "x" },
		{ key: "/", value: "/", display: "%" },
		{ key: "=", value: "+", display: "+" },
		{ key: "-", value: "-", display: "-" },
		{ key: "x", value: "squared", display: "( )²" },
	];
	const actions = ["del", "ac", "="];

	// OBTAIN CONTAINERS :
	const numContainer = document.getElementById("numBtnCont");
	const operatorContainer = document.getElementById("opBtnCont");
	const actionContainer = document.getElementById("actionBtnCont");

	// VARIABLES : from DOM
	const prevNumTxt = document.getElementById("prevNum");
	const currentNumTxt = document.getElementById("currentNum");

	// VARIABLES :
	let prevNum = "";
	let currentNum = "";
	let operTask = undefined;

	/**
	 * Creation of buttons.
	 * Button variations dependent upon array passed.
	 * @param value
	 */
	const createButtons = (value) => {
		value.map((it, index) => {
			const button = document.createElement("button");
			button.className = "btn";
			button.innerText = it;

			if (value === digits) {
				button.classList.add("num");
				button.onclick = () => numPress(it);
				numContainer.appendChild(button);
				if (value.it === ".") {
					button.setAttribute("style", `order: 12`);
				} else if (value.it === 0) {
					button.setAttribute("style", `order: 11`);
				} else {
					button.setAttribute("style", `order: ${index + 1}`);
				}
			} else if (value === operators) {
				button.classList.add("op");
				button.innerText = it.display;
				button.onclick = () => operatorPress(it.value);
				operatorContainer.appendChild(button);
			} else {
				button.classList.add("act");
				button.onclick = () => actionPress(it);
				actionContainer.appendChild(button);
			}
		});
	};

	// ASSIGN KEYPRESS LISTENERS FOR CAL :
	document.addEventListener("keydown", (event) => {
		const press = parseInt(event.key);
		if (event.shiftKey) {
			if (event.key === "*") {
				operatorPress("*");
			}
		} else if (digits.includes(press)) {
			numPress(press);
		} else if (operators.some((it) => it.key === event.key)) {
			const operator = operators.find((it) => it.key === event.key);
			operatorPress(operator.value);
		} else if (event.key === "Backspace") {
			actionPress("del");
		} else if (event.key === "Enter") {
			actionPress("=");
		} else if (event.key === "c") {
			actionPress("ac");
		}
	});

	/**
	 * Reset all numbers
	 * Clear calculator screen
	 */
	const allClear = () => {
		currentNum = "";
		prevNum = "";
		operTask = undefined;
	};

	/**
	 * Delete last number entered
	 */
	const delNum = () => {
		currentNum = currentNum.toString().slice(0, -1);
	};

	/**
	 * Appends the last number to the "screen"
	 * Checks if number already includes a decimal
	 * @param {*} number
	 * @returns
	 */
	const appendNumScreen = (number) => {
		if (number === "." && currentNum.includes(".")) return;
		currentNum = currentNum.toString() + number.toString();
	};

	/**
	 * Determins which calculation to run.
	 * Checks first if a number has been added.
	 * Bypasses updating calc screen
	 * if operation is to square the number.
	 * @param {*} selectedOperation
	 * @returns
	 */
	const chooseOperation = (selectedOperation) => {
		if (currentNum === "") return;

		if (selectedOperation === "squared") {
			calculateSquare();
			updateScreen();
			return;
		}

		if (prevNum !== "") {
			calculate();
		}
		operTask = selectedOperation;
		prevNum = currentNum;
		currentNum = "";
	};

	/**
	 * Squares the value
	 * @returns
	 */
	const calculateSquare = () => {
		const current = parseFloat(currentNum);
		if (isNaN(current)) return;
		const calculation = current * current;
		currentNum = calculation;
		operTask = undefined;
		prevNum = "";
	};

	/**
	 * Performs the correct calculation
	 * @returns
	 */
	const calculate = () => {
		let calculation;
		const prev = parseFloat(prevNum);
		const current = parseFloat(currentNum);
		if (isNaN(prev) || isNaN(current)) return;
		switch (operTask) {
			case "+":
				calculation = prev + current;
				break;
			case "-":
				calculation = prev - current;
				break;
			case "*":
				calculation = prev * current;
				break;
			case "/":
				calculation = prev / current;
				break;
			default:
				return;
		}
		currentNum = calculation;
		operTask = undefined;
		prevNum = "";
	};

	/**
	 * Returns the formatted string representation
	 * of the number
	 * @param {*} number
	 * @returns
	 */
	const formatDisplayNum = (number) => {
		const stringNumber = number.toString();
		const integerDigits = parseFloat(stringNumber.split(".")[0]);
		const decimalDigits = stringNumber.split(".")[1];
		let integerDisplay;
		if (isNaN(integerDigits)) {
			integerDisplay = "";
		} else {
			integerDisplay = integerDigits.toLocaleString("en", {
				maximumFractionDigits: 0,
			});
		}
		if (decimalDigits != null) {
			return `${integerDisplay}.${decimalDigits}`;
		} else {
			return integerDisplay;
		}
	};

	/**
	 * Updates the calculator "screen"
	 * With the current number.
	 */
	const updateScreen = () => {
		currentNumTxt.innerText = formatDisplayNum(currentNum);
		if (operTask != null) {
			prevNumTxt.innerText = `${formatDisplayNum(prevNum)} ${operTask}`;
		} else {
			prevNumTxt.innerText = "";
		}
	};

	/**
	 * Entirely for my own amusement.
	 */
	const easterEgg = () => {
		console.log("hello to you too");
	};

	/**
	 * Detects the number keypad number
	 * that has been pressed.
	 * @param {*} value
	 */
	const numPress = (value) => {
		console.log(">>>NUMBERS : " + value);
		appendNumScreen(value);
		updateScreen();
	};

	/**
	 * Passes the mathematical operator
	 * to the equation.
	 * @param {*} value
	 */
	const operatorPress = (value) => {
		console.log(">>>OPERATOR : " + value);
		chooseOperation(value);
		updateScreen();
	};

	/**
	 * Checks which action to take next :
	 * Delete | Clear | Equals
	 * @param {*} value
	 */
	const actionPress = (value) => {
		if (value === "del") {
			console.log("deleteing your mistakes...");
			delNum();
			updateScreen();
		} else if (value === "ac") {
			console.log("....oh no! All gone.");
			allClear();
			updateScreen();
		} else {
			console.log("calculating your future");
			calculate();

			if (currentNum.toString() === "0.7734") {
				easterEgg();
			}

			if (value !== "squared") {
				updateScreen();
			}
		}
	};

	createButtons(digits);
	createButtons(operators);
	createButtons(actions);
});
