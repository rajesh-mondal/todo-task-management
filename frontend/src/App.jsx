import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "./component/PrivateRoute";
import CreateTask from "./pages/CreateTask";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Tasks from "./pages/Tasks";
import UpdateTask from "./pages/UpdateTask";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Tasks />
            </PrivateRoute>
          }
        />

        <Route
          path="/create-task"
          element={
            <PrivateRoute>
              <CreateTask />
            </PrivateRoute>
          }
        />

        <Route
          path="/update-task/:id"
          element={
            <PrivateRoute>
              <UpdateTask />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
