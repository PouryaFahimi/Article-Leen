import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Feed from "./components/Feed";
import LoginPage from "./components/login/LoginPage";
import EditorPage from "./components/EditorPage";
import Profile from "./components/profile/Profile";

function App() {
  return (
    <div className="backColor">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="login" element={<LoginPage />} />
            <Route path="feed" element={<Feed />} />
            <Route path="compose" element={<EditorPage />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
