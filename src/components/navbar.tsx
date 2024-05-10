import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState, persistor } from '../redux/store';
import { useAppDispatch } from '../hooks';
import { logout } from '../redux/reducers/authReducer';

export const Navbar: React.FC = () => {
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
    const dispatch = useAppDispatch();

    const handleLogout = () => {
        dispatch(logout());
        persistor.purge();
      };

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <Link to="/"> Main </Link>
            {isLoggedIn ? "Logged In" : <Link to="/login"> Login </Link>}
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};