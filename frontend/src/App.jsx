import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateTask from "./pages/CreateTask";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Tasks from "./pages/Tasks";
import UpdateTask from "./pages/UpdateTask";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Tasks />} />
        <Route path="/create-task" element={<CreateTask />} />
        <Route path="/update-task/:id" element={<UpdateTask />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
