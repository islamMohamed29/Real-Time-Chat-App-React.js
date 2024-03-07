import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Chat from "./pages/Chat.jsx";
import SetAvatar from "./pages/SetAvatar.jsx";
import UserProvider from "./Context/UserContext.js";

export default function App() {
  const ProtectRoute = ({ children }) => {
    if (localStorage.getItem("chat-app-user") === null) {
      return <Navigate to={"/login"} />;
    } else {
      return children;
    }
  };
  useEffect(() => {}, []);
  const ProtectAuth = ({ children }) => {
    if (localStorage.getItem("chat-app-user")) {
      return <Navigate to={"/chat"} />;
    } else {
      return children;
    }
  };

  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/register"
            element={
              <ProtectAuth>
                <Register />
              </ProtectAuth>
            }
          />
          <Route
            path="/login"
            element={
              <ProtectAuth>
                <Login />
              </ProtectAuth>
            }
          />
          <Route path="/setAvatar" element={<SetAvatar />} />

          <Route
            path="/chat"
            element={
              <ProtectRoute>
                <Chat />
              </ProtectRoute>
            }
          />
          <Route
            path="/"
            element={
              <ProtectRoute>
                <Chat />
              </ProtectRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}
