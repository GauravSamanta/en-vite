import { Route, Routes } from "react-router-dom";
import axios from "axios";
import Home from "./pages/Home";
import RegisterPage from "./pages/Register";
import Login from "./pages/Login";
import Navbar from "./pages/Navbar";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.withCredentials = true;

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  );
}

export default App;
