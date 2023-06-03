import { Typography } from "@mui/material";
import  AccountCircle  from "./AccountCircle";
import KeyboardAltIcon from '@mui/icons-material/KeyboardAlt';

import React from "react";


const Header = () => {
    return(
        <div className="header">
            <div className="logo" style={{cursor:'pointer'}} >
                <Typography variant="h3">
                    <KeyboardAltIcon style={{fontSize: 40}}/> Typing Blitz
                </Typography>
            </div>
            <div className="user-icon">
                {/* user icon here */}
                <AccountCircle />
            </div>
        </div>
    )
}

export default Header;