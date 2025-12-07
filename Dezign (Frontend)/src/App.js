import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"
import Work from "./pages/Work"
import About from "./pages/About"
import NoPage from "./pages/NoPage"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" index element={<Home />} />
        <Route path="/work" element={<Work />} />
        <Route path="/about" element={<About />} />
        <Route path="/*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}