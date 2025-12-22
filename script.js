/* 
   Parts:
   1. Make a object containing the keys, numbers, operators
   2. function for displaying the corresponding numbers and operators
   3. function for processing / evaluating the input from display
      * must prevent from inputing 2 decimal or dot ** Disabling the button
      * display error if 1 operand is provided
      * should only compute / evaluate 2 number at a time then save it to a result variable
*/

const numKeys = document.querySelector(".container-numkeys");
const display = document.querySelector("#input");
const del = document.querySelector("#del");
const clear = document.querySelector("#clear");

(function () {
   removeDisplay();
   numKeys.addEventListener("click", setDisplay);
   del.addEventListener("click", removeDisplay);
   clear.addEventListener("click", removeChar);
})();

function setDisplay(e) {
   const value = e.target.id;
   if (value === undefined || ["clear", "del", "compute"].includes(value)) return
   display.value += value;
}

function removeDisplay() {
   display.value = "";
}

function removeChar() {
   const value = display.value
   display.value = value.slice(0, value.length - 1)
}
