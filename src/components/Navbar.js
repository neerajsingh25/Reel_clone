import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { AuthContext } from '../context/AuthContext'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import Avatar from '@mui/material/Avatar';

export default function Navbar(props) {
   
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const { logout } = React.useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (event) => {
        setAuth(event.target.checked);
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        await logout();
    }

    const handleProfile = () => {
       navigate(`/profile/${props.userData.userId}`);
    }
    const handleHome = () => {
        navigate('/');
    }
    return (
        <Box sx={{ color: 'white' }}>
            <AppBar position="fixed">
                <Toolbar>
                    {auth && (
                        <div style={{ display: 'flex' }}>
                            <IconButton
                                
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                                sx={{ float: 'right', marginRight: '10px' }}
                            >
                                <Avatar src={props.userData.profileUrl}/>
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleProfile}><AccountCircleIcon /><p>&nbsp;&nbsp;</p>Profile</MenuItem>
                                <MenuItem onClick={handleLogout}><LogoutIcon /><p>&nbsp;&nbsp;</p>Logout</MenuItem>
                            </Menu>
                            <MenuItem>
                                <HomeIcon onClick={handleHome} />
                            </MenuItem>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
}