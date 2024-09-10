import { Route, Routes } from "react-router-dom";
import axios from "axios";
import Home from "./pages/Home";
import RegisterPage from "./pages/Register";
import Login from "./pages/Login";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.withCredentials = true;

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
