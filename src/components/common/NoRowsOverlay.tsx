import { Box, Typography } from '@mui/material'
import React from 'react'



const NoRowsOverlay = () => {
  return (
     <Box sx={{ marginY:"56px", width:"100", display:"flex", alignItems:"center", justifyContent:"center" }}>
        <Typography sx={{ fontSize:"14px", fontWeight:"600", textAlign:"center", alignSelf:"center"}}>
            No data to display
        </Typography>
    </Box>
  )
}

export default NoRowsOverlay