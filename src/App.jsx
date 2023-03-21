import React from "react";
import "./App.css";

function App() {
  const [input, setInput] = React.useState({
    value: "0",
  });
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
    if (input.value === "0") {
      setInput({ value: digit.toString() });
    } else {
      setInput((prevInput) => ({ value: prevInput.value + digit.toString() }));
    }
  }

  function handleOperators(operator) {
    setCanEnterDecimalValue(true);
    if (input.value === "0") {
      return;
    }
    setInput((prevInput) => {
      if (isLastCharAnOperator()) {
        return {
          value: updateLastOperator(operator),
        };
      } else {
        return { value: prevInput.value + operator };
      }
    });

    function isLastCharAnOperator() {
      const lastChar = input.value.charAt(input.value.length - 1);
      return operators.includes(lastChar);
    }

    function updateLastOperator(operator) {
      return input.value.slice(0, input.value.length - 1) + operator;
    }
  }

  function handleDecimal() {
    if (canEnterDecimalValue) {
      setInput((prevInput) => {
        return { value: prevInput.value + "." };
      });
    }
    setCanEnterDecimalValue(false);
  }

  function equalEvaluation() {
    const val = eval(input.value).toString();
    setInput({ value: val });
  }

  function clear() {
    setCanEnterDecimalValue(true);
    setInput({ value: "0" });
  }

  function handleBackspace() {
    if (input.value.length === 1) {
      setInput({ value: "0" });
    } else {
      setInput((prevInput) => {
        const numToString = prevInput.value.toString();
        return {
          value: numToString.slice(0, -1),
        };
      });
    }
  }
  function handleInvalidInputs() {}

  return (
    <div className="app">
      <div>
        <div className="display">
          <p>{input.value}</p>
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
