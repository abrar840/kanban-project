import { Routes, Route } from "react-router-dom";
import Login from "@/pages/Login";
import SignUp from "@/pages/SignUp";
import Board from "@/pages/Board";
import PublicRoute from "@/components/PublicRoutes";
import TopBar from "@/components/TopBar"; // ✅ import your TopBar

function App() {
  return (
    <div className="min-h-screen w-[]">
      <TopBar /> {/* ✅ Always visible at top */}

      <Routes>
        <Route path="/" element={<Board />} />
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/signup" element={<PublicRoute><SignUp /></PublicRoute>} />
      </Routes>
    </div>
  );
}

export default App;
