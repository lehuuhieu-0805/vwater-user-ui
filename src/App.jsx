import React from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./components/MainLayout/MainLayout";
import Interceptor from "./confgurations/axios/interceptor";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import RenderRoutes from "./routes/RenderRoutes";
import "./App.css";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import AuthProvider from "./context/AuthContext";
import AuthenService from "./context/AuthenServiceContext";
// import { VWaterPaths } from "./confgurations/paths/vwaterPath";
// import Login from "./pages/Login/Login";
// import Register from "./pages/Register/Register";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Init Axios Configuraiton
Interceptor();

function App() {
  return (
    <AuthProvider>
      <ToastContainer />
      <AuthenService>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Routes>
            <Route path="*" element={<PageNotFound />} />
            {/* <Route path={VWaterPaths.login} element={<Login />} />
        <Route path={VWaterPaths.register} element={<Register />} /> */}
            <Route path="/" element={<MainLayout />}>
              {RenderRoutes()}
            </Route>
          </Routes>
        </LocalizationProvider>
      </AuthenService>
    </AuthProvider>
  );
}

export default App;
