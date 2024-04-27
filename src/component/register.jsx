import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { Checkbox, Grid, TextField, FormControlLabel, Paper, Button } from '@mui/material';

const Register = (props) => {
    const [usernameState, setUsernameState] = useState('');
    const [passwordState, setPasswordState] = useState('');
    const [verifyPasswordState, setVerifyPasswordState] = useState('');
    const [errorMsgState, setErrorMsgState] = useState('');
    const navigate = useNavigate()

    async function onSubmit() {
        setErrorMsgState('')
        // verify password
        if (verifyPasswordState !== passwordState) {
            setErrorMsgState('Please verify passwords are the same :)')
            return;
        }

        try {
            await axios.post('/api/users/register', {
                username: usernameState,
                password: passwordState,
            });

            setPasswordState('');
            setUsernameState('');
            navigate('/');
        } catch (error) {
            setErrorMsgState(error.response.data);
        }
    }

    function updatePassword(event) {
        setPasswordState(event.target.value);
    }

    function updateVerifyPassword(event) {
        setVerifyPasswordState(event.target.value);
    }

    function updateUsername(event) {
        setUsernameState(event.target.value);
    }


    return (
        <div style={{ padding: 30 }}>
            <h1>Register Page</h1>
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
                        <TextField
                            label="Verified Password"
                            type="password"
                            fullWidth
                            value={verifyPasswordState}
                            onChange={updateVerifyPassword}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" fullWidth onClick={() => onSubmit()}> Register </Button>
                    </Grid>
                </Grid>
            </Paper>
        </div >
    );
};

export default Register;
