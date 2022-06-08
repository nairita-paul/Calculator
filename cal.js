let screenDisplay = document.getElementById("screen");
let btn = document.getElementsByClassName("buttons")[0];
function btnonclick(num) {
  screenDisplay.innerText = screenDisplay.innerText + num;
}

function calculation() {
  let result = eval(screenDisplay.innerText);
  screenDisplay.innerText = `${screenDisplay.innerText}=${result}`;
}

function clearScreen() {
  screenDisplay.innerText = "";
}
