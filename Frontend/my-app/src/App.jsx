import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import AddExam from './pages/AddExam';
import InvigilatorsPage from './pages/Invigilators';
import RoomsPage from './pages/Rooms';
import { MainLayout } from "./components/layout/main-layout"

export default function App() {
  return (
    <Routes>
      <Route path="houssam" element={<MainLayout />}/>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register/>}/>
      <Route path="/dashboard" element={<AddExam/>} />
      <Route path="/invigilators" element={<InvigilatorsPage />} />
      <Route path="/room" element={<RoomsPage />}/>
    </Routes>
  );
}
