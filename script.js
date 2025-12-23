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

const numKeys = document.querySelector(".container-numkeys");
const display = document.querySelector("#input");
const del = document.querySelector("#del");
const clear = document.querySelector("#clear");
const evaluate = document.querySelector("#compute");

(function () {
   removeDisplay();
   numKeys.addEventListener("click", setDisplay);
   del.addEventListener("click", removeDisplay);
   clear.addEventListener("click", removeChar);
   evaluate.addEventListener("click", expressionCompute);
})();

function setDisplay(e) {
   const value = e.target.id;
   if (value === undefined || ["clear", "del", "compute"].includes(value))
      return;
   display.value += value;
}

function removeDisplay() {
   display.value = "";
}

function removeChar() {
   const value = display.value;
   display.value = value.slice(0, value.length - 1);
}

function expressionFilter() {
   let operator,
      operand_1,
      operand_2,
      expression = display.value;

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
   // 
   // split the operands by the operator
   let [op1, op, op2] = expressionFilter();

   switch (op) {
      case "+":
         display.value = op1 + op2;
         break;
      case "-":
         display.value = op1 - op2;
         break;
      case "×":
         display.value = op1 * op2;
         break;
      case "÷":
         display.value = (op1 / op2).toFixed(3);
         break;
      case "%":
         display.value = op1 % op2;
         break;
   }
}

