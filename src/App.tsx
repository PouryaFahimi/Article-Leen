import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Feed from "./components/feed/Feed";
import LoginPage from "./components/login/LoginPage";
import EditorPage from "./components/EditorPage";
import Profile from "./components/profile/Profile";
import FullView from "./components/feed/FullView";

function App() {
  return (
    <div className="backColor">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="login" element={<LoginPage />} />
            <Route path="feed" element={<Feed />} />
            <Route path="compose" element={<EditorPage />}>
              <Route path=":articleId" element={<EditorPage />} />
            </Route>
            <Route path=":username" element={<Profile />} />
            <Route path="articles/:articleId" element={<FullView />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
