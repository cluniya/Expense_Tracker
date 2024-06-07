import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SignInForm from './components/signup&signin/SignInForm';
import SignUpForm from './components/signup&signin/SignUpForm';
import Welcome from './components/Layout/Welcome';
import UpdateProfile from './components/Profile/UpdateProfile';
import Navbar from './components/Layout/Navbar';
import ExpenseForm from './components/Expenses/ExpenseForm';
import ExpenseDashboard from './components/Expenses/ExpenseDashBoard';

const App = () => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    // const text = <p>hello world</p>;

    return (
        <>
            <Navbar />
            <div className="App">
                <Routes>
                    <Route path="/" element={<SignUpForm />} />
                    <Route path="/signin" element={<SignInForm />} />
                    <Route path="/update-profile" element={<UpdateProfile />} />
                    {isAuthenticated && (
                        <>
                            <Route path="/expense" element={<ExpenseDashboard />} />
                            <Route path="*" element={<Navigate to="/expense" />} />
                        </>
                    )}
                    {!isAuthenticated && <Route path="*" element={<Navigate to="/signin" />} />}
                    <p>hello world</p>
                </Routes>
            </div>
        </>
    );
};

export default App;

// import React from 'react'

// const App = () => {
//   return (
//     <div>
//       <p>hello world</p>
//     </div>
//   )
// }

// export default App
