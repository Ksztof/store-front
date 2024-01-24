import { Link } from 'react-router-dom';

export const Navbar = () => {
    return (
        <div>
            <Link to="/"> Main </Link>
            <Link to="/login"> Login </Link>
        </div>
    );
};