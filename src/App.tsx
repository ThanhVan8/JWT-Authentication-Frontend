import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Detail from "./pages/Detail";
import Home from "./pages/Home";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { createTheme, ThemeProvider } from "@mui/material";
import Profile from "./pages/Profile";
import PrivateRoute from "./PrivateRoute";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";
import { UserContext } from "./context/UserContext";

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#342B38',
      },
      secondary: {
        main: '#42A5F5',
      },
    },
  });

  const [isLogged, setIsLogged] = useState(() => {
    if (localStorage.getItem('token'))
      return true;
    return false;
  });
  
  return (
    <ThemeProvider theme={theme}>
      <UserContext.Provider value={{isLogged, setIsLogged}}>
        <Router>
          <Routes>
            <Route path="/" element={<AuthLayout />}>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </Route>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="photos/:id" element={<Detail />} />
              
              <Route element={<PrivateRoute />}>
                <Route path="profile" element={<Profile />}/>
              </Route>
            </Route>
          </Routes>
        </Router>
      </UserContext.Provider>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
      />
    </ThemeProvider>
  );
}

export default App;
