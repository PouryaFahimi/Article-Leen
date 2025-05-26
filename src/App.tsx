import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Feed from "./components/Feed";
import Editor from "./components/Editor";
function App() {
  return (
    <div className="backColor">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="feed" element={<Feed />} />
            <Route path="compose" element={<Editor />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
