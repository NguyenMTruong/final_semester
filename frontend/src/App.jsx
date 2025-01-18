import { useSelector, useDispatch } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";

import { LayoutDefault } from "./layouts";
import { Login, SignUp } from "@/pages";
import { Home } from "@/pages";
import Search from "./pages/Search";
import Activity from "./pages/Activity";
import Profile from "./pages/Profile";
import User from "./pages/User";
import Post from "./pages/Post";
import Comment from "./pages/Comment";
import Result from "./pages/Result";

import "./App.scss";

function App() {
  const { isLogin } = useSelector((state) => state.auth);

  // Hàm bảo vệ trang chỉ cho phép truy cập khi đăng nhập
  const ProtectedRoute = ({ children }) => {
    if (!isLogin) {
      alert("Bạn chưa đăng nhập!");
      return <Navigate to="/login" />;
    }
    return children;
  };

  // Hàm điều hướng người dùng đã đăng nhập khỏi trang đăng ký/đăng nhập
  const RedirectIfLoggedIn = ({ children }) => {
    if (isLogin) {
      return <Navigate to="/" />;
    }
    return children;
  };

  return (
    <>
      <div className="app">
        <Routes>
          Các route không cần đăng nhâp
          <Route
            path="/login"
            element={
              <RedirectIfLoggedIn>
                <Login />
              </RedirectIfLoggedIn>
            }
          />
          <Route
            path="/signup"
            element={
              <RedirectIfLoggedIn>
                <SignUp />
              </RedirectIfLoggedIn>
            }
          />
          <Route path="/" element={<LayoutDefault />}>
            <Route path="" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/activity" element={<Activity />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/user" element={<User />} />
            <Route path="/post" element={<Post />} />
            <Route path="/comment" element={<Comment />} />
            <Route path="/result" element={<Result />} />
          </Route>
          {/* Các Route không hợp lệ */}
          {/* <Route path="*" element={<Navigate to="/" />} /> */}
        </Routes>
      </div>
    </>
  );
}

export default App;
