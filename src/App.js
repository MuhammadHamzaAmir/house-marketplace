import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import NavBar from './components/NavBar';
import PrivateRoute from './components/PrivateRoute';

import Explore from './pages/Explore';
import Offers from './pages/Offers';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import Category from './pages/Category';
import CreateListing from './pages/CreateListing';

function App() {
    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/" element={<Explore />} />
                    <Route path="/offers" element={<Offers />} />
                    <Route path="/profile" element={<PrivateRoute />} >
                        <Route path="/profile" element={<Profile />} />
                    </Route>
                    <Route path="/sign-in" element={<SignIn />} />
                    <Route path="/sign-up" element={<SignUp />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/create-listing" element={<CreateListing/>} />
                    <Route path="/category/:categoryName" element={<Category/>} />

                </Routes>
                <NavBar/>
            </Router>
            <ToastContainer></ToastContainer>
        </div>
    );
}

export default App;
