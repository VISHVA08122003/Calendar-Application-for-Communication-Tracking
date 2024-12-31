import Admin from './Admin';
import './App.css';
import Cal from './Calendar';
import {Routes,Route } from 'react-router-dom';
import Hope from './User';
import HomePage from './Home';
import SignIn from './Signin';
import SignUp from './Signup';
function App() {
  return (
    <div>
   <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path = "/Calendar" element={<Cal/>} />
    <Route path="/SignIn" element={<SignIn/>}/>
    <Route path="/Signup" element={<SignUp/>}/>
    <Route path="/Admin" element={<Admin/>} />
    <Route path = "/User" element={<Hope/>} />
    </Routes> 
    </div>
  );
}



export default App;
