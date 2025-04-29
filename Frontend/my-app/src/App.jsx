import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from "./pages/Register";
import AdminDashboard from "./pages/addmin";
import DirecteurDashboard from "./pages/direcetud";
import ChefDashboard from "./pages/chefdep";
import Supervisors from "./pages/Supervisors"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register/>}/>
      <Route path="/dashboard/admin" element={<AdminDashboard />} />
      <Route path="/dashboard/directeur" element={<DirecteurDashboard />} />
      <Route path="/dashboard/chef" element={<ChefDashboard />} />
      <Route path="/dashboard/admin/supervisors" element={<Supervisors />} />

    </Routes>
  );
}
