import React from 'react';
import { Route, Navigate, useNavigate, Routes } from "react-router-dom";
import ConnectFaceBook from './components/auth/connect-facebook';
function App() {
  return (
    <React.Fragment>
      <Routes>
        <Route path="/connect" element={<ConnectFaceBook />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
