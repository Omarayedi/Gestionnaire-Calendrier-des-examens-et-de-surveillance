import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from "./pages/Register";
import AdminDashboard from "./pages/addmin";
import DirecteurDashboard from "./pages/direcetud";
import Supervisors from "./pages/Supervisors"
import Students from "./pages/Students"
import AddExam from './pages/Exam';
import RoomsPage from './pages/Rooms';
import Chefdepp from "./pages/Chefdeppp";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register/>}/>
      <Route path="/dashboard/admin" element={<AdminDashboard />} />
      <Route path="/dashboard/directeur" element={<DirecteurDashboard />} />
      <Route path="/dashboard/chef/*" element={<Chefdepp />} />
      <Route path="/dashboard/admin/supervisors" element={<Supervisors />} />
      <Route path="/dashboard/admin/students" element={<Students />} />
      <Route path="/dashboard/admin/exams" element={<AddExam />} />
      <Route path="/dashboard/admin/rooms" element={<RoomsPage />} />

    </Routes>
  );
}
