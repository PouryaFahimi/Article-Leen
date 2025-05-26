import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Feed from "./components/Feed";
function App() {
  return (
    <div className="backColor">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="feed" element={<Feed />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
