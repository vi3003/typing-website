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
                    <Link href='https://github.com/vi3003/typing-website' color={'inherit'}>
                        <GitHub fontSize='large'/>
                    </Link>
                    <Link href='https://www.linkedin.com/in/vidhi-jain-b46b0a215/' color={'inherit'}>
                        <LinkedInIcon fontSize='large'/>
                    </Link>
                    <Link href='https://twitter.com/Its_Vee_Jain' color={'inherit'}>
                        <TwitterIcon fontSize='large'/> 
                    </Link>
                    <Link href='mailto:vidhijain3003@gmail.com' color={'inherit'}>
                        <EmailIcon fontSize='large'/>
                    </Link>
                    <Link href='https://docs.google.com/document/d/1YA41xz_mGw27h35C5A26QgIAkDztIYiEsENCaJjnzMo/edit?usp=sharing' color={'inherit'}>
                        <DescriptionIcon fontSize='large'/>
                    </Link>
                </div>
            </div>
            <div className="center">
                <p>Copyright ©️ 2023 <b>Vidhi jain</b> </p>
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