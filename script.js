const keys = {
   numKeys: document.querySelector(".container-numkeys"),
   display: document.querySelector("#input"),
   result: document.querySelector("#recent-input"),
   del: document.querySelector("#del"),
   clear: document.querySelector("#clear"),
   evaluate: document.querySelector("#compute"),
};

const logic = {
   previousResult: 0,
   hasOperator: false,
   hasDecimal: [false, false],
};

(function () {
   removeDisplay();
   keys.numKeys.addEventListener("click", setDisplay);
   keys.del.addEventListener("click", removeChar);
   keys.clear.addEventListener("click", removeDisplay);
   keys.evaluate.addEventListener("click", expressionCompute);
})();

function setDisplay(e, result) {
   const specialKeys = ["clear", "del", "compute"];
   const operators = ["+", "-", "×", "÷"];
   const value = e ? e.target.id : result;

   //I used event delagation in this project
   if (e) {
      if (specialKeys.includes(value) || value === undefined) {
         // So this "if" logic prevents unwanted value in the display
         return;
      } else if (operators.includes(value) && !logic.hasOperator) {
         // prevents multiple operator at a time
         keys.display.value += value;
         logic.hasOperator = true;
      } else if (value === ".") {
         const index = logic.hasOperator ? 1 : 0;
         if (logic.hasDecimal[index]) return;

         logic.hasDecimal[index] = true;
         keys.display.value += value;
         return;
      }

      // only allows 1 decimal in one expression lol
      if (value != "." && !operators.includes(value)) {
         // if user pressed a digit after evaluating rather an operator
         // remove the vaue for previous result
         if (logic.previousResult && !logic.hasOperator) {
            keys.display.value = value;
            handlerResult();
            return;
         }

         keys.display.value += value;
      }
   }

   if (result) {
      keys.display.value = value;
      handlerResult(value);
   }
}

function handlerResult(hasResult) {
   if (hasResult) {
      keys.result.textContent = hasResult;
      logic.previousResult = hasResult;
   } else {
      keys.result.textContent = `Previous = ${logic.previousResult}`;
      logic.previousResult = 0;
   }
}

// function truncquate() {

// }

function removeDisplay() {
   keys.display.value = "";
}

function removeChar() {
   const value = keys.display.value;
   keys.display.value = value.slice(0, value.length - 1);
}

function expressionFilter() {
   let operator,
      operand_1,
      operand_2,
      expression = keys.display.value;

   for (let char of expression) {
      if (
         char == "+" ||
         char == "-" ||
         char == "×" ||
         char == "÷" ||
         char == "%"
      ) {
         operator = char;
         [operand_1, operand_2] = expression.split(char);
      }
   }

   // checks if the number includes decimal
   return [Number(operand_1), operator, Number(operand_2)];
}

function expressionCompute() {
   let [op1, op, op2] = expressionFilter();
   if (op1 == undefined || op2 == undefined) return;
   let result;

   switch (op) {
      case "+":
         result = op1 + op2;
         break;
      case "-":
         result = op1 - op2;
         break;
      case "×":
         result = op1 * op2;
         break;
      case "÷":
         result = (op1 / op2).toFixed(3);
         break;
      case "%":
         result = op1 % op2;
         break;
   }

   logic.hasDecimal = false;
   logic.hasOperator = false;
   setDisplay(false, result);
}
