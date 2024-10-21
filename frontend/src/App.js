
import {React} from 'react';
import TaskProvider from './context/context';
import {BrowserRouter, Route, Routes } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Home from './components/Home/Home';
import CreateForm from './components/CreateForm';
import EditForm from './components/EditForm';
import SignUp from "./components/SignUp/SignUp"
import { ToastContainer } from'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Login from './components/Login/Login';
import AuthProvider from './context/authContext';

function App() {
  

  return (
        <BrowserRouter>
          <Helmet>
            <title>Task Manager</title> 
            <link rel="icon" href="https://media.istockphoto.com/id/1303877287/vector/paper-checklist-and-pencil-flat-pictogram.jpg?s=612x612&w=0&k=20&c=NoqPzn94VH2Pm7epxF8P5rCcScMEAiGQ8Hv_b2ZwRjY=" />
          </Helmet>
          <ToastContainer />
          <AuthProvider>
            <TaskProvider>
              <Routes>
                <Route path="/" element={<Home /> } />
                <Route path="/tasks" element={<Home /> } />
                <Route path="/tasks/create" element={<CreateForm />} />
                <Route path="/tasks/edit" element={<EditForm />} />
                <Route path="/register" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
              </Routes>
            </TaskProvider>
          </AuthProvider>
        </BrowserRouter>
  )
}

export default App
