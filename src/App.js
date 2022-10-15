import "./App.css";
import Sidebar from "./components/Sidebar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/pages/Home";
import Update from "./components/pages/Update";
import Delete from "./components/pages/Delete";
import Profile from "./components/pages/Profile";
import Login from "./components/pages/login";
import Signup from "./components/pages/signup";
import Dashboard from "./components/pages/Dashboard";
function App() {

  const [value,setValue]=useState(false);
  const [id,setId]=useState("");
  const handleCallback = (childData,id) =>{
    setValue(childData);
    setId(id);
}
console.log("App");
console.log(value);
console.log(id);
  return (
    <div className="App">
      <Router>
        <Navbar state={value} user_id={id}/>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/home" element={<Home />} />
          <Route path="/update" element={<Update user_id={id} />} />
          <Route path="/profile" element={<Profile user_id={id}/>} />
          <Route path="/delete" element={<Delete user_id={id} />} />
          <Route path="/login" element={<Login isloggedin={handleCallback} />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
