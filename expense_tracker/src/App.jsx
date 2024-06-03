import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import SignInForm from './components/signup&signin/SignInForm';
import SignUpForm from './components/signup&signin/SignUpForm';
import Welcome from './components/Layout/Welcome';
import UpdateProfile from './components/Profile/UpdateProfile';
import Navbar from './components/Layout/Navbar';
import AuthContext from './Store/Context';
import ExpenseForm from './components/Expenses/ExpenseForm';
import ExpenseDashboard from './components/Expenses/ExpenseDashBoard';

const App = () => {
    const { authState } = useContext(AuthContext);

    return (
        <>
            
                <Navbar />
                <div className="App">
                    <Routes>
                        <Route path="/" element={<SignUpForm />} />
                        <Route path="/signin" element={<SignInForm />} />
                        {/* <Route path="/welcome" element={<Welcome />} /> */}
                        <Route path="/update-profile" element={<UpdateProfile />} />
                        {authState.isAuthenticated && (
                            <>
                                <Route path="/expense" element={<ExpenseDashboard />} />
                                <Route path="*" element={<Navigate to="/expense" />} />
                            </>
                        )}
                        {!authState.isAuthenticated && <Route path="*" element={<Navigate to="/signin" />} />}
                    </Routes>
                </div>
            
        </>
    );
};

export default App;
