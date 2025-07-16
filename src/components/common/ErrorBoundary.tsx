import { Component, type ErrorInfo, type ReactNode } from "react";
import { Box, Typography, Button } from "@mui/material";

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ error, errorInfo });
    console.error("Uncaught error:", error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };


  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      const nodeInvironment = import.meta.env.VITE_NODE_ENV
      console.log(nodeInvironment,"=>node environment")

      return (
        <Box sx={{ display: 'flex',flexDirection: 'column',alignItems: "center",justifyContent: "center", width: "100%", height: "100vh", padding:"24px", backgroundColor:"#fff"}}>
          <Typography  sx={{ marginBottom:"10px", color:"#cb444a", fontSize:"16px", fontWeight:"700" }}>Opps... something went wrong! </Typography>
          {this.state.error && nodeInvironment === "development" && (
            <>
              <Typography  sx={{ fontSize:"14px", marginBottom:"10px", fontWeight: '700', color:"#0F172A" }}> {this.state.error.name} </Typography>
              <Typography  sx={{ marginBottom:"10px", fontWeight:"500", color:'#0F172A' }}> {this.state.error.message} </Typography>
              <Box component="pre" sx={{ padding:'16px',  marginBottom:"20px", bgcolor: 'grey.100', borderRadius: "8px", overflowX: 'auto', maxWidth: '100%'}}>
                <code>{this.state.error.stack}</code>
              </Box>
            </>
          )}
          <Button sx={{ ":hover":{ boxShadow:"none"}, marginTop: nodeInvironment ==="production" ? "40px" : "0px", backgroundColor:"#2563EB", color:"#fff", boxShadow:"none", width:"154px", height:"44px", fontSize:"16px", fontWeight:"400", textAlign:'center'}}  onClick={()=>{this.handleReset(); window.location.reload();} }> Try Again </Button>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;