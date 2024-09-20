
import {React } from 'react';
import TaskProvider from './context/context';
import {BrowserRouter, Route, Routes } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Home from './components/Home/Home';
import CreateForm from './components/CreateForm';
import EditForm from './components/EditForm';
import SignUp from "./components/SignUp/SignUp"

function App() {

  
  

  return (
    <TaskProvider>
      <Helmet>
        <title>Task Manager</title> 
        <link rel="icon" href="https://media.istockphoto.com/id/1303877287/vector/paper-checklist-and-pencil-flat-pictogram.jpg?s=612x612&w=0&k=20&c=NoqPzn94VH2Pm7epxF8P5rCcScMEAiGQ8Hv_b2ZwRjY=" />
      </Helmet>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateForm />} />
          <Route path="/edit" element={<EditForm />} />
          <Route path="register" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </TaskProvider>
  )
}

export default App
