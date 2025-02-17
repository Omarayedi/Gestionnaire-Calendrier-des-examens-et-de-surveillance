import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from "./pages/Register";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register/>}/>
      <Route path="/dashboard" element={<h1>Welcome to Dashboard</h1>} />
    </Routes>
  );
}
