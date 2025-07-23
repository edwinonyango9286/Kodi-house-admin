import {BrowserRouter as Router, Routes, Route } from "react-router-dom"
import SignIn from './pages/auth/SignIn'
// import CreateAccount from './pages/auth/CreateAccount'
import PageNotFound from "./components/common/PageNotFound"
import ForgotPassword from './pages/auth/ForgotPassword'
import ResetPassword from './pages/auth/ResetPassword'
import EmailVerification from './pages/auth/EmailVerification'
import CodeVerification from './pages/auth/CodeVerification'
import DashboardLayout from './components/DashboardLayout'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import Payments from "./pages/Payments"
import Invoices from './pages/Invoices'
import Receipts from './pages/Receipts'
import Setups from './pages/Setups'
import Users from './pages/Users'
import Landlords from './pages/Landlords'
import Properties from './pages/Properties'
import {ToastContainer} from  "react-toastify"
import { PrivateRoutes } from './utils/PrivateRoutes'
import ErrorBoundary from './components/common/ErrorBoundary'

const nodeInvironment = import.meta.env.VITE_NODE_ENV 
if(nodeInvironment === "production"){
  console.log = function () {}
}

function App() {
  return (
    <>
    <Router>
        <ToastContainer position="top-right" autoClose={5000} hideProgressBar={true} newestOnTop={false} closeOnClick  rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="colored"
         toastStyle={{ textAlign:"left", fontWeight:"400", fontSize:"14px", width:"auto", height:'auto'}}/>    
        <ErrorBoundary>
          <Routes>
          <Route path="*" element={<PageNotFound/>}/>
          <Route path='/' element={ <SignIn/>  } /> 
          {/* <Route path='/create-account' element={<CreateAccount/>}/> */}
          <Route path='/forgot-password' element={<ForgotPassword/> }/>
          <Route path='/reset-password/:token' element={<ResetPassword/>}/>
          <Route path='/email-verification' element={<EmailVerification/> }/>
          <Route path='/code-verification' element={<CodeVerification/>}/>
          
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
        </ErrorBoundary>
    </Router>
    </>
  )
}

export default App
