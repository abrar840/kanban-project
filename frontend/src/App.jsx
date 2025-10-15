import { Routes, Route } from "react-router-dom";
import Login from "@/pages/Login";
import SignUp from "@/pages/SignUp";
import Board from "@/pages/Board";
import PublicRoute from "@/components/PublicRoutes";
import TopBar from "@/components/TopBar"; // ✅ import your TopBar
import React, { useState } from "react";
import SideBar from "@/components/SideBar";
import PrivateRoute from "./components/ProtectedRoute";
import DashBoard from "./pages/DashBoard";
function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [board, setBoard] = useState();
  const [addBoard, setAddBoard] = useState(null);
  const [addMethod, setAddMethod] = useState(null);

  return (
    <div className="relative min-h-screen">
      {/* Topbar with hamburger menu at right */}

      <TopBar onOpen={() => setSidebarOpen(true)} addMethod={addMethod} />
      <SideBar open={sidebarOpen} onClose={() => setSidebarOpen(false)} setBoard={setBoard} currentBoard={board}/>
      <div className="min-h-screen w-[]">
        <Routes>

          <Route path="/" element={<PrivateRoute> <Board board={board} setAddMethod={setAddMethod} /></PrivateRoute>} />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <SignUp />
              </PublicRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              
                <DashBoard />
              
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
