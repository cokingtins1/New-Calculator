const numberButtons = document.querySelectorAll("[data-number]")
const operatorButtons = document.querySelectorAll("[data-operator]")
const buttons = document.querySelectorAll("button")
const equalsButton = document.querySelector("[data-equals]")
const clearButton = document.querySelector("[data-clear]")
const deleteButton = document.querySelector("[data-delete]")

const previousTextElement = document.querySelector("[data-previousOperand]")
const currentTextElement = document.querySelector("[data-currentOperand]")

class Calculator {
	constructor(previousText, currentText) {
		this.previousText = previousText
		this.currentText = currentText
		this.clear()
	}

	clear() {
		previousTextElement.innerText = ""
		currentTextElement.innerText = ""
		this.currentOperand = ""
		this.previousOperand = ""
		this.operation = undefined
	}

	appendNumber(number) {
		if (number === "." && this.currentOperand.includes(".")) return
		this.currentOperand = this.currentOperand.toString() + number.toString()
	}

	delete() {
		this.currentOperand = this.currentOperand.slice(0, -1)
		this.updateDisplay()
	}

	chooseOperation(operation) {
		if (this.operation === undefined) {
			previousTextElement.innerText =
				this.currentOperand + " " + operation
			this.previousOperand = this.currentOperand
			this.operation = operation
			this.currentOperand = ""
		} else {
			previousTextElement.innerText = this.compute() + " " + operation
			currentTextElement.innerText = this.compute()
			this.operation = operation
			this.currentOperand = ""
		}
	}

	compute() {
		let computation
		const prev = parseFloat(this.previousOperand)
		const current = parseFloat(this.currentOperand)
		switch (this.operation) {
			case "+":
				computation = prev + current
				break
			case "-":
				computation = prev - current
				break
			case "÷":
			case "/":
				computation = prev / current
				break
			case "x":
			case "*":
				computation = prev * current
				break
			default:
				return
		}

		return computation
	}

	updateDisplay() {
		if (previousTextElement.innerText === "") {
			currentTextElement.innerText = this.currentOperand
		} else {
			previousTextElement.innerText =
				this.previousOperand +
				" " +
				this.operation +
				" " +
				this.currentOperand
		}
	}
}

const calculator = new Calculator(previousTextElement, currentTextElement)

document.addEventListener("keydown", (e) => {
	const key = e.key
	if (/[+\-*/]/.test(key)) {
		e.preventDefault
		calculator.chooseOperation(key)
	} else if (/\d/.test(key)) {
		e.preventDefault
		calculator.appendNumber(key)
		calculator.updateDisplay()
	} else if ((e.key = "Enter")) {
		e.preventDefault
		currentTextElement.innerText = calculator.compute()
	}
})

numberButtons.forEach((button) => {
	button.addEventListener("click", () => {
		calculator.appendNumber(button.innerText)
		calculator.updateDisplay()
	})
})

operatorButtons.forEach((button) => {
	button.addEventListener("click", () => {
		calculator.chooseOperation(button.innerText)
	})
})

equalsButton.addEventListener("click", () => {
	currentTextElement.innerText = calculator.compute()
})

clearButton.addEventListener("click", () => {
	calculator.clear()
})

deleteButton.addEventListener("click", () => {
	calculator.delete()
})
