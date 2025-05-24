import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
function App() {
  return (
    <div className="backColor">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
