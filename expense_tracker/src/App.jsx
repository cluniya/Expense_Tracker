// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignInForm from './components/signup&signin/SignInForm';
import SignUpForm from './components/signup&signin/SignUpForm'
import Welcome from './components/Layout/Welcome';
const App = () => {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<SignUpForm/>} />
                    <Route path="/signin" element={<SignInForm/>} />
                    <Route path="/welcome" element={<Welcome/>} />
                    {/* <Route path="/" exact component={SignInForm} />  */}
                </Routes>
            </div>
        </Router>
    );
};

export default App;
