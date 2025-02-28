import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import AddExam from './pages/AddExam';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register/>}/>
      <Route path="/dashboard" element={<AddExam/>} />
    </Routes>
  );
}
