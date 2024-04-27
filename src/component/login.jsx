import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { Checkbox, Grid, TextField, FormControlLabel, Paper, Button } from '@mui/material';

const Login = () => {
    const navigate = useNavigate();

    const [usernameState, setUsernameState] = useState('');
    const [passwordState, setPasswordState] = useState('');
    const [errorMsgState, setErrorMsgState] = useState('');


    async function onSubmit() {
        setErrorMsgState('');
        try {
            await axios.post('/api/users/login', {
                username: usernameState,
                password: passwordState,
            });
            console.log("successfully");
            navigate('/');
        } catch (error) {
            if (error.response) {
                setErrorMsgState(error.response.data);
            } else {
                setErrorMsgState('An error occurred. Please try again.');
            }
        }
    }

    function updatePassword(event) {
        setPasswordState(event.target.value);
    }

    function updateUsername(event) {
        setUsernameState(event.target.value);
    }

    return (
        <div style={{ padding: 30 }}>
            <h1>Login Page</h1>
            {errorMsgState && <h1>
                {errorMsgState}
            </h1>}
            <Paper elevation={3} style={{ padding: 20 }}>
                <Grid
                    container
                    spacing={3}
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Grid item xs={12}>
                        <TextField
                            label="Username"
                            fullWidth
                            value={usernameState}
                            onChange={updateUsername}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Password"
                            type="password"
                            fullWidth
                            value={passwordState}
                            onChange={updatePassword}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" fullWidth onClick={() => onSubmit()}> Login </Button>
                    </Grid>
                </Grid>
            </Paper>
        </div >
    );
};

export default Login;
