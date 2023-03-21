import React from "react";
import "./App.css";

function App() {
  const [input, setInput] = React.useState("0");
  const [canEnterDecimalValue, setCanEnterDecimalValue] = React.useState(true);

  const operators = ["+", "-", "*", "/"];

  const createDigits = () => {
    const digits = [];
    for (let i = 1; i < 10; i++) {
      digits.push(
        <button key={i} onClick={() => handleDigits(i)}>
          {i}
        </button>
      );
    }

    digits.push(
      <button key={0} onClick={() => handleDigits(0)}>
        0
      </button>
    );
    return digits;
  };

  const digits = createDigits();

  function handleDigits(digit) {
    if (input === "0" || input === "Infinity") {
      setInput(digit.toString());
    } else {
      setInput((prevInput) => prevInput + digit.toString());
    }
  }

  function handleOperators(operator) {
    setCanEnterDecimalValue(true);
    if (input === "0" || input === "Infinity") {
      return;
    }
    setInput((prevInput) => {
      if (isLastCharAnOperator()) {
        return updateLastOperator(operator);
      } else {
        return prevInput + operator;
      }
    });

    function isLastCharAnOperator() {
      const lastChar = input.charAt(input.length - 1);
      return operators.includes(lastChar);
    }

    function updateLastOperator(operator) {
      return input.slice(0, input.length - 1) + operator;
    }
  }

  function handleDecimal() {
    if (canEnterDecimalValue) {
      setInput((prevInput) => {
        return prevInput + ".";
      });
    }
    setCanEnterDecimalValue(false);
  }

  function equalEvaluation() {
    const val = eval(input).toString();
    setInput(val);
  }

  function clear() {
    setCanEnterDecimalValue(true);
    setInput("0");
  }

  function handleBackspace() {
    if (input.length === 1 || input === "Infinity") {
      setInput("0");
    } else {
      setInput((prevInput) => {
        const numToString = prevInput.toString();
        return numToString.slice(0, -1);
      });
    }
  }

  return (
    <div className="app">
      <div>
        <div className="display">
          <p>{input}</p>
        </div>
      </div>

      <div className="operators">
        <button onClick={() => handleOperators("+")}> + </button>
        <button onClick={() => handleOperators("-")}> - </button>
        <button onClick={() => handleOperators("*")}> * </button>
        <button onClick={() => handleOperators("/")}> / </button>
        <button onClick={handleBackspace}> {"\u232B"} </button>
        <button onClick={clear}> Clear </button>
      </div>

      <div className="numbers">
        {digits}
        <button onClick={handleDecimal}>.</button>
        <button onClick={() => equalEvaluation("=")}> = </button>
      </div>
    </div>
  );
}

export default App;
