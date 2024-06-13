import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom'
import App from './App.jsx'
import store from './Store.js'
import { Provider } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import PrivateRoute from './Components/PrivateRoute.jsx'
import HomeScreen from './Screens/HomeScreen.jsx';
import LoginScreen from './Screens/LoginScreen.jsx';
import RegisterScreen from './Screens/RegisterScreen.jsx';
import ProfileScreen from './Screens/ProfileScreen.jsx';
import AdminLoginScreen from './Screens/AdminLoginScreen.jsx'
import AdminDashboardScreen from './Screens/AdminDashboardScreen.jsx';
import PrivateAdminRoute from './Components/PrivateAdminRoute.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
      <Route path='/' element={<App />}>
          <Route index={true} path='/' element={<HomeScreen />} />
          <Route path='/login' element={<LoginScreen />} />
          <Route path='/register' element={<RegisterScreen />} />
          <Route path='' element={<PrivateRoute />}>
              <Route path='/profile' element={<ProfileScreen />} />
          </Route>
          <Route path='/admin'>
              <Route path='login' element={<AdminLoginScreen />} />
              <Route path='' element={<PrivateAdminRoute />}>
                  <Route path='dashboard' element={<AdminDashboardScreen />} />
              </Route>
          </Route>
      </Route>
  )
);


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
  </Provider>
)
