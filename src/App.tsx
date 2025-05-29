import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Feed from "./components/Feed";
import LoginPage from "./components/login/LoginPage";
import EditorPage from "./components/EditorPage";

function App() {
  return (
    <div className="backColor">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="login" element={<LoginPage />} />
            <Route path="feed" element={<Feed />} />
            <Route path="compose" element={<EditorPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
