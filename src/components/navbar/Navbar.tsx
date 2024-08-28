import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../redux/store';
import { useAppDispatch } from '../../hooks';
import { useEffect, useState } from 'react';
import { logout, resetAuth } from '../../redux/actions/authActions';
import styles from './Navbar.module.scss'
import logo from '../../pictures/hpcLogo.png';
import { FaBars, FaTimes } from 'react-icons/fa';
import React from 'react';

export const Navbar: React.FC = () => {
    const dispatch = useAppDispatch();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

    useEffect(() => {
        console.log(isLoggedIn);
    }, [isLoggedIn])

    const handleLogout = () => {
        dispatch(resetAuth());
        dispatch(logout());
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className={styles.navbar}>
            <div className={styles.logo}>
                <img className={styles.img} src={logo} alt="hpcLogo" loading="lazy" />
            </div>
            <div className={`${styles.navbarOptions} ${isMenuOpen ? styles.open : ""}`}>
                <nav className={styles.nav}>
                    <Link className={styles.navbarLink} to="/"> Main </Link>
                    {isLoggedIn ? <Link className={styles.navbarLink} to="" onClick={handleLogout}>Logout</Link> : <Link className={styles.navbarLink} to="/login"> Sign in </Link>}
                    {/* <Link className={styles.navbarLink} to="/register"> Register </Link> */}
                </nav>
            </div>
            <div className={`${styles.hamburger} ${isMenuOpen ? styles.hamOpen : ""}`} onClick={toggleMenu}>
                {isMenuOpen ? <FaTimes /> : <FaBars />}
            </div>
        </div>
    );
};

export default Navbar;
