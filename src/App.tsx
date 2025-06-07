import './App.css'
import {BrowserRouter as Router, Routes, Route } from "react-router-dom"
import SignIn from './pages/auth/SignIn'
import CreateAccount from './pages/auth/CreateAccount'
import ForgotPassword from './pages/auth/ForgotPassword'
import ResetPassword from './pages/auth/ResetPassword'
import EmailVerification from './pages/auth/EmailVerification'
import CodeVerification from './pages/auth/CodeVerification'
import DashboardLayout from './components/DashboardLayout'
import Dashboard from './pages/Dashboard'


function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<SignIn/>} /> 
        <Route path='/create-account' element={<CreateAccount/>}/>
        <Route path='/forgot-password' element={<ForgotPassword/>}/>
        <Route path='/reset-password' element={<ResetPassword/>}/>
        <Route path='/email-verification' element={<EmailVerification/>}/>
        <Route path='/code-verification' element={<CodeVerification/>}/>

        <Route  path='/dashboard' element={<DashboardLayout/>}>
        <Route index element={<Dashboard/>}/> 

        </Route>

 
      </Routes>
    </Router>
    </>
  )
}

export default App
