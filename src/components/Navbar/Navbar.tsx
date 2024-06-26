import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState, persistor } from '../../redux/store';
import { useAppDispatch } from '../../hooks';
import { useEffect } from 'react';
import { resetAuth } from '../../redux/actions/authActions';
import styles from './Navbar.module.scss'
import logo from '../../pictures/hpcLogo.png';

export const Navbar: React.FC = () => {
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
    const dispatch = useAppDispatch();

    useEffect(() => {
        console.log(isLoggedIn);
    }, [isLoggedIn])

    const handleLogout = () => {
        dispatch(resetAuth());
    };

    return (
        <div className={styles.navbar}>
            <div className={styles.logo}>
                <img className={styles.img}src={logo} alt="hpcLogo" loading="lazy" />
            </div>
            <div className={styles.navbarOptions}>
                <nav className={styles.nav}>
                    <Link className={styles.navbarLink} to="/"> Main </Link>
                    {isLoggedIn ? <Link className={styles.navbarLink} to="" onClick={handleLogout}>Logout</Link> : <Link className={styles.navbarLink} to="/login"> Login </Link>}
                    <Link className={styles.navbarLink} to="/register"> Register </Link>
                </nav>
            </div>
        </div>
    );
};