import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// import { AuthProvider } from './Stores/Context.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './Stores/Store.jsx'

 

ReactDOM.createRoot(document.getElementById('root')).render(
//   <BrowserRouter>
//   <AuthProvider>
//     <App/>
//   </AuthProvider>
//   </BrowserRouter>  

  // ------------------------------------------------------------
  <BrowserRouter>
  <Provider store={store}>
    <App />
  </Provider>  

  </BrowserRouter>
  
)
