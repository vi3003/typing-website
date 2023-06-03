import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { AppBar, Box, Modal, Tab, Tabs } from '@mui/material';
import React, { useState } from "react";
import { useTheme } from '../Context/ThemeContext';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import GoogleButton from 'react-google-button';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { toast } from 'react-toastify';
import errorMapping from '../Utils/errorMapping';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';

const AccountCircle = () => {

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(0);
    const { theme } = useTheme();

    const [user] = useAuthState(auth);
    const navigate = useNavigate();


    const handleModalOpen = () => {
        if(user){
            // navigate to user page
            navigate('/user');
        }
        else{
                setOpen(true);
        }

        
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleValueChange = (e,v) => {
        setValue(v);
    }

    const logOut = () => {
        auth.signOut().then((res)=>{
            toast.success('Logout successful!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }).catch((err)=>{
            toast.error('Not able to logout.', {
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

    const googleProvider = new GoogleAuthProvider();

    const handleGoogleSignUp = () => {
        signInWithPopup(auth, googleProvider).then((res)=>{
            toast.success('Logged in with Google!', {
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
            toast.error(errorMapping[err.code] || 'Google authentication not successful.', {
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
        <div className="account">
            <AccountCircleIcon fontSize='large' onClick = {handleModalOpen}/>
                {user && <LogoutIcon  fontSize='large' onClick = {logOut}/>}

            <Modal
                open = {open}
                onClose={handleClose}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <div style={{width: '400px', textAlign: 'center'}}>
                    <AppBar position='static' style={{background: theme.background, color: 'theme.textColor'}}>
                        <Tabs
                            value={value}
                            onChange={handleValueChange}
                            variant='fullWidth'
                        >
                            <Tab style={{color:theme.textColor}} label="Login"></Tab>
                            <Tab style={{color:theme.textColor}} label="SignUp"></Tab>
                        </Tabs>
                    </AppBar>
                    {value === 0 && <LoginForm handleClose = {handleClose}/>}
                    {value === 1 && <SignUpForm handleClose = {handleClose}/>}

                    <Box sx={{background: theme.background}}>
                        <span>OR</span>
                        <GoogleButton 
                            style={{width: '100%',marginTop: '8px'}}
                            onClick={handleGoogleSignUp}
                        />
                    </Box>
                </div>
            </Modal>
        </div>
    )
}

export default AccountCircle;