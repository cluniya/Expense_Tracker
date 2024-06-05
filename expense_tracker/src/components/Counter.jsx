// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { counterActions,authActions } from '../Store/Index';

// const Counter = () => {
//     const dispatch = useDispatch();
//     const counter = useSelector(state => state.counter.counter);
//     const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');

//     const increment = () => {
//         dispatch(counterActions.increment());
//     };
//     const decrement = () => {
//         dispatch(counterActions.decrement());
//     };

//     const login = () => {
//         dispatch(authActions.login());
//     };

//     const logout = () => {
//         dispatch(authActions.logout());
//     };

//     return (
//         <div>
//             <h1>Counter: {counter}</h1>
//             <button onClick={increment}>Increment by 2</button>
//             <button onClick={decrement}>Decrement by 2</button>

//             {!isAuthenticated && (
//                 <div>
//                     <h2>Login</h2>
//                     <form onSubmit={(e) => { e.preventDefault(); login(); }}>
//                         <div>
//                             <label>Email:</label>
//                             <input 
//                                 type="email" 
//                                 value={email} 
//                                 onChange={(e) => setEmail(e.target.value)} 
//                             />
//                         </div>
//                         <div>
//                             <label>Password:</label>
//                             <input 
//                                 type="password" 
//                                 value={password} 
//                                 onChange={(e) => setPassword(e.target.value)} 
//                             />
//                         </div>
//                         <button type="submit">Login</button>
//                     </form>
//                 </div>
//             )}

//             {isAuthenticated && (
//                 <div>
//                     <h2>User is logged in</h2>
//                     <button onClick={logout}>Logout</button>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Counter;