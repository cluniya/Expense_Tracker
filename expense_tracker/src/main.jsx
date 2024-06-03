import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './Store/Context.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './Store/Index.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <BrowserRouter>
  // <AuthProvider>
  //   <App/>
  // </AuthProvider>
  // </BrowserRouter>  
  <Provider store={store}>
    <App />
  </Provider>  
)
