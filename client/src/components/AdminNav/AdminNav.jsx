import {Link} from "react-router-dom";
import './AdminNav.css';
const AdminNav = () => {
    return (
        <div className='admin-nav'>
            <p className='admin-nav-title'>Admin Navigation</p>
            <Link to='/active-users' className='admin-nav-link'>Active Users</Link>
            <Link to='/payments' className='admin-nav-link'>Payments</Link>
            <Link to='/coaches' className='admin-nav-link'>Coaches</Link>
            <Link to='/home' className='admin-nav-link'>Home</Link>
        </div>
    );
}

export default AdminNav;