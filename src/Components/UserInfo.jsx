import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import React from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebaseConfig';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useNavigate } from 'react-router-dom';

const UserInfo = ({ totalTest }) => {

    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    const exit = () => {
        navigate('/')
    }

    return (
        <div className="user-profile">
            <div className="user">
                <div className="picture">
                    <AccountCircleIcon style={{ display: 'block', transform: 'scale(5)', margin: 'auto', marginTop: '3.5rem' }} />
                </div>
                <div className="info">
                    <div className="email">
                        {user.email}
                    </div>
                    <div className="joinedOn">
                        {user.metadata.creationTime}
                    </div>
                </div>
            </div>
            <div className="exit">
                <ExitToAppIcon fontSize='large' onClick={exit} />
            </div>
            <div className="totalTests">
                Total Tests Taken :- <span>
                    {totalTest}
                </span>
            </div>
        </div>
    )
}

export default UserInfo;