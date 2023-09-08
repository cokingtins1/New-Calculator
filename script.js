const numberButtons = document.querySelectorAll("[data-number]")
const operatorButtons = document.querySelectorAll("[data-operator]")
const buttons = document.querySelectorAll("button")

const previousTextElement = document.querySelector("[data-previousOperand]")
const currentTextElement = document.querySelector("[data-currentOperand]")

class Calculator {
	constructor(previousText, currentText) {
		this.previousText = previousTextElement
		this.currentText = currentTextElement
		this.clear()
	}

	clear() {
		this.currentOperand = ""
		this.previousOperand = ""
		this.operation = ""
	}

	appendNumber(number) {
		this.currentOperand = this.currentOperand + number
	}

	updateDisplay() {
		console.log(this.currentOperand)
	}
}

const calculator = new Calculator(previousTextElement, currentTextElement)

numberButtons.forEach((button) => {
	button.addEventListener("click", () => {
		calculator.appendNumber(button.innerText)
		calculator.updateDisplay()
	})
})

operatorButtons.forEach((button) => {
	button.addEventListener("click", () => {})
})
