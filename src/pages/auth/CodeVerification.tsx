import React, { useState, useRef, useEffect } from 'react';
import { TextField, Box, Typography, Button } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import iconBlue from "../../assets/logos and Icons-20230907T172301Z-001/logos and Icons/icon blue.svg"
import logoWhite from "../../assets/logos and Icons-20230907T172301Z-001/logos and Icons/Logo white.svg"
import bgImage from "../../assets/images-20230907T172340Z-001/images/Sign up  Loading  1.jpg"
import { verifyCode } from '../../components/services/authServices';
import { showErrorToast, showInfoToast } from '../../utils/toast';
import type { AxiosError } from 'axios';

const CodeVerification = ({ length = 6, onComplete }: { length?: number; onComplete?: (code: string) => void }) => {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [isSubmitting,setIsSubmitting] = useState<boolean>(false);
  const location = useLocation()
  const navigate = useNavigate()

  const {email,activationToken} = location.state ||{}

  useEffect(() => {
    if (otp.every(digit => digit !== '') && onComplete) {
      onComplete(otp.join(''));
    }
  }, [otp, onComplete]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
    const value = e.target.value;
    
    if (/^[0-9]$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      
      if (index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    } else if (value === '') {
      const newOtp = [...otp];
      newOtp[index] = '';
      setOtp(newOtp);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleCodeVerification = async (e: React.FormEvent<HTMLFormElement>)=> {
    e.preventDefault()
    setIsSubmitting(true)

  const codeData = {
    activationToken:activationToken,
    activationCode:otp.join("")
  }
    try {
      const response = await verifyCode(codeData);
        console.log(response,"=>response")
      if(response.status === 200){
        showInfoToast(response.data.message)
        navigate("/")
      }
    } catch (err) {
     const error = err as AxiosError<{ message?: string}>;
     showErrorToast( error.response?.data?.message || error.message);
    }finally{
      setIsSubmitting(false)
    }
  }

  const isOtpValid = otp.every((digit)=>digit !== "")

  return (
      <Box sx={{ opacity:0.9, position:"relative", width:"100%", height:"100vh", backgroundColor:"rgba(36, 46, 58, 0.70)" }}>
        <img src={bgImage} style={{ objectFit:"cover", position:"absolute", mixBlendMode:'overlay', width:"100%", height:"100%", zIndex:0 }} alt="bgImage" />

        <Box sx={{ position:"relative", width:'100%', display:"flex" }}>
          <Box sx={{ height:"100vh", width:'50%', display:"flex", alignItems:"center", justifyContent:"center"}}>

            <Box sx={{ padding:"32px", borderRadius:"8px", width:"60%", backgroundColor:"#F9FAFB", height:"56vh"}}>
                <Box sx={{gap:"10px", marginY:'20px',  width:"100%", flexDirection:"column", display:"flex", alignItems:"center", justifyContent:"center"}}>
                  <img src={iconBlue} alt="iconBlue" />
                    <Typography variant="body2" sx={{fontWeight:"700", fontSize:"30px", textAlign:"center"}}>Code verification</Typography>
                    <Typography variant='body2' sx={{ width:"100%", alignSelf:"start", fontWeight:"400", fontSize:"14px", textAlign:"start" }}>Please enter the 6 digit code sent to {email}</Typography>
                </Box>

              <form onSubmit={handleCodeVerification} style={{ width:"100%", display:"flex", alignItems:"start", flexDirection:"column", gap:"10px" }}>

                   <Box sx={{ marginY:"10px", width:"100%", display:"flex", alignItems:"center", justifyContent:'center', gap:"10px"}}>
                        {otp.map((digit, index) => (
                        <TextField key={index} value={digit} onChange={(e) => handleChange(e , index)} onKeyDown={(e) => handleKeyDown(e, index)} inputRef={(el) => (inputRefs.current[index] = el)} inputProps={{ maxLength: 1, style: { height:"60px", textAlign: 'center', color:"#333", fontSize: '24px', padding: '8px'}}}  sx={{ width: '76px',}}  />
                        ))}
                  </Box>
            
                <Button loading={isSubmitting} disabled={!isOtpValid || isSubmitting} type="submit" variant="contained" sx={{ marginTop:"20px", width:"100%", height:"50px",backgroundColor:"#1A56DB" , color:"#fff", borderRadius:"12px", fontWeight:"600", fontSize:"16px", textAlign:"center" }}>Verify code</Button>
                <Box sx={{ marginTop:"10px", width:"100%", display:"flex", gap:"4px"}}>
                    <Typography variant="body2" sx={{fontSize:"14px", fontWeight:"500", textAlign:"start" }}>Didn’t recieve the code ? </Typography>
                    <Link to={"/forgot-password"} style={{ textDecoration:"none", color:"#2563EB" , fontWeight:"500", fontSize:"14px"}}>Resend</Link>
                </Box>
              </form>
            </Box>
          </Box>
          <Box sx={{ width:"50%", display:"flex", alignItems:"center", justifyContent:"center"}}>
            <Box sx={{width:"100%", display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column" , gap:"10px" }}>
                 <img src={logoWhite} alt="logoWhite" style={{marginRight:"40px"}} />
                 <Typography sx={{color:"#fff", textAlign:"center", fontSize:"16px", fontWeight:"400" }}>Sign up  or create an account</Typography>
            </Box>
          </Box>
        </Box>
    </Box>








 


  );
};

export default CodeVerification;