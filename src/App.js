import './App.css';
import AuthProvider from './auth/AuthProvider';
import {Routes, Route, BrowserRouter} from 'react-router-dom'
import HomePage from "./pages/HomePage";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import Navbar from "./components/Navbar";
import SignIn from "./pages/SignInPage";
import SignUp from "./pages/SignUpPage";
import LoansPage from "./pages/LoansPage";
import SignOutPage from "./pages/SignOutPage";
import AboutPage from "./pages/AboutPage";
import NewLoanPage from "./pages/NewLoanPage";


function App() {

    return (
        <BrowserRouter>
            <AuthProvider>
                <Navbar/>
                <Routes>
                    <Route path="/" element={<ProtectedRoutes/>}>
                        <Route path={"/loans"} element={<LoansPage/>}/>
                        <Route path={"/signout"} element={<SignOutPage/>}/>
                        <Route path={"/"} element={<HomePage/>}/>
                        <Route path={"/request"} element={<NewLoanPage/>}/>
                    </Route>

                    <Route path="/login" element={<SignIn/>}/>
                    <Route path="/signup" element={<SignUp/>}/>
                    <Route path="/about" element={<AboutPage/>}/>
                </Routes>

            </AuthProvider>
        </BrowserRouter>
    )

}

export default App;
