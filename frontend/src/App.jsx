import { useState } from "react";
import axios from "axios";

function App() {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const calculate = async () => {
    if (!expression.trim()) return; // Prevent calculation if the input is empty

    setLoading(true);
    try {
      const response = await axios.post("/api/calculate", { expression });
      setResult(response.data.result);
    } catch (error) {
      setResult("Error: " + (error.response?.data?.result || "Server error"));
      console.error("Calculation error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        value={expression}
        onChange={(e) => setExpression(e.target.value)}
        placeholder="Enter expression"
        aria-label="Expression input"
        type="text"
        disabled={loading}
      />
      <button
        onClick={calculate}
        disabled={!expression.trim() || loading}
        aria-label="Calculate expression"
      >
        {loading ? "Calculating..." : "Calculate"}
      </button>
      <div>Result: {result}</div>
    </div>
  );
}

export default App;