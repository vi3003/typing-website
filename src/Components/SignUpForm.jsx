import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useTheme } from "../Context/ThemeContext";
import { auth } from "../firebaseConfig";
import { toast } from "react-toastify";
import errorMapping from "../Utils/errorMapping";

    const SignUpForm = ({handleClose}) => {
    const { theme } = useTheme();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = () => {
        if (!email || !password || !confirmPassword ){
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
        if (password !== confirmPassword){
            toast.warning('Password Mismatch!', {
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

        auth.createUserWithEmailAndPassword(email,password).then((res)=> {
            toast.success('User created!', {
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
            toast.error(errorMapping[err.code]|| 'Something went wrong! Please try again.', {
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
            <TextField 
                variant="outlined"
                type="password"
                label="Confirm Your Password"
                onChange={(e)=>setConfirmPassword(e.target.value)}
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
            style={{ backgroundColor: theme.textColor, color: theme.background}}
            onClick={handleSubmit}>SignUp</Button>
        </Box>
    )
}

export default SignUpForm;