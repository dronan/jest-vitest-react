import "./App.css";
import { useState } from "react";
import { kebabCaseToTitleCase } from "./helpers";

function App() {
  const [disabled, setDisabled] = useState(false);
  const [buttonColor, setButtonColor] = useState("red");
  const nextColorClass = buttonColor === "red" ? "blue" : "red";
  const nextColorTitleCase = kebabCaseToTitleCase(nextColorClass);
  const className = disabled ? "gray" : buttonColor;

  return (
    <div>
      <button
        className={className}
        disabled={disabled}
        onClick={() => setButtonColor(nextColorClass)}
      >
        Change to {nextColorTitleCase}
      </button>
      <br />
      <input
        type="checkbox"
        id="disable-button-checkbox"
        defaultChecked={disabled}
        onChange={(e) => setDisabled(e.target.checked)}
      />
      <label htmlFor="disable-button-checkbox">Disable button</label>
    </div>
  );
}

export default App;
