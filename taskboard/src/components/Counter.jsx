import { useState } from "react";

// Lab 4.1: Counter with bounded decrement and updater-based increments.
function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div className="counter">
      <p>Count: {count}</p>
      <button type="button" onClick={() => setCount((value) => Math.max(0, value - 1))}>Minus</button>
      <button type="button" onClick={() => setCount((value) => value + 1)}>Plus</button>
      <button type="button" onClick={() => {
        for (let index = 0; index < 5; index++) setCount((value) => value + 1);
      }}>Plus 5</button>
      <button type="button" onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}

export default Counter;