import * as React from 'react';
import Register from '../component/register.jsx';
import UserLoginStatusProvider from '../state/UserLoginStatusProvider.jsx';

export default function RegisterPage() {
    return (
        <div>
            <UserLoginStatusProvider>
                <Register />
            </UserLoginStatusProvider>
        </div>
    );
}