/* 
   Parts:
   1. Make a object containing the keys, numbers, operators //
   2. function for displaying the corresponding numbers and operators //
   3. function for processing / evaluating the input from display 
      * must prevent from inputing 2 decimal or dot ** Disabling the button
      * display error if 1 operand is provided
      * should only compute / evaluate 2 number at a time then save it to a result variable

   extra:
      may animation after idisplay ung result tas pag pipindot ulit ng number ung number magsslide pataas

   */

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
   // can be use to check if the expression alreadry has a opeartor
   // if yes compute when clicked a new operator
   // if not dont do anything
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

   if (e) {
      if (specialKeys.includes(value) || value === undefined) return;
      else if (operators.includes(value) && !logic.hasOperator) {
         keys.display.value += value;
         logic.hasOperator = true;
      } 
      
      if (!operators.includes(value)) {
         keys.display.value += value
      }
   }

   if (result) {
      keys.display.value = value;
   }
}

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

   return [parseInt(operand_1), operator, parseInt(operand_2)];
}

function expressionCompute() {
   // must calculate 2 operand at a time
   // must only have 1 operator at a time
   // Scenario:
   // 1 + 2 "+";
   // if the user presses another operator,
   // it should compute first and display the result 1 + 2 = 3
   // result + 5 = 8 ; should use the previous result as the first number

   // checks if "previousResult" is empty
   // a logic that sets "hasOperator" to true and attach a listener to it
   // a logic that sets the "hasOperator" to false to remove the listener

   let [op1, op, op2] = expressionFilter();
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

   // set a value to "previousDisplay"
   setDisplay(false, result);
}
