import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AuthState } from '../types/authTypes';
import { useState } from 'react';
import { RootState } from '../redux/store';
export const Navbar = () => {

    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <Link to="/"> Main </Link>
            {isLoggedIn ? "Logged In" : <Link to="/login"> Login </Link>}
        </div>
    );
};