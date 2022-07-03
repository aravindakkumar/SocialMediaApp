import React from "react";
// import './App.css'
import { AuthProvider } from "./context/auth";
import ApBar from './Components/Apbar'
import { Container } from "@mui/material";

import {  BrowserRouter,  Routes,  Route} from "react-router-dom"; 
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import SinglePost from './pages/SinglePost'


function App() {
  return (
    <AuthProvider>

    <BrowserRouter>
    <Container maxWidth="lg">
        <ApBar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/posts/:postId" element={<SinglePost />} />

        </Routes>
        
      </Container>
      </BrowserRouter>


    </AuthProvider>
  );
}

export default App;

