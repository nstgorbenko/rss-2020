class Calculator {
    constructor(previousOperandScreen, currentOperandScreen) {
        this.previousOperandScreen = previousOperandScreen;
        this.currentOperandScreen = currentOperandScreen;
        this.isComputationFinished = false;
        this.clear();
    }

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = null;
    }

    delete() {
        this.currentOperand = this.currentOperand.slice(0, -1);
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.indexOf('.') !== -1) {
            return;
        }

        if (number === '.' && this.currentOperand === '') {
            this.currentOperand += '0.';
            return;
        }

        if (number !== '.' && this.currentOperand === '0') {
            this.currentOperand = number;
            return;
        }

        this.currentOperand += number;
    }

    chooseOperation(operation) {
        if (this.currentOperand === '' && this.previousOperand === '') {
            return;
        };

        if (this.currentOperand === '' && this.previousOperand !== '') {
            this.operation = operation;
            return;
        };

        if (this.currentOperand !== '' && this.previousOperand !== '') {
            this.compute();
        };

        this.operation = operation;
        this.previousOperand = this.currentOperand.slice(-1) === '.'
            ? this.currentOperand.slice(0, -1)
            : this.currentOperand;
        this.currentOperand = '';
    }

    compute() {
        const firstValue = parseFloat(this.previousOperand);
        const secondValue = parseFloat(this.currentOperand);

        if (isNaN(firstValue) || isNaN(secondValue)) {
            return;
        };

        let computationResult;
        switch (this.operation) {
            case '+':
                computationResult = firstValue + secondValue;
                break;
            case '-':
                computationResult = firstValue - secondValue;
                break;
            case '*':
                computationResult = firstValue * secondValue;
                break;
            case '÷':
                computationResult = firstValue / secondValue;
                break;
            default:
                throw new Error(`Unknown operation type: ${this.operation}`);
        }

        this.isComputationFinished = true;
        this.currentOperand = computationResult.toString();
        this.previousOperand = '';
        this.operation = null;
    }

    getDisplayNumber(number) {
        const integerDigits = number.split('.')[0].toLocaleString();
        const decimalDigits = number.split('.')[1];

        return isNaN(decimalDigits)
            ? integerDigits
            : `${integerDigits}.${decimalDigits}`;    
    }

    updateDisplay() {
        this.currentOperandScreen.innerText = this.getDisplayNumber(this.currentOperand);

        this.previousOperandScreen.innerText = this.operation != null
            ? `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
            : '';
    }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandScreen = document.querySelector('[data-previous-operand]');
const currentOperandScreen = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandScreen, currentOperandScreen);

numberButtons.forEach((button) => {
    button.addEventListener("click", () => {
        if (calculator.previousOperand === "" && calculator.isComputationFinished) {
            calculator.currentOperand = "";
            calculator.isComputationFinished = false;
        }
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay();
    });
});

operationButtons.forEach((button) => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})

equalsButton.addEventListener('click', (button) => {
    calculator.compute();
    calculator.updateDisplay();
})

allClearButton.addEventListener('click', (button) => {
    calculator.clear();
    calculator.updateDisplay();
})

deleteButton.addEventListener('click', (button) => {
    calculator.delete();
    calculator.updateDisplay();
})