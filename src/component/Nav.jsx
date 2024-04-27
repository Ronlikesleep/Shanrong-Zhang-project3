import * as React from 'react';
import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu.js';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb.js';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
const pages = ['Home', 'Management'];


function ResponsiveAppBar() {
    const navigate = useNavigate();

    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [username, setUsername] = useState('');

    async function isLoggedIn() {
        try {
            const response = await axios.get('/api/users/loggedIn');
            const username = response.data.username;
            setUsername(username);
        } catch (e) {
            navigate('/');
        }
    }

    useEffect(() => {
        isLoggedIn();
    }, []);


    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleUserLogin = () => {

    };
    const handleUserLogout = async () => {
        await axios.post('/api/users/logout');
        setUsername('');
        navigate('/');
    };

    return (
        <AppBar position="static">
            <Container maxWidth={false}>
                <Toolbar disableGutters>
                    <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="./"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.1rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Password Manager
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <Link to={`/${page.toLowerCase()}`} key={page} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                                        <Typography textAlign="center">{page}</Typography>
                                    </MenuItem>
                                </Link>
                            ))}
                        </Menu>
                    </Box>
                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        PM(not product manager)
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Link to={`/${page.toLowerCase()}`} key={page} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <Button
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    {page}
                                </Button>
                            </Link>
                        ))}
                        {username !== '' ? (
                            <>
                                <Button
                                    onClick={handleUserLogout}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    Logout
                                </Button>
                                <Button
                                    onClick={() => console.log('nothing')}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    {username}
                                </Button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <Button
                                        onClick={handleUserLogin}
                                        sx={{ my: 2, color: 'white', display: 'block' }}
                                    >
                                        Login
                                    </Button>
                                </Link>
                                <Link to="/register" style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <Button
                                        onClick={handleUserLogin}
                                        sx={{ my: 2, color: 'white', display: 'block' }}
                                    >
                                        Register
                                    </Button>
                                </Link>
                            </>
                        )}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar >
    );
}
export default ResponsiveAppBar;