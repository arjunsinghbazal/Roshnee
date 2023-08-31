
import './App.css';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Home from './Components/Home';
import Cart from './Components/Cart';
import Checkout from './Components/Checkout';
import SignupForm from './Components/Sign';
import Login from './Components/Login';
import Profile from './Components/Profile';
function App() {
  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route exact path='/' Component={Home}/>
        <Route path='/cart' Component={Cart}/>
        <Route path='/checkout' Component={Checkout}/>
        <Route path='/signup' Component={SignupForm}/>
        <Route path="/login" Component={Login}/>
        <Route path='/profile' Component={Profile}/>
      </Routes>
     </BrowserRouter>
    </>
  );
}

export default App;
