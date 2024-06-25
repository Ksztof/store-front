import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState, persistor } from '../../redux/store';
import { useAppDispatch } from '../../hooks';
import { useEffect } from 'react';
import { resetAuth } from '../../redux/actions/authActions';
import styles from './Navbar.module.scss'

export const Navbar: React.FC = () => {
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
    const dispatch = useAppDispatch();

    useEffect(() => {

    }, [isLoggedIn])

    const handleLogout = () => {
        dispatch(resetAuth());
        persistor.purge();
    };

    return (
        <div className={styles.navbar}>
            <div className={styles.logo}>
                <h1>logo</h1>
            </div>
            <div className={styles.navbarOptions}>
                <Link className={styles.navbarLink}to="/"> Main </Link>
                {isLoggedIn ? "Logged In" : <Link className={styles.navbarLink} to="/login"> Login </Link>}
                <Link className={styles.navbarLink} to="/register"> Register </Link>
                <Link className={styles.navbarLink} to="" onClick={handleLogout}>Logout</Link>
            </div>
        </div>
    );
};