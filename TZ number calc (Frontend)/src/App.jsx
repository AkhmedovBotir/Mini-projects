import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const categories = [
  { value: "math", label: "Math" },
  { value: "trivia", label: "Trivia" },
  { value: "date", label: "Date" },
];

export default function App() {
  const [category, setCategory] = useState("math");
  const [number, setNumber] = useState("");
  const [isRandom, setIsRandom] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isRandom && (number === "" || !/^\\d+$/.test(number))) {
      setError("Число должно быть в виде цифры");
      return;
    }
    setError("");
    navigate("/result", {
      state: {
        category,
        number: isRandom ? "random" : number,
        isRandom,
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200">
      <form
        onSubmit={handleSubmit}
        className="backdrop-blur-md bg-white/30 border border-white/40 shadow-xl p-8 rounded-2xl w-full max-w-md transition-all duration-300"
      >
        <h1 className="text-3xl font-extrabold mb-6 text-center text-gray-800 drop-shadow">Number Facts</h1>
        <div className="mb-4">
          <label className="block mb-2 font-medium text-gray-700">Category</label>
          <select
            className="w-full border border-white/50 bg-white/40 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4 flex items-center gap-2">
          <input
            type="checkbox"
            id="random"
            checked={isRandom}
            onChange={() => {
              setIsRandom((r) => !r);
              setError("");
            }}
            className="accent-blue-500 w-4 h-4"
          />
          <label htmlFor="random" className="cursor-pointer text-gray-700 select-none">
            Random
          </label>
        </div>
        {!isRandom && (
          <div className="mb-4">
            <label className="block mb-2 font-medium text-gray-700">Number</label>
            <input
              type="text"
              className="w-full border border-white/50 bg-white/40 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              disabled={isRandom}
              placeholder="Enter a number"
            />
          </div>
        )}
        {error && (
          <div className="mb-4 text-red-500 text-sm text-center">{error}</div>
        )}
        <button
          type="submit"
          className="w-full bg-blue-500/80 hover:bg-blue-600/90 text-white py-2 rounded-lg font-semibold shadow-md transition"
        >
          Get Fact
        </button>
      </form>
    </div>
  );
}
