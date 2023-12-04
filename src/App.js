import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ExercisesList from "./components/ExercisesList";
import EditExcercises from "./components/EditExcercises";
import CreateExcersise from "./components/CreateExcersise";
import CreateUser from "./components/CreateUser";
function App() {
  return (
    <div className="container">
      <Navbar />
      <Routes>
        <Route path="" element={<ExercisesList />} />
        <Route path="/edit/:id" element={<EditExcercises />} />
        <Route path="/create" element={<CreateExcersise />} />
        <Route path="/user" element={<CreateUser />} />
      </Routes>
    </div>
  );
}

export default App;
