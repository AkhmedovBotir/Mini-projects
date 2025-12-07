import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const categoryLabels = {
  math: "Math",
  trivia: "Trivia",
  date: "Date",
};

export default function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const { category, number, isRandom } = location.state || {};
  const [fact, setFact] = useState("");
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState("");

  useEffect(() => {
    if (!category || !number) {
      navigate("/", { replace: true });
      return;
    }
    setLoading(true);
    setApiError("");
    setFact("");
    let url = `http://numbersapi.com/${number}/${category}`;
    if (category === "date" && number === "random") {
      url = `http://numbersapi.com/random/date`;
    }
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("API error");
        return res.text();
      })
      .then((data) => setFact(data))
      .catch(() => setApiError("Ошибка при получении данных с API"))
      .finally(() => setLoading(false));
  }, [category, number, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200">
      <div className="backdrop-blur-md bg-white/30 border border-white/40 shadow-xl p-8 rounded-2xl w-full max-w-md transition-all duration-300">
        <h2 className="text-2xl font-extrabold mb-4 text-center text-gray-800 drop-shadow">Result</h2>
        <div className="mb-2 text-gray-700">
          <span className="font-medium">Category:</span> {categoryLabels[category]}
        </div>
        <div className="mb-2 text-gray-700">
          <span className="font-medium">Number:</span> {number}
        </div>
        {loading ? (
          <div className="text-gray-500 text-center">Loading...</div>
        ) : apiError ? (
          <div className="text-red-500 text-center">{apiError}</div>
        ) : (
          <div className="mt-4 text-lg text-center text-gray-900 drop-shadow-sm">{fact}</div>
        )}
        <button
          className="mt-6 w-full bg-blue-500/80 hover:bg-blue-600/90 text-white py-2 rounded-lg font-semibold shadow-md transition"
          onClick={() => navigate("/")}
        >
          Back
        </button>
      </div>
    </div>
  );
} 