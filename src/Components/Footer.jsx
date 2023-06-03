import React  from 'react';
import Select from 'react-select';
import { themeOptions } from '../Utils/themeOptions';
import { useTheme } from '../Context/ThemeContext';
import PaletteIcon from '@mui/icons-material/Palette';
import { Link } from '@mui/material';
import { GitHub } from '@mui/icons-material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import DescriptionIcon from '@mui/icons-material/Description';
import TwitterIcon from '@mui/icons-material/Twitter';
import EmailIcon from '@mui/icons-material/Email';

const Footer = () => {
    const {setTheme, theme} = useTheme();
    const handleChange = (e) => {
        setTheme(e.value);
        localStorage.setItem("theme", JSON.stringify(e.value));
    }
    return(
        <div className='footer'>
            <div className="left">
                <div className="links">
                    <Link color={'inherit'}>
                        <GitHub fontSize='large'/>
                    </Link>
                    <Link color={'inherit'}>
                        <LinkedInIcon fontSize='large'/>
                    </Link>
                    <Link color={'inherit'}>
                        <TwitterIcon fontSize='large'/> 
                    </Link>
                    <Link color={'inherit'}>
                        <EmailIcon fontSize='large'/>
                    </Link>
                    <Link color={'inherit'}>
                        <DescriptionIcon fontSize='large'/>
                    </Link>
                </div>
            </div>
            <div className="themeButton">
                <PaletteIcon sx={{fontSize: 40}}/>
                <Select
                   onChange={handleChange}
                   options={themeOptions}
                   menuPlacement='top'
                   defaultValue={{label: theme.label, value: theme }}
                   styles={{
                    control: (styles) => ({
                        ...styles,
                        backgroundColor: theme.background,
                        color: theme.textColor,
                        borderColor: theme.textColor, 
                    }),
                    menu: (styles) => ({
                        ...styles,
                        backgroundColor: theme.background,
                    }),
                    option: (styles, { isFocused }) => {
                        return {
                            ...styles,
                            backgroundColor: !isFocused ? theme.background : theme.typeBoxText,
                            cursor: "pointer"
                        }
                    },
                    singleValue: styles => ({...styles, color: theme.title}),
                   }}
                />
            </div>
        </div>
    )
}

export default Footer