import React, { useRef, useContext, useState } from "react";
import LabelContext from "../../../store/labelContext";

function LabelInputForm() {
  const labelInputRef = useRef();
  const labelCtx = useContext(LabelContext);
  const [userInput, setUserInput] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    labelCtx.addLabel(labelInputRef.current.value);
    setUserInput("");
  };

  return (
    <form onSubmit={submitHandler}>
      <input
        type="text"
        placeholder="Enter New Label"
        required
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        ref={labelInputRef}
      />
      <button>Add</button>
    </form>
  );
}

export default LabelInputForm;
