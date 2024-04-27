import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import {
    Button,
    Checkbox,
    Container,
    FormControlLabel,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from '@mui/material';

const PasswordManagement = () => {
    const [account, setAccount] = useState('');
    const [password, setPassword] = useState('');
    const [alphabet, setAlphabet] = useState(false);
    const [numerals, setNumerals] = useState(false);
    const [symbols, setSymbols] = useState(false);
    const [length, setLength] = useState(8);
    const [passwords, setPasswords] = useState([]);
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    async function isLoggedIn() {
        const response = await axios.get('/api/users/loggedIn');
        const username = response.data.username;
        setUsername(username);
        if (username === '') {
            navigate('/');
        }
    }

    function onStart() {
        isLoggedIn().then(() => {
            fetchPasswords();
        });
    }

    useEffect(() => {
        onStart();
    }, []);

    const fetchPasswords = async () => {
        try {
            const response = await axios.get('/api/password');
            setPasswords(response.data);
        } catch (error) {
            console.error('Error fetching passwords:', error);
        }
    };

    const handleSubmit = async () => {
        if (!account) {
            alert('Please enter a URL');
            return;
        }

        try {
            if (password) {
                await axios.post('/api/password', { account, password });
            } else {
                const generatedPassword = generatePassword();
                await axios.post('/api/password', { account, password: generatedPassword });
            }
            fetchPasswords();
            setAccount('');
            setPassword('');
            setAlphabet(false);
            setNumerals(false);
            setSymbols(false);
            setLength(8);
        } catch (error) {
            console.error('Error saving password:', error);
        }
    };

    const generatePassword = () => {
        const characterSets = [];

        if (alphabet) {
            characterSets.push('abcdefghijklmnopqrstuvwxyz');
        }

        if (numerals) {
            characterSets.push('0123456789');
        }

        if (symbols) {
            characterSets.push('!@#$%^&*()_+-=[]{}|;:,.<>?');
        }

        if (characterSets.length === 0) {
            alert('Please select at least one character set.');
            return '';
        }

        let generatedPassword = '';

        characterSets.forEach(set => {
            generatedPassword += set.charAt(Math.floor(Math.random() * set.length));
        });

        const remainingLength = length - generatedPassword.length;
        for (let i = 0; i < remainingLength; i++) {
            const randomSet = characterSets[Math.floor(Math.random() * characterSets.length)];
            generatedPassword += randomSet.charAt(Math.floor(Math.random() * randomSet.length));
        }

        generatedPassword = generatedPassword.split('').sort(() => Math.random() - 0.5).join('');

        return generatedPassword;
    };


    const handleDelete = async (passwordId) => {
        try {
            await axios.delete(`/api/password/${passwordId}`);
            fetchPasswords();
        } catch (error) {
            console.error('Error deleting password:', error);
        }
    };

    return (
        <Container maxWidth="lg">
            <Typography variant="h2" gutterBottom>Password Manager</Typography>
            <div>
                <TextField
                    label="URL"
                    variant="outlined"
                    fullWidth
                    value={account}
                    onChange={(e) => setAccount(e.target.value)}
                    style={{ marginBottom: '8px' }}
                />
                <TextField
                    label="Password"
                    variant="outlined"
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ marginBottom: '8px' }}
                />
                <FormControlLabel
                    control={<Checkbox checked={alphabet} onChange={(e) => setAlphabet(e.target.checked)} />}
                    label="Alphabet"
                />
                <FormControlLabel
                    control={<Checkbox checked={numerals} onChange={(e) => setNumerals(e.target.checked)} />}
                    label="Numerals"
                />
                <FormControlLabel
                    control={<Checkbox checked={symbols} onChange={(e) => setSymbols(e.target.checked)} />}
                    label="Symbols"
                />
                <TextField
                    type="number"
                    label="Length"
                    variant="outlined"
                    fullWidth
                    value={length}
                    onChange={(e) => setLength(parseInt(e.target.value))}
                    inputProps={{ min: 4, max: 50 }}
                    style={{ marginBottom: '8px' }}
                />
                <Button variant="contained" color="primary" onClick={handleSubmit} style={{ marginBottom: '16px' }}>
                    Save
                </Button>
            </div>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>URL</TableCell>
                        <TableCell>Password</TableCell>
                        <TableCell>Last Updated</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {passwords.map((password) => (
                        <TableRow key={password._id}>
                            <TableCell>{password.account}</TableCell>
                            <TableCell>{password.password}</TableCell>
                            <TableCell>{new Date(password.created).toLocaleString()}</TableCell>
                            <TableCell>
                                <Button variant="contained" color="secondary" onClick={() => handleDelete(password._id)}>
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Container>
    );
};

export default PasswordManagement;
