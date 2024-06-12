import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState, persistor } from '../redux/store';
import { useAppDispatch } from '../hooks';
import { useEffect } from 'react';
import { resetAuth } from '../redux/actions/authActions';

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
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <Link to="/"> Main </Link>
            {isLoggedIn ? "Logged In" : <Link to="/login"> Login </Link>}
            <Link to="/register"> Register </Link>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};