
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

interface logoutDialogProps {
openLogoutDialog:boolean;
handleCloseDialog:()=> void;
loggingOut:boolean;
handleLogout:()=>Promise<void>
}

const LogoutDialog = ({openLogoutDialog,handleCloseDialog,loggingOut,handleLogout}:logoutDialogProps) => {
  return (
      <Dialog sx={{ display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column"}} open={openLogoutDialog}  onClose={handleCloseDialog}  aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle sx={{ color:"#000", fontSize:"18px", fontWeight:"700",alignSelf:"center"}} id="alert-dialog-title">Confirm Logout </DialogTitle>
        <DialogContent sx={{ marginTop:"-10px"}}>
          <DialogContentText sx={{ fontSize:"14px",color:"#000"}} id="alert-dialog-description">
            Are you sure you want to logout of your account
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ width:"100%", gap:"16px", marginBottom:"16px", display:"flex", alignItems:"center", justifyContent:"center" }}>
          <Button  variant='outlined' sx={{  border:"1px solid #DC3545" , color:"#DC3545",boxShadow:"none", ":hover":{boxShadow:"none"}, width:"120px", height:"44px" }} onClick={handleCloseDialog}>Cancel</Button>
          <Button variant='contained' disabled={loggingOut} loading={loggingOut} sx={{ backgroundColor:"#000", color:"#fff", boxShadow:"none", ":hover":{ boxShadow:"none"},  width:"120px", height:"44px"}} onClick={ ()=>{handleLogout(); handleCloseDialog()}} autoFocus>Logout</Button>
        </DialogActions>
      </Dialog>
  )
}

export default LogoutDialog