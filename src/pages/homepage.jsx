import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TG from '@mui/material/Typography';
import Nav from '../component/Nav.jsx'
import UserLoginStatusProvider from '../state/UserLoginStatusProvider.jsx';

export default function HomePage() {
    return (
        <div>
            <UserLoginStatusProvider>
                <Nav />
                <CssBaseline />
                <Container maxWidth="m">
                    <Box sx={{ bgcolor: '#cfe8fc', height: '100%', padding: '30px', marginTop: '30px' }}>
                        <div style={{ textAlign: 'center' }}>
                            <h1 >
                                Password Manager
                            </h1>
                        </div>
                        <TG>
                            This is a password manager allows you to track and generate passwords on your behalf.  You will also be able to share passwords with other people if you choose.
                        </TG>
                        <h2>
                            Credit
                        </h2>
                        <TG>
                            Shanrong Zhang
                        </TG>
                    </Box>

                </Container>
            </UserLoginStatusProvider>
        </div>
    );
}