import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import Register from "../LoginArea/Register/Register";
import Login from "../LoginArea/Login/Login";
import App from "../App";

function Routing() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/chat" element={<App />} />
        <Route path="/" element={<Navigate to="/Login" />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Routing;
