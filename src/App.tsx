import "./App.css";
import SignUp from "./Components/SignUp";
import Login from "./Components/Login";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoutes from "./utils/PrivateRoutes";
import PublicRoutes from "./utils/PublicRoutes";
import Home from "./Components/Home";
import Profile from "./Components/Profile";
import Todos from "./Components/Todos/Todos";
import Settings from "./Components/Settings";
import NotFound from "./Components/NotFound";
import Landing from "./Components/Landing";

function App() {
  return (
    <>
      <ToastContainer position="top-center" />

      <Routes>
        <Route element={<PublicRoutes />}>
          <Route path="/" element={<Landing />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<PrivateRoutes />}>
          <Route path="/home" element={<Home />} />
          <Route path="/user/:name/profile" element={<Profile />} />
          <Route path="/user/:name/todos/all" element={<Todos home={false} />} />
          <Route path="/user/:name/settings" element={<Settings />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
