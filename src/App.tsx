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
import Profile from './pages/Profile'
import Payments from './pages/Payments'
import Invoices from './pages/Invoices'
import Receipts from './pages/Receipts'
import Setups from './pages/Setups'
import Users from './pages/Users'
import Landlords from './pages/Landlords'
import Properties from './pages/Properties'
import {ToastContainer} from  "react-toastify"
import { PrivateRoutes } from './utils/PrivateRoutes'
import { PublicRoutes } from './utils/PublicRoutes'




function App() {
  return (
    <>
    <Router>
        <ToastContainer position="top-right" autoClose={5000} hideProgressBar={true} newestOnTop={false} closeOnClick  rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="colored"
        toastStyle={{ textAlign:"left", fontWeight:"500", fontSize:"14px", width:"600px", height:'auto'}}/>    
        <Routes>
          
        <Route path='/' element={ <PublicRoutes><SignIn/></PublicRoutes> } /> 
        <Route path='/create-account' element={<PublicRoutes><CreateAccount/></PublicRoutes> }/>
        <Route path='/forgot-password' element={<PublicRoutes><ForgotPassword/></PublicRoutes> }/>
        <Route path='/reset-password/:token' element={<PublicRoutes><ResetPassword/></PublicRoutes> }/>
        <Route path='/email-verification' element={<PublicRoutes><EmailVerification/></PublicRoutes> }/>
        <Route path='/code-verification' element={<PublicRoutes><CodeVerification/></PublicRoutes> }/>

        <Route path='/dashboard' element={<PrivateRoutes><DashboardLayout/></PrivateRoutes> }>
        <Route index element={<Dashboard/>}/> 
        <Route path='user-profile' element={<Profile/>}/>
        <Route path='payments' element={<Payments/>} />
        <Route path="invoices" element={<Invoices/>}/>
        <Route path="receipts" element={<Receipts/>}/>
        <Route path="setups" element={<Setups/>}/>
        <Route path="properties" element={<Properties/>}/>
        <Route path="users" element={<Users/>}/>
        <Route path='landlords' element={<Landlords/>}/>
        </Route>
      </Routes>
    </Router>
    </>
  )
}

export default App
