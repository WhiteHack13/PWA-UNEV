import { Routes, Route, Navigate } from "react-router-dom";
import AtomicShowcase from "./atomic/pages/AtomicShowcase/AtomicShowcase.jsx";
import InconsistentScreens from "./atomic/pages/InconsistentScreens/InconsistentScreens.jsx";
import UserDirectory from "./atomic/pages/UserDirectory/UserDirectory.jsx";
import NotFound from "./atomic/pages/NotFound/NotFound.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/atomic" replace />} />
      <Route path="/inconsistente" element={<InconsistentScreens />} />
      <Route path="/atomic" element={<AtomicShowcase />} />
      <Route path="/usuarios" element={<UserDirectory />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
