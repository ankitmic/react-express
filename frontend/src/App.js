import './App.css';
import Login from './Login';
import Signup from './Signup';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Home';
import UpdateProduct from './UpdateProduct';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/update" element={<UpdateProduct />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
