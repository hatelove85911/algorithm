operFun = {
	'+': function (a, b) {
		return a + b
	},
	'-': function (a, b) {
		return a - b
	},
	'*': function (a, b) {
		return a * b
	},
	'/': function (a, b) {
		return a / b
	}
}

operPior = {
	'+': 1,
	'-': 1,
	'*': 2,
	'/': 2
}

function isOperator(char) {
	return char === '+' || char === '-' || char === '*' || char === '/'
}

function doCalc(operands, operators) {

	if (operators.length > 0) {
		var oper = operators.pop()
		var operand2 = operands.pop()
		var operand1 = operands.pop()

		var tmp = operFun[oper](operand1, operand2)
		operands.push(tmp)
		return doCalc(operands, operators)
	} else if (operands.length === 1) {
		return operands.pop()
	} else {
		return 0
	}

}

function calculator (formula) {
	formula = formula.replace(/ /g, '')
	var operands = []
	var operators = []

	var digitBuffer = []
	for (var i = 0; i < formula.length; i++) {
		var curr = formula[i]

		if (isOperator(curr)) {
			if (digitBuffer.length > 0) {
				operands.push(+digitBuffer.join(''))
				digitBuffer = []				
			}

			lastOperator = operators.slice(-1)[0]
			// check if operator stack is empty
			if (operators.length === 0 || operPior[curr] > operPior[lastOperator]) {
				operators.push(curr)
			} else {
				// else current is lower than previous, then do calculation for previous operator
				var tmp = doCalc(operands, operators)
				operands.push(tmp)
				operators.push(curr)
			}
		} else {
			digitBuffer.push(curr)
		}
	}
	if (digitBuffer.length > 0) {
		operands.push(+digitBuffer.join(''))
		digitBuffer = []
	}
	return doCalc(operands, operators)
}