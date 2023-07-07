import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login";
import CommonHeaderAndSidebar from "./pages/dashboard/CommonHeaderAndSidebar";
import MainContent from "./pages/dashboard/MainContent";
import "./App.css";
import { useSelector } from "react-redux";
import CustomErrorPage from "./pages/error/CustomErrorPage";

const App = () => {
  try {
    const isLogin = useSelector((state) => state.auth.isLogin);
    const bg = isLogin ? "" : "m-0 background-img";

    return (
      <div className={`m-0 ${bg}`}>
        <Routes>
          {/* Before Login Routes */}
          {!isLogin && <Route path="/login" element={<Login />} />}
          {!isLogin && (
            <Route path="*" element={<Navigate to="login" replace />} />
          )}

          {/* After Login Routes */}
          {isLogin && (
            <Route path="/dashboard" element={<CommonHeaderAndSidebar />}>
              <Route index element={<MainContent />} />
            </Route>
          )}
          {isLogin && (
            <Route path="*" element={<Navigate to="dashboard" replace />} />
          )}
        </Routes>
      </div>
    );
  } catch (error) {
    console.log(err);
    return <CustomErrorPage />;
  }
};

export default App;
