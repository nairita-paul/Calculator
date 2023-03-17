import React from "react";
import "./App.css";

function App() {
  const [input, setInput] = React.useState({
    value: "0",
  });

  const operators = ["+", "-", "*", "/"];

  const createDigits = () => {
    const digits = [];
    for (let i = 1; i < 10; i++) {
      digits.push(
        <button key={i} onClick={() => digitClick(i)}>
          {i}
        </button>
      );
    }
    return digits;
  };

  const digits = createDigits();

  function digitClick(i) {
    if (i === "X" && input.value.length === 1) {
      setInput({ value: "0" });
    } else if (i === "X") {
      setInput((prevInput) => {
        const numToString = prevInput.value.toString();
        return {
          value: numToString.slice(0, -1),
        };
      });
    } else if (input.value === "0") {
      if (operators.includes(i)) {
        return setInput({ value: "0" });
      } else {
        setInput({ value: i.toString() });
      }
    } else if (operators.includes(i)) {
      setInput((prevInput) => {
        const lastChar = prevInput.value.charAt(prevInput.value.length - 1);
        if (operators.includes(lastChar)) {
          return {
            value: prevInput.value.slice(0, prevInput.value.length - 1) + i,
          };
        } else {
          return { value: prevInput.value + i };
        }
      });
    } else if (i === ".") {
      if (!input.value.includes(".")) {
        setInput((prevInput) => {
          return { value: prevInput.value + i };
        });
      }
    } else {
      setInput((prevInput) => {
        return { value: prevInput.value + i };
      });
    }
  }

  function clear() {
    setInput({ value: "0" });
  }

  return (
    <div className="app">
      <div>
        <div className="display">
          <p>{input.value}</p>
        </div>
      </div>

      <div className="operators">
        <button
          onClick={() => {
            digitClick("+");
          }}
        >
          {" "}
          +{" "}
        </button>
        <button onClick={() => digitClick("-")}> - </button>
        <button onClick={() => digitClick("*")}> * </button>
        <button onClick={() => digitClick("/")}> / </button>
        <button onClick={() => digitClick("X")}> X </button>
        <button onClick={clear}> Clear </button>
      </div>

      <div className="numbers">
        {digits}
        <button onClick={() => digitClick(0)}>0</button>
        <button onClick={() => digitClick(".")}>.</button>
        <button
          onClick={() => {
            const val = eval(input.value);
            setInput({ value: val });
          }}
        >
          =
        </button>
      </div>
    </div>
  );
}

export default App;
