import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useTheme } from "../Context/ThemeContext";
import { auth } from "../firebaseConfig";
import { toast } from "react-toastify";
import errorMapping from "../Utils/errorMapping";

const LoginForm = ({handleClose}) => {
    const { theme } = useTheme();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = () => {
        if(!email || !password){
            toast.warning('Please fill in all the fields', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
            return;
        }

        auth.signInWithEmailAndPassword(email, password).then((res)=>{
            toast.success('User logged in!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            handleClose();
        }).catch((err)=>{
            toast.error(errorMapping[err.code] || 'Something Went Wrong! Please try again.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        })
    }

    return (
        <Box
            p={3}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                backgroundColor: theme.background
            }}
        >
            <TextField 
                variant="outlined"
                type="email"
                label="Enter Your Email"
                onChange={(e)=>setEmail(e.target.value)}
                InputLabelProps={{
                    style: {
                        color: theme.textColor
                    }
                }}
                InputProps={{
                    style: {
                        color: theme.typeBoxText
                    }
                }}
            />
            <TextField 
                variant="outlined"
                type="password"
                label="Enter Your Password"
                onChange={(e)=>setPassword(e.target.value)}
                InputLabelProps={{
                    style: {
                        color: theme.textColor
                    }
                }}
                InputProps={{
                    style: {
                        color: theme.typeBoxText
                    }
                }}
            />
            <Button
            variant="contained"
            size="large"
            style={{color: theme.background, backgroundColor: theme.textColor}}
            onClick={handleSubmit}>Login</Button>
        </Box>
    )
}

export default LoginForm;